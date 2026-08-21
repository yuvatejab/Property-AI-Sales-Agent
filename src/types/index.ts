export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  voiceAudioUrl?: string;
  intent?: string;
}

export interface SiteVisitBookingData {
  customerName: string;
  contactNumber: string;
  preferredDate: string;
  preferredTime: string;
  configurationInterest: '2 BHK' | '3 BHK' | 'Both / Undecided';
  cabRequired: boolean;
  pickupAddress?: string;
  forceFailure?: boolean;
}

export interface SiteVisitBookingResult {
  status: 'confirmed' | 'failed' | 'rescheduled';
  bookingId?: string;
  message: string;
  details?: {
    bookingId: string;
    project: string;
    location: string;
    customerName: string;
    contactNumber: string;
    date: string;
    time: string;
    configurationInterest: string;
    transportation: string;
    whatsappPinStatus: string;
  };
  alternativeSlots?: string[];
}

export interface LeadAnalytics {
  lead_name: string;
  contact_number: string | null;
  configuration_preference: '2 BHK' | '3 BHK' | 'Both / Undecided' | 'None / Unspecified';
  budget_fit: 'Comfortable' | 'Stretching' | 'Out of Budget' | 'Unspecified';
  purchase_purpose: 'Self-Use' | 'Investment' | 'Undecided';
  timeline: 'Immediate (<3 months)' | '3-6 months' | '6-12 months' | 'Long term (>1 year)' | 'Unknown';
  interest_level: 'High' | 'Medium' | 'Low' | 'DND / Not Interested';
  site_visit_status: 'Booked' | 'Interested (Tentative)' | 'Follow-up Required' | 'Declined' | 'Not Reached';
  site_visit_date?: string | null;
  site_visit_time?: string | null;
  cab_requested: boolean;
  objections_raised: string[];
  objections_resolved: string[];
  language_detected: 'English' | 'Hindi' | 'Hinglish';
  follow_up_action: string;
  escalation_required: boolean;
  escalation_reason?: string | null;
  conversation_summary: string;
  voice_suitability_score?: number;
}
