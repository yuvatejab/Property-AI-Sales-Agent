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
  ArrowRight
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
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-slate-200">
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Sector 79, Gurugram
              </span>
              <span className="text-xs text-slate-400 font-mono">RERA Registered • 2027</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Northstar One Luxury Residences</h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Nestled at the foothills of the scenic Aravallis with 80% open landscaped greens, a 30,000+ sq.ft grand clubhouse, and seamless 15-min connectivity to Cyber City.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition flex items-center gap-2 shadow cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Book Sample Flat Tour</span>
          </button>
        </div>
      </div>

      {/* Configurations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 2 BHK Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition group space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">2 BHK Luxury Residences</h3>
                <p className="text-xs text-slate-400">1,250 – 1,350 sq.ft Carpet Area</p>
              </div>
            </div>
            <span className="text-sm font-bold text-amber-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              ₹1.35 Cr*
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Thoughtfully planned for modern families and young professionals with floor-to-ceiling windows, panoramic green views, and modular kitchens.
          </p>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Target Possession: Q4 2027</span>
            <button
              onClick={() => onSelectPrompt("Tell me more about 2 BHK floor plans and pricing payment schedule")}
              className="text-xs text-amber-400 group-hover:text-amber-300 flex items-center gap-1 font-medium"
            >
              <span>Ask Priya</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>

        {/* 3 BHK Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition group space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">3 BHK Premium Suites</h3>
                <p className="text-xs text-slate-400">1,650 – 1,850 sq.ft Carpet Area</p>
              </div>
            </div>
            <span className="text-sm font-bold text-amber-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              ₹1.75 Cr*
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Expansive 3-bedroom residences featuring double-height deck balconies, servant/utility rooms, and unobstructed Aravalli sunset vistas.
          </p>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Target Possession: Q4 2027</span>
            <button
              onClick={() => onSelectPrompt("What are the key highlights and balcony dimensions for 3 BHK?")}
              className="text-xs text-amber-400 group-hover:text-amber-300 flex items-center gap-1 font-medium"
            >
              <span>Ask Priya</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>

      </div>

      {/* Amenities & Highlights */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          Key Signature Highlights & Amenities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PROJECT_DETAILS.amenities.map((item, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-200">{item}</span>
            </div>
          ))}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3 flex items-start gap-2.5">
            <Car className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-200">Complimentary Chauffeur Site Pick-up</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3 flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-200">15 mins to Cyber Hub & NH-48</span>
          </div>
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3 flex items-start gap-2.5">
            <Trees className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-xs text-slate-200">Aravalli Foothills & Clean Air Index</span>
          </div>
        </div>
      </div>

    </div>
  );
};
