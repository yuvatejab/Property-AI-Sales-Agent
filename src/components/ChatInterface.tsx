import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  User, 
  Bot, 
  RotateCcw, 
  Calendar, 
  Languages, 
  ArrowRight,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';
import { ChatMessage } from '../types';
import { playSpeech, stopAudioPlayback, AVAILABLE_NEURAL_VOICES, getSelectedVoice, setSelectedVoice } from '../utils/audio';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, languageHint?: string) => Promise<void>;
  onReset: () => void;
  onOpenBooking: () => void;
  onTriggerAnalytics: () => void;
  isLoading: boolean;
}

const QUICK_PROMPTS = [
  {
    category: 'Hindi / Hinglish',
    label: '2 BHK Price Discovery',
    text: 'Hi Priya, mujhe Northstar One project ke baare mein jaanna hai. 2 BHK ka kya starting price hai?',
  },
  {
    category: 'Objection',
    label: 'Price Comparison',
    text: '1.35 Crore is high for Sector 79. Why should I choose Northstar One over Golf Course Extn?',
  },
  {
    category: 'Visit',
    label: 'Book Sample Flat Tour',
    text: 'Can I visit the sample apartment this Saturday at 11 AM with my family? My name is Vikram.',
  },
  {
    category: 'Situational',
    label: 'Busy / Call Later',
    text: "I am in an urgent client meeting right now. Can't talk.",
  },
  {
    category: 'Guardrails',
    label: '20% Discount Request',
    text: 'Can you give me a 20% spot discount and can I break down the central bedroom wall?',
  },
  {
    category: 'Compliance',
    label: 'DND / Opt-Out',
    text: 'Please stop messaging and remove my number from your database. Not interested.',
  },
  {
    category: 'Escalation',
    label: 'Senior Director Connect',
    text: 'I want to speak directly to your senior sales director regarding legal approvals and NRI paperwork.',
  }
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onReset,
  onOpenBooking,
  onTriggerAnalytics,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState<string>('Auto (Mirroring)');
  const [activeVoice, setActiveVoice] = useState<string>(getSelectedVoice());
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom smoothly
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  const handleSpeakText = (text: string, msgId?: string) => {
    if (!speechEnabled) return;
    const targetId = msgId || 'current';
    if (speakingMessageId === targetId) {
      stopAudioPlayback();
      setSpeakingMessageId(null);
      return;
    }
    setSpeakingMessageId(targetId);
    playSpeech(text, {
      voice: activeVoice,
      onStart: () => setSpeakingMessageId(targetId),
      onEnd: () => setSpeakingMessageId(null),
      onError: () => setSpeakingMessageId(null)
    });
  };

  const handleVoiceSelect = (voiceId: string) => {
    setActiveVoice(voiceId);
    setSelectedVoice(voiceId);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    setInputText('');
    await onSendMessage(userText, activeLanguage !== 'Auto (Mirroring)' ? activeLanguage : undefined);
  };

  const handlePromptClick = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] max-w-4xl mx-auto w-full">
      
      {/* Top Controls Ribbon */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2.5 mb-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-sm backdrop-blur-md">
        
        {/* Agent Profile & Status */}
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xs shadow-inner">
              P
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-white">Priya</span>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                Relationship Associate
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Northstar One • Sector 79, Gurugram</p>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="flex items-center space-x-1.5 flex-wrap">
          
          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
            <Languages className="h-3 w-3 text-amber-400" />
            <select
              value={activeLanguage}
              onChange={(e) => setActiveLanguage(e.target.value)}
              className="bg-transparent text-slate-200 text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="Auto (Mirroring)" className="bg-slate-900">Auto Mirroring</option>
              <option value="English" className="bg-slate-900">English</option>
              <option value="Hinglish" className="bg-slate-900">Hinglish</option>
              <option value="Hindi" className="bg-slate-900">Hindi</option>
            </select>
          </div>

          {/* Voice Selector */}
          <div className="flex items-center space-x-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
            <select
              value={activeVoice}
              onChange={(e) => handleVoiceSelect(e.target.value)}
              className="bg-transparent text-amber-300 text-[11px] focus:outline-none cursor-pointer"
            >
              {AVAILABLE_NEURAL_VOICES.map((v) => (
                <option key={v.id} value={v.id} className="bg-slate-900 text-slate-200">
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Audio Playback Toggle */}
          <button
            onClick={() => {
              const next = !speechEnabled;
              setSpeechEnabled(next);
              if (!next) stopAudioPlayback();
            }}
            className={`p-1.5 rounded-xl border transition cursor-pointer ${
              speechEnabled
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={speechEnabled ? 'Neural Audio Enabled' : 'Neural Audio Muted'}
          >
            {speechEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          {/* Analyze CRM Trigger */}
          <button
            onClick={onTriggerAnalytics}
            disabled={messages.length === 0}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-xl text-[11px] font-medium border border-slate-700 transition disabled:opacity-40 cursor-pointer"
            title="Generate structured CRM lead intelligence from conversation"
          >
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">Analyze CRM</span>
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              stopAudioPlayback();
              onReset();
            }}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Clear conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 mb-1.5 scrollbar-none">
        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap mr-0.5 flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-amber-400" />
          Quick Inquiries:
        </span>
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(p.text)}
            className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 hover:bg-slate-800/90 whitespace-nowrap transition text-[11px] flex items-center gap-1 cursor-pointer"
          >
            <span className="text-[9px] text-amber-400/80 font-mono">[{p.category}]</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 overflow-y-auto space-y-3.5 shadow-inner">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 shadow-md">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">How can I assist you with Northstar One?</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Ask about 2 & 3 BHK floor plans, starting prices (₹1.35 Cr+), Aravalli green views, payment plans, or schedule a VIP visit to our Sector 79 Experience Centre.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full text-left pt-2">
              <button
                onClick={() => onSendMessage("Hi Priya, could you give me an overview of Northstar One and the starting prices?")}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 transition hover:bg-slate-800 flex items-center justify-between group cursor-pointer"
              >
                <span>"Give me an overview of Northstar One"</span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
              </button>
              <button
                onClick={() => onSendMessage("What are the 2 BHK and 3 BHK sizes and price difference?")}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 transition hover:bg-slate-800 flex items-center justify-between group cursor-pointer"
              >
                <span>"What are 2 & 3 BHK sizes and prices?"</span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const isSpeakingThis = speakingMessageId === (msg.id || String(index));
            return (
              <div
                key={msg.id || index}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {!isUser && (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                    P
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  <div className="flex items-center justify-between gap-3 mb-1 text-[10px] opacity-70">
                    <span className="font-semibold">{isUser ? 'You' : 'Priya'}</span>
                    <span>{msg.timestamp || 'Just now'}</span>
                  </div>

                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {!isUser && (
                    <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-[10px] text-amber-400/80 font-mono">Northstar Homes</span>
                      <button
                        onClick={() => handleSpeakText(msg.content, msg.id || String(index))}
                        className={`transition flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full cursor-pointer ${
                          isSpeakingThis
                            ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                            : 'hover:text-amber-400'
                        }`}
                        title="Listen with Neural Speech"
                      >
                        <Volume2 className={`h-3 w-3 ${isSpeakingThis ? 'animate-pulse text-amber-400' : ''}`} />
                        <span>{isSpeakingThis ? 'Speaking...' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="h-7 w-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-slate-700">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex gap-2.5 justify-start animate-pulse">
            <div className="h-7 w-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0">
              P
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-slate-400 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-slate-400 ml-1">Priya is typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSend} className="mt-2.5 relative flex items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Priya about Northstar One (English, Hindi, or Hinglish)..."
          className="w-full bg-slate-900/90 border border-slate-800 focus:border-amber-500 rounded-2xl pl-4 pr-24 py-3 text-xs text-white placeholder-slate-500 focus:outline-none shadow-md transition"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="absolute right-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 px-4 py-1.5 rounded-xl font-semibold text-xs transition flex items-center gap-1.5 shadow cursor-pointer"
        >
          <span>Send</span>
          <Send className="h-3 w-3" />
        </button>
      </form>

    </div>
  );
};
