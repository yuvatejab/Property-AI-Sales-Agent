/**
 * Audio Utility for Microsoft Neural Text-to-Speech with Web Speech API Fallback
 * Provides natural, human-like voice synthesis for Indian English and Hinglish
 */

export interface VoiceOption {
  id: string;
  name: string;
  language: string;
  gender: 'female' | 'male';
  description: string;
}

export const AVAILABLE_NEURAL_VOICES: VoiceOption[] = [
  {
    id: 'en-IN-NeerjaNeural',
    name: 'Priya (Neerja Neural)',
    language: 'Indian English / Hinglish',
    gender: 'female',
    description: 'Warm, professional Indian English neural voice (Default for Priya)'
  },
  {
    id: 'hi-IN-SwaraNeural',
    name: 'Swara (Hindi Neural)',
    language: 'Hindi / Hinglish',
    gender: 'female',
    description: 'Expressive native Hindi and code-mixed Hinglish voice'
  },
  {
    id: 'en-IN-PrabhatNeural',
    name: 'Prabhat (Indian English)',
    language: 'Indian English',
    gender: 'male',
    description: 'Clear, authoritative Indian English male voice'
  }
];

let currentAudio: HTMLAudioElement | null = null;
let activeVoiceId = 'en-IN-NeerjaNeural';
let isAudioPlaying = false;
let currentPlaySessionId = 0;
let activeAbortController: AbortController | null = null;

export function setSelectedVoice(voiceId: string) {
  activeVoiceId = voiceId;
}

export function getSelectedVoice(): string {
  return activeVoiceId;
}

export function stopAudioPlayback() {
  currentPlaySessionId += 1;
  isAudioPlaying = false;

  if (activeAbortController) {
    try {
      activeAbortController.abort();
    } catch {
      // ignore
    }
    activeAbortController = null;
  }

  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = '';
    } catch {
      // ignore
    }
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

/**
 * Plays speech using server-side Microsoft Neural TTS endpoint,
 * with graceful fallback to browser speech synthesis if offline.
 */
export async function playSpeech(
  text: string,
  options?: {
    voice?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
): Promise<void> {
  stopAudioPlayback();

  if (!text || !text.trim()) {
    options?.onEnd?.();
    return;
  }

  const cleanText = text
    .replace(/\*\*/g, '')
    .replace(/[*_#`~]/g, '')
    .trim();

  const voiceToUse = options?.voice || activeVoiceId || 'en-IN-NeerjaNeural';
  const sessionId = currentPlaySessionId;
  const abortCtrl = new AbortController();
  activeAbortController = abortCtrl;

  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: abortCtrl.signal,
      body: JSON.stringify({
        text: cleanText,
        voice: voiceToUse
      })
    });

    if (sessionId !== currentPlaySessionId || abortCtrl.signal.aborted) {
      return;
    }

    if (!response.ok) {
      throw new Error(`TTS server error status: ${response.status}`);
    }

    const blob = await response.blob();
    if (sessionId !== currentPlaySessionId || abortCtrl.signal.aborted) {
      return;
    }

    if (!blob || blob.size === 0) {
      throw new Error('TTS server returned empty audio payload');
    }

    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    currentAudio = audio;
    isAudioPlaying = true;

    audio.onplay = () => {
      if (sessionId === currentPlaySessionId) {
        options?.onStart?.();
      }
    };

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      if (sessionId === currentPlaySessionId) {
        isAudioPlaying = false;
        if (currentAudio === audio) {
          currentAudio = null;
        }
        options?.onEnd?.();
      }
    };

    audio.onerror = (e) => {
      URL.revokeObjectURL(audioUrl);
      if (sessionId === currentPlaySessionId) {
        if (currentAudio === audio) {
          currentAudio = null;
        }
        fallbackToBrowserSynthesis(cleanText, sessionId, options);
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((playErr) => {
        if (sessionId === currentPlaySessionId) {
          fallbackToBrowserSynthesis(cleanText, sessionId, options);
        }
      });
    }
  } catch (err: any) {
    if (err?.name === 'AbortError' || sessionId !== currentPlaySessionId) {
      return;
    }
    fallbackToBrowserSynthesis(cleanText, sessionId, options);
  }
}

function fallbackToBrowserSynthesis(
  text: string,
  sessionId: number,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) {
  if (sessionId !== currentPlaySessionId) {
    return;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !window.speechSynthesis) {
    options?.onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const indianVoice = voices.find(
        (v) =>
          v.lang.includes('en-IN') ||
          v.lang.includes('hi-IN') ||
          v.name.includes('India') ||
          v.name.includes('Neerja') ||
          v.name.includes('Google')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
    }

    utterance.onstart = () => {
      if (sessionId === currentPlaySessionId) {
        options?.onStart?.();
      }
    };

    utterance.onend = () => {
      if (sessionId === currentPlaySessionId) {
        options?.onEnd?.();
      }
    };

    utterance.onerror = (e) => {
      // Ignore normal interruptions (e.g. 'canceled' or 'interrupted') when switching calls
      if (e.error === 'interrupted' || e.error === 'canceled') {
        if (sessionId === currentPlaySessionId) {
          options?.onEnd?.();
        }
        return;
      }
      console.warn('Browser speech synthesis notice:', e.error || 'speech-interrupted');
      if (sessionId === currentPlaySessionId) {
        options?.onError?.(e);
        options?.onEnd?.();
      }
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    if (sessionId === currentPlaySessionId) {
      options?.onError?.(err);
      options?.onEnd?.();
    }
  }
}
