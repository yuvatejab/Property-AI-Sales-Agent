import React, { useState } from 'react';
import { 
  MessageSquare, 
  BarChart3, 
  Building2, 
  Calendar
} from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ProjectOverview } from './components/ProjectOverview';
import { SiteVisitModal } from './components/SiteVisitModal';
import { ChatMessage, LeadAnalytics, SiteVisitBookingResult } from './types';

<<<<<<< HEAD
export type MainTab = 'project' | 'chat' | 'analytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('project');
=======
export type MainTab = 'chat' | 'analytics' | 'project';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('chat');
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analytics, setAnalytics] = useState<LeadAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Send a chat message
  const handleSendMessage = async (text: string, languageHint?: string) => {
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          user_message: text,
          language_hint: languageHint
        })
      });

      const data = await response.json();
      const replyText = data?.reply || (data?.error ? 'Namaste! Priya here. Northstar One in Sector 79 Gurugram offers 2 & 3 BHK luxury residences from ₹1.35 Cr. How can I assist with your home search today?' : 'Namaste! How may I assist you with Northstar One?');
      
      const assistantMsg: ChatMessage = {
        id: 'msg-resp-' + Date.now(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        content: 'Namaste! Priya here from Northstar Homes. Northstar One in Sector 79 offers luxury 2 & 3 BHK residences starting at ₹1.35 Cr. How may I assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger post-conversation CRM lead analytics extraction
  const handleTriggerAnalytics = async () => {
    setActiveTab('analytics');
    setIsAnalyticsLoading(true);

    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });
      const data: LeadAnalytics = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error('Analytics extraction error:', err);
    } finally {
      setIsAnalyticsLoading(false);
    }
  };

  // Reset conversation
  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setMessages([]);
    setAnalytics(null);
  };

  const handleBookingComplete = (result: SiteVisitBookingResult) => {
    if (result.status === 'confirmed' && result.details) {
      const confirmationMsg: ChatMessage = {
        id: 'msg-booking-' + Date.now(),
        role: 'assistant',
        content: `Your site visit for ${result.details.customerName} on ${result.details.date} at ${result.details.time} has been confirmed (Booking ID: ${result.details.bookingId}). We have dispatched the location pin via WhatsApp and look forward to welcoming you!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, confirmationMsg]);
    }
  };

  return (
<<<<<<< HEAD
    <div className="relative min-h-screen bg-[#ECEEF1] text-[#1A1D20] font-sans flex flex-col selection:bg-[#E55934] selection:text-white antialiased p-3 sm:p-5 overflow-x-hidden">
      
      {/* Top Navigation Bar */}
      <nav id="top-navbar" className="relative z-10 w-full max-w-4xl mx-auto mb-4 flex items-center justify-between gap-3 px-1">
        
        {/* Centered Segmented Navigation Bar */}
        <div className="inline-flex p-1.5 rounded-full bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] mx-auto sm:mx-0">
          <button
            id="nav-tab-project"
            onClick={() => setActiveTab('project')}
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'project'
                ? 'bg-[#E55934] text-white shadow-[0_4px_12px_rgba(229,89,52,0.3)]'
                : 'text-[#68707C] hover:text-[#111418] hover:bg-[#F7F8FA]'
            }`}
          >
            <Building2 className="h-4 w-4" strokeWidth={2.2} />
            <span>Project Details</span>
          </button>

          <button
            id="nav-tab-chat"
            onClick={() => setActiveTab('chat')}
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#E55934] text-white shadow-[0_4px_12px_rgba(229,89,52,0.3)]'
                : 'text-[#68707C] hover:text-[#111418] hover:bg-[#F7F8FA]'
            }`}
          >
            <MessageSquare className="h-4 w-4" strokeWidth={2.2} />
            <span>Priya AI Chat</span>
          </button>

          <button
            id="nav-tab-analytics"
=======
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950 antialiased p-3 sm:p-5">
      
      {/* Sleek, Minimalistic Centered Tab Switcher Container */}
      <div className="w-full max-w-4xl mx-auto mb-3 flex items-center justify-between gap-3">
        
        {/* Modern Segmented Navigation Pill */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-sm backdrop-blur-md">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Chat</span>
          </button>

          <button
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
            onClick={() => {
              setActiveTab('analytics');
              if (messages.length > 0 && !analytics) {
                handleTriggerAnalytics();
              }
            }}
<<<<<<< HEAD
            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#E55934] text-white shadow-[0_4px_12px_rgba(229,89,52,0.3)]'
                : 'text-[#68707C] hover:text-[#111418] hover:bg-[#F7F8FA]'
            }`}
          >
            <BarChart3 className="h-4 w-4" strokeWidth={2.2} />
            <span>CRM Dossier</span>
            {messages.length > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === 'analytics' ? 'bg-white/20 text-white' : 'bg-[#F0F2F5] text-[#111418]'
=======
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>CRM Dossier</span>
            {messages.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                activeTab === 'analytics' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-amber-400'
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
              }`}>
                {messages.length}
              </span>
            )}
          </button>
<<<<<<< HEAD
=======

          <button
            onClick={() => setActiveTab('project')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'project'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Project Details</span>
          </button>
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
        </div>

        {/* Action Button: Book Site Visit */}
        <button
<<<<<<< HEAD
          id="btn-nav-book-visit"
          onClick={() => setIsBookingOpen(true)}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-white/95 text-[#111418] text-xs font-bold border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(229,89,52,0.15)] transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Calendar className="h-4 w-4 text-[#E55934]" strokeWidth={2.2} />
          <span>Book Sample Flat Tour</span>
        </button>

      </nav>

      {/* Main View Container */}
      <main className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full mb-16 sm:mb-2">
=======
          onClick={() => setIsBookingOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-medium border border-amber-500/30 hover:border-amber-500/50 transition shadow-sm backdrop-blur-md cursor-pointer"
        >
          <Calendar className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Book Visit</span>
        </button>

      </div>

      {/* Main View Container */}
      <main className="flex-1 flex flex-col">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
        {activeTab === 'chat' && (
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            onReset={handleResetChat}
            onOpenBooking={() => setIsBookingOpen(true)}
            onTriggerAnalytics={handleTriggerAnalytics}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            analytics={analytics}
            isLoading={isAnalyticsLoading}
            onRefreshAnalytics={handleTriggerAnalytics}
            onReturnToChat={() => setActiveTab('chat')}
            messageCount={messages.length}
          />
        )}

        {activeTab === 'project' && (
          <ProjectOverview
            onOpenBooking={() => setIsBookingOpen(true)}
            onSelectPrompt={(text) => {
              setActiveTab('chat');
              handleSendMessage(text);
            }}
          />
        )}
      </main>

<<<<<<< HEAD
      {/* Floating Bottom Dock for Mobile */}
      <div className="sm:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#23272F] shadow-[0_8px_25px_rgba(0,0,0,0.25)] border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('project')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              activeTab === 'project'
                ? 'bg-white text-[#111418] shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
            <span>Project</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              activeTab === 'chat'
                ? 'bg-white text-[#111418] shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
            <span>Chat</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('analytics');
              if (messages.length > 0 && !analytics) handleTriggerAnalytics();
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              activeTab === 'analytics'
                ? 'bg-white text-[#111418] shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
            <span>Dossier</span>
          </button>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="p-2 rounded-full bg-[#E55934] text-white hover:bg-[#D94824] transition shadow"
            title="Book Visit"
          >
            <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>

=======
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
      {/* Site Visit Booking Modal */}
      <SiteVisitModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

    </div>
  );
}
