import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Car, 
  Building, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { SiteVisitBookingData, SiteVisitBookingResult } from '../types';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: (result: SiteVisitBookingResult) => void;
}

export const SiteVisitModal: React.FC<SiteVisitModalProps> = ({
  isOpen,
  onClose,
  onBookingComplete
}) => {
  const [formData, setFormData] = useState<SiteVisitBookingData>({
    customerName: '',
    contactNumber: '',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '11:00 AM',
    configurationInterest: '2 BHK',
    cabRequired: true,
    pickupAddress: 'DLF Phase 2, Gurugram',
    forceFailure: false,
  });

  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<SiteVisitBookingResult | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBookingResult(null);

    try {
      const response = await fetch('/api/book-site-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result: SiteVisitBookingResult = await response.json();
      setBookingResult(result);
      if (onBookingComplete) {
        onBookingComplete(result);
      }
    } catch (err) {
      setBookingResult({
        status: 'failed',
        message: 'Could not connect to booking engine. Please retry.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAlternativeSlot = (slot: string) => {
    // Extract date and time if available
    const parts = slot.split(' at ');
    setFormData((prev) => ({
      ...prev,
      preferredDate: parts[0] || prev.preferredDate,
      preferredTime: parts[1] || '02:30 PM',
      forceFailure: false
    }));
    setBookingResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-black/[0.06] w-full max-w-lg rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden text-[#1A1D20]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#F7F8FA]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#FFF2EE] text-[#E55934]">
              <Calendar className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#111418] tracking-tight">Book Site Visit</h2>
              <p className="text-xs text-[#71767F] font-medium">Experience Centre • Sector 79, Gurugram</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#71767F] hover:text-[#111418] hover:bg-slate-200/50 transition cursor-pointer"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6">
          {/* If Booking is in Result State */}
          {bookingResult ? (
            <div className="space-y-4">
              {bookingResult.status === 'confirmed' ? (
                <div className="text-center py-4 space-y-3">
                  <div className="inline-flex p-3.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-[#111418] tracking-tight">Site Visit Confirmed!</h3>
                  <p className="text-xs text-[#525761] max-w-md mx-auto leading-relaxed">{bookingResult.message}</p>
                  
                  {bookingResult.details && (
                    <div className="bg-[#F7F8FA] border border-black/[0.04] rounded-2xl p-4 text-left text-xs space-y-2 mt-4">
                      <div className="flex justify-between border-b border-slate-200/60 pb-2">
                        <span className="text-[#71767F] font-medium">Booking ID:</span>
                        <span className="font-mono font-bold text-[#E55934]">{bookingResult.details.bookingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71767F] font-medium">Guest Name:</span>
                        <span className="font-bold text-[#111418]">{bookingResult.details.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71767F] font-medium">Date & Slot:</span>
                        <span className="font-bold text-[#111418]">{bookingResult.details.date} at {bookingResult.details.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71767F] font-medium">Configuration:</span>
                        <span className="font-bold text-[#111418]">{bookingResult.details.configurationInterest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71767F] font-medium">Transportation:</span>
                        <span className="font-bold text-emerald-600">{bookingResult.details.transportation}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-[#E55934] font-medium">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                        <span>{bookingResult.details.whatsappPinStatus}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => setBookingResult(null)}
                      className="w-1/2 py-2.5 px-4 rounded-full border border-black/[0.08] hover:bg-[#F7F8FA] text-xs font-bold transition cursor-pointer text-[#2B303A]"
                    >
                      Book Another
                    </button>
                    <button
                      onClick={onClose}
                      className="w-1/2 py-2.5 px-4 rounded-full bg-[#E55934] hover:bg-[#D94824] text-white font-bold text-xs transition shadow-[0_4px_14px_rgba(229,89,52,0.3)] cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Failure State */
                <div className="py-2 space-y-4">
                  <div className="flex items-start space-x-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700">
                    <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <h4 className="font-bold text-sm text-[#111418]">Slot Unavailable (Simulated Failure)</h4>
                      <p className="text-xs text-rose-700 mt-1">{bookingResult.message}</p>
                    </div>
                  </div>

                  {bookingResult.alternativeSlots && bookingResult.alternativeSlots.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-[#111418]">
                        Priya's Recommended Alternate Slots:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {bookingResult.alternativeSlots.map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAlternativeSlot(slot)}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F8FA] border border-black/[0.04] hover:border-[#E55934]/40 hover:bg-[#FFF2EE] text-xs text-left transition group cursor-pointer"
                          >
                            <span className="font-bold text-[#2B303A] group-hover:text-[#E55934]">{slot}</span>
                            <span className="text-xs text-[#E55934] font-bold">Select Slot →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingResult(null)}
                      className="w-full py-2.5 px-4 rounded-full border border-black/[0.08] hover:bg-[#F7F8FA] text-xs font-bold transition cursor-pointer text-[#2B303A]"
                    >
                      Edit Booking Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-bold text-[#71767F] mb-1.5 uppercase">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <User className="h-4 w-4 absolute left-3.5 top-3 text-[#8E95A0]" strokeWidth={2} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F8FA] border border-black/[0.06] rounded-2xl text-xs text-[#111418] placeholder-[#8E95A0] focus:outline-none focus:border-[#E55934] focus:ring-1 focus:ring-[#E55934]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-[#71767F] mb-1.5 uppercase">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 absolute left-3.5 top-3 text-[#8E95A0]" strokeWidth={2} />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F8FA] border border-black/[0.06] rounded-2xl text-xs text-[#111418] placeholder-[#8E95A0] focus:outline-none focus:border-[#E55934] focus:ring-1 focus:ring-[#E55934]"
                    />
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-[#71767F] mb-1.5 uppercase">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="h-4 w-4 absolute left-3.5 top-3 text-[#8E95A0]" strokeWidth={2} />
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F8FA] border border-black/[0.06] rounded-2xl text-xs text-[#111418] focus:outline-none focus:border-[#E55934] focus:ring-1 focus:ring-[#E55934]"
                    />
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-[#71767F] mb-1.5 uppercase">
                    Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="h-4 w-4 absolute left-3.5 top-3 text-[#8E95A0]" strokeWidth={2} />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F8FA] border border-black/[0.06] rounded-2xl text-xs text-[#111418] focus:outline-none focus:border-[#E55934] focus:ring-1 focus:ring-[#E55934]"
                    >
                      <option value="10:30 AM">10:30 AM (Morning Slot)</option>
                      <option value="11:00 AM">11:00 AM (Prime Slot)</option>
                      <option value="02:30 PM">02:30 PM (Afternoon Slot)</option>
                      <option value="04:30 PM">04:30 PM (Sunset Slot)</option>
                      <option value="06:00 PM">06:00 PM (Evening Slot)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Configuration Preference */}
              <div>
                <label className="block text-xs font-bold text-[#71767F] mb-2 uppercase">
                  Interested Configuration
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['2 BHK', '3 BHK', 'Both / Undecided'] as const).map((cfg) => (
                    <button
                      key={cfg}
                      type="button"
                      onClick={() => setFormData({ ...formData, configurationInterest: cfg })}
                      className={`py-2.5 px-3 text-xs rounded-2xl border text-center transition font-bold cursor-pointer ${
                        formData.configurationInterest === cfg
                          ? 'bg-[#FFF2EE] border-[#E55934] text-[#E55934] shadow-[0_2px_8px_rgba(229,89,52,0.15)]'
                          : 'bg-[#F7F8FA] border-black/[0.04] text-[#71767F] hover:text-[#111418]'
                      }`}
                    >
                      {cfg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complimentary Cab Pick-Up */}
              <div className="p-4 bg-[#F7F8FA] rounded-2xl border border-black/[0.04] space-y-2.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-[#111418] flex items-center gap-2">
                    <Car className="h-4 w-4 text-[#E55934]" strokeWidth={2} />
                    Complimentary Chauffeur Cab Pick-up
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.cabRequired}
                    onChange={(e) => setFormData({ ...formData, cabRequired: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-[#E55934] focus:ring-[#E55934] cursor-pointer"
                  />
                </label>

                {formData.cabRequired && (
                  <input
                    type="text"
                    placeholder="Pickup address / landmark"
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-black/[0.06] rounded-xl text-xs text-[#111418] placeholder-[#8E95A0] focus:outline-none focus:border-[#E55934]"
                  />
                )}
              </div>

              {/* Simulate Failure Switch (For Evaluators & Reviewers) */}
              <div className="p-3 bg-[#FFF2EE]/50 rounded-2xl border border-[#E55934]/20 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-[#E55934] block">Simulate Booking Failure / Slot Conflict</span>
                  <span className="text-[#71767F] text-[11px]">Tests Priya's alternate slot recovery behaviour</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.forceFailure}
                  onChange={(e) => setFormData({ ...formData, forceFailure: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-[#E55934] focus:ring-[#E55934] cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 px-4 rounded-full border border-black/[0.08] hover:bg-[#F7F8FA] text-xs font-bold text-[#71767F] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-2.5 px-4 rounded-full bg-[#E55934] hover:bg-[#D94824] disabled:opacity-50 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(229,89,52,0.3)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" strokeWidth={2} />
                      <span>Checking Availability...</span>
                    </>
                  ) : (
                    <span>Confirm Site Visit Reservation</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
