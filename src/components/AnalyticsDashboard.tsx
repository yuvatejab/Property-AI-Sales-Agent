import React, { useState } from 'react';
import { 
  BarChart3, 
  User, 
  Phone, 
  Home, 
  Wallet, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Languages, 
  Compass,
  FileSpreadsheet,
  HelpCircle,
<<<<<<< HEAD
  MessageSquare,
  Flame,
  Activity
=======
  MessageSquare
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
} from 'lucide-react';
import { LeadAnalytics } from '../types';

interface AnalyticsDashboardProps {
  analytics: LeadAnalytics | null;
  isLoading: boolean;
  onRefreshAnalytics: () => void;
  onReturnToChat: () => void;
  messageCount: number;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  analytics,
  isLoading,
  onRefreshAnalytics,
  onReturnToChat,
  messageCount
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyJSON = () => {
    if (!analytics) return;
    navigator.clipboard.writeText(JSON.stringify(analytics, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getInterestColor = (level: string) => {
    switch (level) {
      case 'High':
<<<<<<< HEAD
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Medium':
        return 'bg-[#FFF2EE] text-[#E55934] border-[#E55934]/30';
      case 'Low':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'DND / Not Interested':
        return 'bg-rose-50 text-rose-600 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
=======
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Medium':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Low':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'DND / Not Interested':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
    }
  };

  const getSiteVisitColor = (status: string) => {
    switch (status) {
      case 'Booked':
<<<<<<< HEAD
        return 'bg-emerald-500 text-white font-bold';
      case 'Interested (Tentative)':
        return 'bg-[#E55934] text-white font-semibold';
=======
        return 'bg-emerald-500 text-slate-950 font-bold';
      case 'Interested (Tentative)':
        return 'bg-amber-500 text-slate-950 font-semibold';
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
      case 'Follow-up Required':
        return 'bg-blue-500 text-white font-medium';
      case 'Declined':
        return 'bg-rose-500 text-white font-medium';
      default:
<<<<<<< HEAD
        return 'bg-slate-200 text-slate-700';
=======
        return 'bg-slate-800 text-slate-400';
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in text-[#1A1D20]">
      
      {/* Top Banner */}
      <div className="bg-white rounded-[24px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFF2EE] text-[#E55934] rounded-2xl">
              <BarChart3 className="h-5 w-5" strokeWidth={2} />
            </div>
            <h2 className="text-base font-bold text-[#111418] tracking-tight">Lead Qualification & CRM Dossier</h2>
            <span className="text-[11px] bg-[#F7F8FA] text-[#E55934] px-3 py-0.5 rounded-full border border-black/[0.04] font-bold">
              {messageCount} Turns
            </span>
          </div>
          <p className="text-xs text-[#71767F] font-medium mt-1">
=======
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in text-slate-200">
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold text-white">Lead Qualification & CRM Dossier</h2>
            <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full border border-slate-700">
              {messageCount} Turns
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
            Structured buyer intelligence automatically extracted from Priya's conversation.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onRefreshAnalytics}
            disabled={isLoading || messageCount === 0}
<<<<<<< HEAD
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F7F8FA] hover:bg-[#ECEEF1] text-[#2B303A] border border-black/[0.04] rounded-full text-xs font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-[#E55934]' : ''}`} strokeWidth={2} />
=======
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
            <span>Re-analyze</span>
          </button>

          <button
            onClick={onReturnToChat}
<<<<<<< HEAD
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-[#E55934] hover:bg-[#D94824] text-white font-bold rounded-full text-xs transition-all duration-200 shadow-[0_4px_14px_rgba(229,89,52,0.3)] cursor-pointer hover:scale-105 active:scale-95"
          >
            <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} />
=======
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            <MessageSquare className="h-3.5 w-3.5" />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
            <span>Open Chat</span>
          </button>
        </div>
      </div>

      {isLoading ? (
<<<<<<< HEAD
        <div className="bg-white rounded-[26px] p-10 text-center space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF2EE] flex items-center justify-center text-[#E55934]">
              <Sparkles className="h-6 w-6 animate-spin text-[#E55934]" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-sm font-bold text-[#111418] tracking-tight">Analyzing Buyer Transcript...</h3>
          <p className="text-xs text-[#71767F] max-w-sm mx-auto leading-relaxed">
=======
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <Sparkles className="h-8 w-8 text-amber-400 animate-spin mx-auto" />
          <h3 className="text-sm font-semibold text-white">Analyzing Buyer Transcript...</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
            Extracting qualification parameters, budget fit, objections, and site visit timeline.
          </p>
        </div>
      ) : !analytics || messageCount === 0 ? (
<<<<<<< HEAD
        <div className="bg-white rounded-[26px] p-10 text-center space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
          <div className="w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center mx-auto text-[#71767F]">
            <HelpCircle className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-bold text-[#111418] tracking-tight">No Conversation Data Yet</h3>
          <p className="text-xs text-[#71767F] max-w-md mx-auto leading-relaxed">
=======
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <HelpCircle className="h-8 w-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No Conversation Data Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
            Engage with Priya in the conversation tab to automatically produce structured CRM intelligence.
          </p>
          <button
            onClick={onReturnToChat}
<<<<<<< HEAD
            className="px-5 py-2.5 bg-[#E55934] text-white font-bold rounded-full text-xs hover:bg-[#D94824] transition-all duration-200 shadow-[0_4px_14px_rgba(229,89,52,0.3)] cursor-pointer hover:scale-105 active:scale-95"
=======
            className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-xl text-xs hover:bg-amber-400 transition cursor-pointer"
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
          >
            Start Conversation with Priya
          </button>
        </div>
      ) : (
<<<<<<< HEAD
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
=======
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
          
          {/* Main Dossier */}
          <div className="space-y-4 lg:col-span-2">
            
            {/* Executive Summary */}
<<<<<<< HEAD
            <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-bold text-[#E55934] uppercase tracking-wider">
                  Executive Dossier
                </span>
                <span className={`text-[11px] px-3 py-0.5 rounded-full border font-bold ${getInterestColor(analytics.interest_level)}`}>
=======
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4.5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  Executive Dossier
                </span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${getInterestColor(analytics.interest_level)}`}>
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                  Interest: {analytics.interest_level}
                </span>
              </div>

<<<<<<< HEAD
              <p className="text-xs text-[#2B303A] leading-relaxed italic bg-[#F7F8FA] p-3.5 rounded-2xl border border-black/[0.02]">
=======
              <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                "{analytics.conversation_summary || 'Customer engaged with Priya inquiring about Northstar One.'}"
              </p>

              {/* Pillars Grid */}
<<<<<<< HEAD
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[10px] text-[#71767F] font-bold uppercase flex items-center gap-1 mb-0.5">
                    <User className="h-3 w-3 text-[#E55934]" strokeWidth={2} />
                    Prospect
                  </span>
                  <span className="font-bold text-xs text-[#111418] truncate block">
=======
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <User className="h-3 w-3 text-amber-400" />
                    Customer Name
                  </span>
                  <span className="font-semibold text-xs text-white truncate block">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.lead_name || 'Prospect'}
                  </span>
                </div>

<<<<<<< HEAD
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[10px] text-[#71767F] font-bold uppercase flex items-center gap-1 mb-0.5">
                    <Phone className="h-3 w-3 text-[#E55934]" strokeWidth={2} />
                    Contact
                  </span>
                  <span className="font-bold text-xs text-[#111418] truncate block">
=======
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Phone className="h-3 w-3 text-amber-400" />
                    Contact
                  </span>
                  <span className="font-semibold text-xs text-white truncate block">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.contact_number || 'Not Captured'}
                  </span>
                </div>

<<<<<<< HEAD
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[10px] text-[#71767F] font-bold uppercase flex items-center gap-1 mb-0.5">
                    <Languages className="h-3 w-3 text-[#E55934]" strokeWidth={2} />
                    Language
                  </span>
                  <span className="font-bold text-xs text-[#E55934]">
=======
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Languages className="h-3 w-3 text-amber-400" />
                    Language
                  </span>
                  <span className="font-semibold text-xs text-amber-300">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.language_detected}
                  </span>
                </div>

<<<<<<< HEAD
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[10px] text-[#71767F] font-bold uppercase flex items-center gap-1 mb-0.5">
                    <Home className="h-3 w-3 text-[#E55934]" strokeWidth={2} />
                    Preference
                  </span>
                  <span className="font-bold text-xs text-[#111418]">
=======
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Home className="h-3 w-3 text-amber-400" />
                    Configuration
                  </span>
                  <span className="font-semibold text-xs text-white">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.configuration_preference}
                  </span>
                </div>

<<<<<<< HEAD
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[10px] text-[#71767F] font-bold uppercase flex items-center gap-1 mb-0.5">
                    <Wallet className="h-3 w-3 text-[#E55934]" strokeWidth={2} />
                    Budget Fit
                  </span>
                  <span className="font-bold text-xs text-[#111418]">
=======
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Wallet className="h-3 w-3 text-amber-400" />
                    Budget Fit
                  </span>
                  <span className="font-semibold text-xs text-white">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.budget_fit}
                  </span>
                </div>

<<<<<<< HEAD
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[10px] text-[#71767F] font-bold uppercase flex items-center gap-1 mb-0.5">
                    <Compass className="h-3 w-3 text-[#E55934]" strokeWidth={2} />
                    Purpose
                  </span>
                  <span className="font-bold text-xs text-[#111418]">
=======
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Compass className="h-3 w-3 text-amber-400" />
                    Purpose
                  </span>
                  <span className="font-semibold text-xs text-white">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.purchase_purpose}
                  </span>
                </div>

              </div>
            </div>

            {/* Visit Status & Action */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<<<<<<< HEAD
              <div className="bg-white rounded-[24px] p-4.5 space-y-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#71767F] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
                    Site Visit Status
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${getSiteVisitColor(analytics.site_visit_status)}`}>
=======
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Site Visit Status
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${getSiteVisitColor(analytics.site_visit_status)}`}>
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.site_visit_status}
                  </span>
                </div>

<<<<<<< HEAD
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#71767F] font-medium">Date:</span>
                    <span className="font-bold text-[#111418]">{analytics.site_visit_date || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71767F] font-medium">Time:</span>
                    <span className="font-bold text-[#111418]">{analytics.site_visit_time || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#71767F] font-medium">Cab Service:</span>
                    <span className="font-bold text-[#E55934]">{analytics.cab_requested ? 'Chauffeur Pick-up' : 'Self-Drive'}</span>
=======
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-medium text-white">{analytics.site_visit_date || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time:</span>
                    <span className="font-medium text-white">{analytics.site_visit_time || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cab:</span>
                    <span className="font-medium text-emerald-400">{analytics.cab_requested ? 'Chauffeur Pick-up' : 'Self-Drive'}</span>
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <div className="bg-white rounded-[24px] p-4.5 space-y-2.5 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
                <div>
                  <span className="text-[11px] font-bold text-[#71767F] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
                    Actionable Follow-up
                  </span>
                  <p className="text-xs text-[#2B303A] bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
=======
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <CheckCircle2 className="h-3 w-3" />
                    Actionable Follow-up
                  </span>
                  <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    {analytics.follow_up_action || 'Send WhatsApp project brochure.'}
                  </p>
                </div>

                {analytics.escalation_required && (
<<<<<<< HEAD
                  <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-[11px] text-rose-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" strokeWidth={2} />
=======
                  <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg text-[11px] text-rose-300 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                    <span><strong>Escalation:</strong> {analytics.escalation_reason || 'Senior advisor requested.'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Objections */}
<<<<<<< HEAD
            <div className="bg-white rounded-[24px] p-4.5 space-y-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
              <span className="text-[11px] font-bold text-[#71767F] uppercase tracking-wider block">
                Objections & Resolution Status
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[#71767F] font-bold uppercase text-[10px] block mb-1.5">Raised:</span>
                  {analytics.objections_raised && analytics.objections_raised.length > 0 ? (
                    <ul className="space-y-1">
                      {analytics.objections_raised.map((obj, i) => (
                        <li key={i} className="text-rose-600 flex items-center gap-1.5 text-xs font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
=======
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                Objections & Resolution Status
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block mb-1">Raised:</span>
                  {analytics.objections_raised && analytics.objections_raised.length > 0 ? (
                    <ul className="space-y-0.5">
                      {analytics.objections_raised.map((obj, i) => (
                        <li key={i} className="text-rose-300 flex items-center gap-1 text-[11px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
<<<<<<< HEAD
                    <span className="text-[#8E95A0] text-xs">None</span>
                  )}
                </div>

                <div className="bg-[#F7F8FA] p-3 rounded-2xl border border-black/[0.02]">
                  <span className="text-[#71767F] font-bold uppercase text-[10px] block mb-1.5">Resolved:</span>
                  {analytics.objections_resolved && analytics.objections_resolved.length > 0 ? (
                    <ul className="space-y-1">
                      {analytics.objections_resolved.map((res, i) => (
                        <li key={i} className="text-emerald-700 flex items-center gap-1.5 text-xs font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" strokeWidth={2} />
=======
                    <span className="text-slate-500 text-[10px]">None</span>
                  )}
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block mb-1">Resolved:</span>
                  {analytics.objections_resolved && analytics.objections_resolved.length > 0 ? (
                    <ul className="space-y-0.5">
                      {analytics.objections_resolved.map((res, i) => (
                        <li key={i} className="text-emerald-300 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
<<<<<<< HEAD
                    <span className="text-[#8E95A0] text-xs">None active</span>
=======
                    <span className="text-slate-500 text-[10px]">None active</span>
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* CRM JSON Export */}
<<<<<<< HEAD
          <div className="bg-white rounded-[26px] p-4.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5">
                <span className="text-[11px] font-bold text-[#111418] uppercase tracking-wider flex items-center gap-1.5">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
=======
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-amber-400" />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                  JSON Payload
                </span>
                <button
                  onClick={handleCopyJSON}
<<<<<<< HEAD
                  className="text-xs font-semibold text-[#E55934] hover:text-[#D94824] flex items-center gap-1 bg-[#FFF2EE] px-3 py-1 rounded-full border border-[#E55934]/20 transition cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-500" strokeWidth={2} /> : <Copy className="h-3 w-3" strokeWidth={2} />}
=======
                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 transition cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

<<<<<<< HEAD
              <div className="bg-[#F7F8FA] rounded-2xl p-3.5 border border-black/[0.02] max-h-80 overflow-y-auto font-mono text-[10px] text-[#2B303A] leading-relaxed scrollbar-thin">
=======
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 max-h-80 overflow-y-auto font-mono text-[10px] text-amber-200/90 leading-relaxed scrollbar-thin">
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
                <pre>{JSON.stringify(analytics, null, 2)}</pre>
              </div>
            </div>

            <button
              onClick={handleCopyJSON}
<<<<<<< HEAD
              className="w-full py-2.5 px-4 rounded-full bg-[#F7F8FA] hover:bg-[#ECEEF1] text-[#2B303A] font-bold text-xs border border-black/[0.04] transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Copy className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
=======
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 text-amber-400" />
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
              <span>Copy Structured CRM Record</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
