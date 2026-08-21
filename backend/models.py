"""
Pydantic Data Models for Northstar Homes AI Sales Agent (FastAPI Backend)
"""

from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str
    timestamp: Optional[str] = None


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_message: str
    session_id: Optional[str] = "default-session"
    language_hint: Optional[str] = None


class SiteVisitBookingRequest(BaseModel):
    customer_name: str
    contact_number: str
    preferred_date: str
    preferred_time: str
    configuration_interest: Optional[str] = "2 BHK"
    cab_required: bool = False
    pickup_address: Optional[str] = None
    force_failure: bool = False  # Allows testing failure recovery scenarios


class SiteVisitBookingResponse(BaseModel):
    status: Literal["confirmed", "failed", "rescheduled"]
    booking_id: Optional[str] = None
    message: str
    details: Optional[Dict[str, Any]] = None
    alternative_slots: Optional[List[str]] = None


class LeadAnalytics(BaseModel):
    lead_name: str = "Unknown"
    contact_number: Optional[str] = None
    configuration_preference: Literal["2 BHK", "3 BHK", "Both / Undecided", "None / Unspecified"] = "None / Unspecified"
    budget_fit: Literal["Comfortable", "Stretching", "Out of Budget", "Unspecified"] = "Unspecified"
    purchase_purpose: Literal["Self-Use", "Investment", "Undecided"] = "Undecided"
    timeline: Literal["Immediate (<3 months)", "3-6 months", "6-12 months", "Long term (>1 year)", "Unknown"] = "Unknown"
    interest_level: Literal["High", "Medium", "Low", "DND / Not Interested"] = "Low"
    site_visit_status: Literal["Booked", "Interested (Tentative)", "Follow-up Required", "Declined", "Not Reached"] = "Not Reached"
    site_visit_date: Optional[str] = None
    site_visit_time: Optional[str] = None
    cab_requested: bool = False
    objections_raised: List[str] = Field(default_factory=list)
    objections_resolved: List[str] = Field(default_factory=list)
    language_detected: Literal["English", "Hindi", "Hinglish"] = "English"
    follow_up_action: str = "Send brochure on WhatsApp"
    escalation_required: bool = False
    escalation_reason: Optional[str] = None
    conversation_summary: str = ""
    voice_suitability_score: int = 100  # 0 to 100 based on brevity and absence of clutter
