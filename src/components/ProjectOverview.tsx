import React from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Car, 
  Compass, 
  Trees, 
  Calendar,
  Layers,
  ArrowRight,
  Flame,
  Star,
  Activity
} from 'lucide-react';
import { PROJECT_DETAILS } from '../constants/systemPrompt';

interface ProjectOverviewProps {
  onOpenBooking: () => void;
  onSelectPrompt: (promptText: string) => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  onOpenBooking,
  onSelectPrompt
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in text-[#1A1D20]">
      
      {/* Featured Terracotta Gradient Banner (Matching Reference Screen 1 & 2) */}
      <div className="bg-gradient-to-br from-[#E85D3F] to-[#D94824] rounded-[28px] p-6 sm:p-7 text-white relative overflow-hidden shadow-[0_10px_30px_rgba(229,89,52,0.25)]">
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-20 top-4 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white">
              <MapPin className="h-3 w-3 text-white" strokeWidth={2.2} />
              <span>Sector 79, Gurugram • RERA Registered</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Northstar One
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg leading-relaxed font-normal">
              Nestled at the scenic Aravalli foothills with 80% open landscaped greens, a 30,000+ sq.ft grand clubhouse, and rapid 15-min connectivity to Cyber City.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-5 py-3 rounded-full bg-white hover:bg-white/95 text-[#111418] font-bold text-xs transition-all duration-200 flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-[#E55934]" strokeWidth={2.2} />
            <span>Book Sample Flat Tour</span>
          </button>
        </div>
      </div>

      {/* Configurations Cards Grid in Clean Minimalist White Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 2 BHK Card */}
        <div className="bg-white rounded-[26px] p-6 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(229,89,52,0.08)] transition-all duration-200 group space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#FFF2EE] text-[#E55934]">
                <Building2 className="h-6 w-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#111418] tracking-tight">2 BHK Luxury Residences</h3>
                <p className="text-xs text-[#71767F] font-medium">1,250 – 1,350 sq.ft Carpet Area</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-[#E55934] block">₹1.35 Cr*</span>
              <span className="text-[10px] text-[#8E95A0] font-medium">Starting Price</span>
            </div>
          </div>

          <p className="text-xs text-[#525761] leading-relaxed">
            Thoughtfully planned for modern families and young professionals with floor-to-ceiling windows, panoramic green views, and modular kitchens.
          </p>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-[#8E95A0] font-medium">Possession: Q4 2027</span>
            <button
              onClick={() => onSelectPrompt("Tell me more about 2 BHK floor plans and pricing payment schedule")}
              className="text-xs text-[#E55934] group-hover:text-[#D94824] flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>Ask Priya</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* 3 BHK Card */}
        <div className="bg-white rounded-[26px] p-6 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(229,89,52,0.08)] transition-all duration-200 group space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#FFF2EE] text-[#E55934]">
                <Layers className="h-6 w-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#111418] tracking-tight">3 BHK Premium Suites</h3>
                <p className="text-xs text-[#71767F] font-medium">1,650 – 1,850 sq.ft Carpet Area</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-[#E55934] block">₹1.75 Cr*</span>
              <span className="text-[10px] text-[#8E95A0] font-medium">Starting Price</span>
            </div>
          </div>

          <p className="text-xs text-[#525761] leading-relaxed">
            Expansive 3-bedroom residences featuring double-height deck balconies, servant/utility rooms, and unobstructed Aravalli sunset vistas.
          </p>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-[#8E95A0] font-medium">Possession: Q4 2027</span>
            <button
              onClick={() => onSelectPrompt("What are the key highlights and balcony dimensions for 3 BHK?")}
              className="text-xs text-[#E55934] group-hover:text-[#D94824] flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>Ask Priya</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
          </div>
        </div>

      </div>

      {/* Amenities & Highlights */}
      <div className="bg-white rounded-[26px] p-6 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#71767F] flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#E55934]" strokeWidth={2} />
            Key Signature Amenities & Highlights
          </h3>
          <span className="text-[11px] font-semibold text-[#E55934] bg-[#FFF2EE] px-2.5 py-0.5 rounded-full">
            30+ Amenities
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PROJECT_DETAILS.amenities.map((item, idx) => (
            <div key={idx} className="bg-[#F7F8FA] rounded-2xl p-3.5 flex items-start gap-3 border border-black/[0.02]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-xs font-medium text-[#2B303A]">{item}</span>
            </div>
          ))}
          <div className="bg-[#F7F8FA] rounded-2xl p-3.5 flex items-start gap-3 border border-black/[0.02]">
            <Car className="h-4 w-4 text-[#E55934] shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-xs font-medium text-[#2B303A]">Complimentary Chauffeur Site Pick-up</span>
          </div>
          <div className="bg-[#F7F8FA] rounded-2xl p-3.5 flex items-start gap-3 border border-black/[0.02]">
            <MapPin className="h-4 w-4 text-[#E55934] shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-xs font-medium text-[#2B303A]">15 mins to Cyber Hub & NH-48</span>
          </div>
          <div className="bg-[#F7F8FA] rounded-2xl p-3.5 flex items-start gap-3 border border-black/[0.02]">
            <Trees className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-xs font-medium text-[#2B303A]">Aravalli Foothills & Clean Air Index</span>
          </div>
        </div>
      </div>

    </div>
  );
};

