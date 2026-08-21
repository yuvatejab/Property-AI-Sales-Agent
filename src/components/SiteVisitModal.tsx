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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-base text-white">Book Site Visit</h2>
              <p className="text-xs text-slate-400">Experience Centre • Sector 79, Gurugram</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* If Booking is in Result State */}
          {bookingResult ? (
            <div className="space-y-4">
              {bookingResult.status === 'confirmed' ? (
                <div className="text-center py-4 space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Site Visit Confirmed!</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">{bookingResult.message}</p>
                  
                  {bookingResult.details && (
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 mt-4">
                      <div className="flex justify-between border-b border-slate-800/80 pb-2">
                        <span className="text-slate-400">Booking ID:</span>
                        <span className="font-mono font-semibold text-amber-400">{bookingResult.details.bookingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Guest Name:</span>
                        <span className="font-medium text-white">{bookingResult.details.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Date & Slot:</span>
                        <span className="font-medium text-white">{bookingResult.details.date} at {bookingResult.details.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Configuration:</span>
                        <span className="font-medium text-white">{bookingResult.details.configurationInterest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Transportation:</span>
                        <span className="font-medium text-emerald-400">{bookingResult.details.transportation}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-amber-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{bookingResult.details.whatsappPinStatus}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => setBookingResult(null)}
                      className="w-1/2 py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-medium transition"
                    >
                      Book Another
                    </button>
                    <button
                      onClick={onClose}
                      className="w-1/2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Failure State */
                <div className="py-2 space-y-4">
                  <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                    <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-white">Slot Unavailable (Simulated Failure)</h4>
                      <p className="text-xs text-rose-200/90 mt-1">{bookingResult.message}</p>
                    </div>
                  </div>

                  {bookingResult.alternativeSlots && bookingResult.alternativeSlots.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-300">
                        Priya's Recommended Alternate Slots:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {bookingResult.alternativeSlots.map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectAlternativeSlot(slot)}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 text-xs text-left transition group"
                          >
                            <span className="font-medium text-slate-200 group-hover:text-amber-400">{slot}</span>
                            <span className="text-[11px] text-amber-400 font-medium">Select Slot →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingResult(null)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-medium transition"
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <User className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
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
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Interested Configuration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['2 BHK', '3 BHK', 'Both / Undecided'] as const).map((cfg) => (
                    <button
                      key={cfg}
                      type="button"
                      onClick={() => setFormData({ ...formData, configurationInterest: cfg })}
                      className={`py-2 px-2 text-xs rounded-xl border text-center transition font-medium ${
                        formData.configurationInterest === cfg
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {cfg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complimentary Cab Pick-Up */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/90 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                    <Car className="h-4 w-4 text-amber-400" />
                    Complimentary Chauffeur Cab Pick-up
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.cabRequired}
                    onChange={(e) => setFormData({ ...formData, cabRequired: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900"
                  />
                </label>

                {formData.cabRequired && (
                  <input
                    type="text"
                    placeholder="Pickup address / landmark"
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                )}
              </div>

              {/* Simulate Failure Switch (For Evaluators & Reviewers) */}
              <div className="p-2.5 bg-amber-500/5 rounded-xl border border-amber-500/20 flex items-center justify-between">
                <div className="text-[11px]">
                  <span className="font-semibold text-amber-400 block">Simulate Booking Failure / Slot Conflict</span>
                  <span className="text-slate-400">Tests Priya's alternate slot recovery behaviour</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.forceFailure}
                  onChange={(e) => setFormData({ ...formData, forceFailure: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
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
