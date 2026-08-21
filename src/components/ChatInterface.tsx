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
<<<<<<< HEAD
  Check,
  Flame,
  Mic,
  Home,
  Layers,
  MapPin
=======
  Check
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
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
<<<<<<< HEAD
    label: '2 BHK Price & Payment',
    text: 'Hi Priya, mujhe Northstar One project ke baare mein jaanna hai. 2 BHK ka kya starting price aur payment plan hai?'
  },
  {
    category: 'Comparison',
    label: 'Why Sector 79?',
    text: 'Why should I invest in Northstar One Sector 79 over Golf Course Extension Road?'
  },
  {
    category: 'Site Visit',
    label: 'Book Sample Flat Tour',
    text: 'Can I visit the sample apartment this Saturday at 11 AM with my family? My name is Vikram.'
  },
  {
    category: 'Sizes',
    label: '3 BHK Balcony & Deck',
    text: 'What are the deck balcony dimensions and scenic green views in 3 BHK suites?'
  },
  {
    category: 'Policy',
    label: 'Spot Discount & Layout',
    text: 'Can you give me a 20% spot discount and can I alter internal bedroom walls?'
  },
  {
    category: 'Escalation',
    label: 'Senior Advisor Call',
    text: 'Please connect me with a senior advisor for NRI paperwork and legal RERA title deed queries.'
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
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
<<<<<<< HEAD
    <div className="flex flex-col h-[calc(100vh-6.75rem)] max-w-4xl mx-auto w-full">
      
      {/* Top Configuration Bar - Clean White Ribbon */}
      <div className="bg-white rounded-2xl p-3 mb-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.04]">
        
        {/* Agent Profile & Online Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-[#E55934] text-white flex items-center justify-center font-bold text-sm shadow-[0_2px_10px_rgba(229,89,52,0.3)]">
              P
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-[#111418] tracking-tight">Priya</span>
              <span className="text-[10px] font-semibold text-[#E55934] bg-[#FFF2EE] px-2 py-0.5 rounded-full">
                Relationship Associate
              </span>
            </div>
            <p className="text-[11px] text-[#71767F] font-medium">Northstar One • Sector 79, Gurugram</p>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Language Selector Pill */}
          <div className="flex items-center gap-1 bg-[#F4F5F7] px-3 py-1 rounded-full text-xs text-[#333] border border-black/[0.03]">
            <Languages className="h-3 w-3 text-[#E55934]" strokeWidth={2} />
            <select
              value={activeLanguage}
              onChange={(e) => setActiveLanguage(e.target.value)}
              className="bg-transparent text-[#222] text-[11px] font-medium focus:outline-none cursor-pointer"
            >
              <option value="Auto (Mirroring)">Auto Mirroring</option>
              <option value="English">English</option>
              <option value="Hinglish">Hinglish</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          {/* Voice Selector Pill */}
          <div className="flex items-center gap-1 bg-[#F4F5F7] px-3 py-1 rounded-full text-xs text-[#333] border border-black/[0.03]">
            <select
              value={activeVoice}
              onChange={(e) => handleVoiceSelect(e.target.value)}
              className="bg-transparent text-[#E55934] text-[11px] font-semibold focus:outline-none cursor-pointer"
            >
              {AVAILABLE_NEURAL_VOICES.map((v) => (
                <option key={v.id} value={v.id} className="text-[#222]">
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
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
<<<<<<< HEAD
            className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
              speechEnabled
                ? 'bg-[#FFF2EE] text-[#E55934] border border-[#E55934]/30 shadow-sm'
                : 'bg-[#F4F5F7] text-[#8E95A0] hover:text-[#222]'
            }`}
            title={speechEnabled ? 'Neural Audio Enabled' : 'Neural Audio Muted'}
          >
            {speechEnabled ? <Volume2 className="h-3.5 w-3.5" strokeWidth={2} /> : <VolumeX className="h-3.5 w-3.5" strokeWidth={2} />}
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              stopAudioPlayback();
              onReset();
            }}
<<<<<<< HEAD
            className="p-2 rounded-full bg-[#F4F5F7] hover:bg-[#EAECEF] text-[#71767F] hover:text-[#111418] transition-all duration-200 cursor-pointer"
            title="Clear conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
=======
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Clear conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
          </button>
        </div>

      </div>

<<<<<<< HEAD
      {/* Messages Stream Container */}
      <div className="flex-1 bg-[#E8EBEE]/70 rounded-[28px] p-4 sm:p-5 overflow-y-auto space-y-4 shadow-inner border border-black/[0.03]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
            
            {/* Glowing Concentric Terracotta Orb (Reference Screen 3 Style) */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-[#E55934]/20 animate-ripple pointer-events-none" />
              <div className="absolute w-18 h-18 rounded-full bg-[#E55934]/30 animate-pulse-glow pointer-events-none" />
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#E55934] to-[#F17855] flex items-center justify-center text-white shadow-[0_8px_25px_rgba(229,89,52,0.4)]">
                <Flame className="h-6 w-6 text-white" strokeWidth={2.2} />
              </div>
            </div>
            
            <div className="space-y-1 max-w-md">
              <h2 className="text-xl font-bold text-[#111418] tracking-tight">Let's find your dream home!</h2>
              <p className="text-xs text-[#71767F] leading-relaxed">
                Ask Priya anything about 2 & 3 BHK luxury residences, scenic Aravalli foothills in Sector 79 Gurugram, or schedule a sample flat visit.
              </p>
            </div>

            {/* Quick Inquiry Cards in Reference Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full text-left pt-2">
              <button
                onClick={() => onSendMessage("Hi Priya, could you give me an overview of Northstar One and the starting prices?")}
                className="p-4 rounded-2xl bg-white hover:bg-white/95 border border-black/[0.04] text-xs transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(229,89,52,0.12)] hover:-translate-y-0.5"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#E55934]" />
                    <span className="text-[10px] text-[#E55934] font-bold uppercase tracking-wider">Overview</span>
                  </div>
                  <span className="font-semibold text-[#111418] block">"Starting prices & features"</span>
                  <span className="text-[10px] text-[#71767F] block">2 BHK (₹1.35 Cr) & 3 BHK (₹1.75 Cr)</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#E55934] group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </button>

              <button
                onClick={() => onSendMessage("Can I book a sample apartment tour this weekend?")}
                className="p-4 rounded-2xl bg-white hover:bg-white/95 border border-black/[0.04] text-xs transition-all duration-200 flex items-center justify-between group cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(229,89,52,0.12)] hover:-translate-y-0.5"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#E55934]" />
                    <span className="text-[10px] text-[#E55934] font-bold uppercase tracking-wider">Sample Flat Tour</span>
                  </div>
                  <span className="font-semibold text-[#111418] block">"Schedule VIP site visit"</span>
                  <span className="text-[10px] text-[#71767F] block">Complimentary Chauffeur Cab</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#E55934] group-hover:translate-x-1 transition-transform" strokeWidth={2} />
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
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
<<<<<<< HEAD
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in space-y-1`}
              >
                <div className={`max-w-[88%] sm:max-w-[78%] px-4.5 py-3 text-xs leading-relaxed transition-all duration-200 ${
                  isUser
                    ? 'bg-white text-[#111418] font-medium rounded-[22px] rounded-tr-md shadow-[0_3px_12px_rgba(0,0,0,0.04)] border border-black/[0.03]'
                    : 'bg-white text-[#1A1D20] rounded-[24px] rounded-tl-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-black/[0.03] space-y-2.5'
                }`}>
                  {!isUser && (
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-[#E55934] text-white flex items-center justify-center text-[10px] font-bold">
                          P
                        </div>
                        <span className="font-bold text-xs text-[#111418]">Priya</span>
                      </div>
                      <button
                        onClick={() => handleSpeakText(msg.content, msg.id || String(index))}
                        className={`flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer font-medium ${
                          isSpeakingThis
                            ? 'bg-[#FFF2EE] text-[#E55934] font-bold shadow-sm'
                            : 'text-[#71767F] hover:text-[#E55934] hover:bg-[#FFF2EE]'
                        }`}
                        title="Listen with Neural Speech"
                      >
                        <Volume2 className={`h-3 w-3 ${isSpeakingThis ? 'animate-pulse text-[#E55934]' : ''}`} strokeWidth={2} />
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                        <span>{isSpeakingThis ? 'Speaking...' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
<<<<<<< HEAD

                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>

                {/* Clean timestamp in muted grey */}
                <span className="text-[10px] text-[#8E95A0] font-medium px-2">
                  {msg.timestamp || 'Just now'}
                </span>
=======
                </div>

                {isUser && (
                  <div className="h-7 w-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-slate-700">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
              </div>
            );
          })
        )}

        {isLoading && (
<<<<<<< HEAD
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="h-6 w-6 rounded-full bg-[#E55934] text-white flex items-center justify-center font-bold text-[10px]">
              P
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-black/[0.03] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55934] animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55934] animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55934] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-[#71767F] ml-1 font-medium">Priya is typing...</span>
=======
          <div className="flex gap-2.5 justify-start animate-pulse">
            <div className="h-7 w-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0">
              P
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-slate-400 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-slate-400 ml-1">Priya is typing...</span>
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

<<<<<<< HEAD
      {/* Floating Prompt Pills matching Reference Design (Start workout, Log water chips) */}
      <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(p.text)}
            className="ref-pill-btn px-4 py-2 text-xs font-semibold text-[#2B303A] hover:text-[#E55934] whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Floating Input Pill Bar matching Reference Screen 3 */}
      <form onSubmit={handleSend} className="relative flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type something..."
            className="w-full bg-white rounded-full pl-5 pr-28 py-3.5 text-xs text-[#111418] placeholder-[#8E95A0] focus:outline-none shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] focus:border-[#E55934]/40 font-medium transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (QUICK_PROMPTS.length > 0) {
                  const randomPrompt = QUICK_PROMPTS[Math.floor(Math.random() * QUICK_PROMPTS.length)].text;
                  setInputText(randomPrompt);
                }
              }}
              className="p-2 rounded-full text-[#71767F] hover:text-[#E55934] hover:bg-[#F4F5F7] transition cursor-pointer"
              title="Suggest prompt"
            >
              <Mic className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="h-8 w-8 rounded-full bg-[#E55934] hover:bg-[#D94824] disabled:opacity-40 text-white flex items-center justify-center shadow-[0_2px_10px_rgba(229,89,52,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
      </form>

    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
