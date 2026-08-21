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
  MessageSquare
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
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Medium':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Low':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'DND / Not Interested':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  const getSiteVisitColor = (status: string) => {
    switch (status) {
      case 'Booked':
        return 'bg-emerald-500 text-slate-950 font-bold';
      case 'Interested (Tentative)':
        return 'bg-amber-500 text-slate-950 font-semibold';
      case 'Follow-up Required':
        return 'bg-blue-500 text-white font-medium';
      case 'Declined':
        return 'bg-rose-500 text-white font-medium';
      default:
        return 'bg-slate-800 text-slate-400';
    }
  };

  return (
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
            Structured buyer intelligence automatically extracted from Priya's conversation.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onRefreshAnalytics}
            disabled={isLoading || messageCount === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Re-analyze</span>
          </button>

          <button
            onClick={onReturnToChat}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Open Chat</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <Sparkles className="h-8 w-8 text-amber-400 animate-spin mx-auto" />
          <h3 className="text-sm font-semibold text-white">Analyzing Buyer Transcript...</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Extracting qualification parameters, budget fit, objections, and site visit timeline.
          </p>
        </div>
      ) : !analytics || messageCount === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <HelpCircle className="h-8 w-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No Conversation Data Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Engage with Priya in the conversation tab to automatically produce structured CRM intelligence.
          </p>
          <button
            onClick={onReturnToChat}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-xl text-xs hover:bg-amber-400 transition cursor-pointer"
          >
            Start Conversation with Priya
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Main Dossier */}
          <div className="space-y-4 lg:col-span-2">
            
            {/* Executive Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4.5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  Executive Dossier
                </span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${getInterestColor(analytics.interest_level)}`}>
                  Interest: {analytics.interest_level}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                "{analytics.conversation_summary || 'Customer engaged with Priya inquiring about Northstar One.'}"
              </p>

              {/* Pillars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <User className="h-3 w-3 text-amber-400" />
                    Customer Name
                  </span>
                  <span className="font-semibold text-xs text-white truncate block">
                    {analytics.lead_name || 'Prospect'}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Phone className="h-3 w-3 text-amber-400" />
                    Contact
                  </span>
                  <span className="font-semibold text-xs text-white truncate block">
                    {analytics.contact_number || 'Not Captured'}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Languages className="h-3 w-3 text-amber-400" />
                    Language
                  </span>
                  <span className="font-semibold text-xs text-amber-300">
                    {analytics.language_detected}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Home className="h-3 w-3 text-amber-400" />
                    Configuration
                  </span>
                  <span className="font-semibold text-xs text-white">
                    {analytics.configuration_preference}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Wallet className="h-3 w-3 text-amber-400" />
                    Budget Fit
                  </span>
                  <span className="font-semibold text-xs text-white">
                    {analytics.budget_fit}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                    <Compass className="h-3 w-3 text-amber-400" />
                    Purpose
                  </span>
                  <span className="font-semibold text-xs text-white">
                    {analytics.purchase_purpose}
                  </span>
                </div>

              </div>
            </div>

            {/* Visit Status & Action */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Site Visit Status
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${getSiteVisitColor(analytics.site_visit_status)}`}>
                    {analytics.site_visit_status}
                  </span>
                </div>

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
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <CheckCircle2 className="h-3 w-3" />
                    Actionable Follow-up
                  </span>
                  <p className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    {analytics.follow_up_action || 'Send WhatsApp project brochure.'}
                  </p>
                </div>

                {analytics.escalation_required && (
                  <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg text-[11px] text-rose-300 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                    <span><strong>Escalation:</strong> {analytics.escalation_reason || 'Senior advisor requested.'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Objections */}
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
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
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
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-slate-500 text-[10px]">None active</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* CRM JSON Export */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-amber-400" />
                  JSON Payload
                </span>
                <button
                  onClick={handleCopyJSON}
                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 transition cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 max-h-80 overflow-y-auto font-mono text-[10px] text-amber-200/90 leading-relaxed scrollbar-thin">
                <pre>{JSON.stringify(analytics, null, 2)}</pre>
              </div>
            </div>

            <button
              onClick={handleCopyJSON}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 text-amber-400" />
              <span>Copy Structured CRM Record</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
