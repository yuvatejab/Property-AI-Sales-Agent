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

export type MainTab = 'chat' | 'analytics' | 'project';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('chat');
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
            onClick={() => {
              setActiveTab('analytics');
              if (messages.length > 0 && !analytics) {
                handleTriggerAnalytics();
              }
            }}
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
              }`}>
                {messages.length}
              </span>
            )}
          </button>

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
        </div>

        {/* Action Button: Book Site Visit */}
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-medium border border-amber-500/30 hover:border-amber-500/50 transition shadow-sm backdrop-blur-md cursor-pointer"
        >
          <Calendar className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Book Visit</span>
        </button>

      </div>

      {/* Main View Container */}
      <main className="flex-1 flex flex-col">
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

      {/* Site Visit Booking Modal */}
      <SiteVisitModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingComplete={handleBookingComplete}
      />

    </div>
  );
}
