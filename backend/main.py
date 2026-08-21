"""
FastAPI Server for Northstar Homes AI Conversational Agent
Mandatory Backend Framework: FastAPI (Python)
"""

import os
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from backend.prompt import MASTER_SYSTEM_PROMPT
from backend.models import (
    ChatRequest,
    ChatMessage,
    SiteVisitBookingRequest,
    SiteVisitBookingResponse,
    LeadAnalytics,
)
from backend.agent import NorthstarSalesAgent

load_dotenv()

app = FastAPI(
    title="Northstar Homes AI Sales Agent API",
    description="FastAPI Backend for Real-Estate AI Agent (Priya) for Northstar One, Sector 79 Gurugram",
    version="1.0.0"
)

# Enable CORS for web frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = NorthstarSalesAgent()


@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "agent": "Priya - Northstar Homes Senior Relationship Associate",
        "project": "Northstar One, Sector 79 Gurugram",
        "backend": "FastAPI (Python)",
        "gemini_api_configured": bool(os.environ.get("GEMINI_API_KEY"))
    }


@app.get("/api/prompt")
async def get_system_prompt():
    """Returns the master system prompt and project metadata."""
    return {
        "prompt": MASTER_SYSTEM_PROMPT,
        "project": "Northstar One",
        "location": "Sector 79, Gurugram",
        "starting_prices": {
            "2_BHK": "₹1.35 Crore onwards",
            "3_BHK": "₹1.75 Crore onwards"
        },
        "target_modes": ["Chat", "Voice / Calling"]
    }


@app.post("/api/chat")
async def handle_chat(request: ChatRequest):
    """
    Accepts user message and history, returns agent response adhering to voice & chat prompt.
    """
    try:
        response_text = await agent.generate_response(
            messages=request.messages,
            user_message=request.user_message,
            language_hint=request.language_hint
        )
        return {
            "reply": response_text,
            "session_id": request.session_id,
            "speaker": "Priya (Northstar Homes)"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/book-site-visit", response_model=SiteVisitBookingResponse)
async def handle_site_visit(request: SiteVisitBookingRequest):
    """
    Simulates on-site sample apartment booking at Sector 79 Experience Centre.
    Handles confirmations and slot conflict / failure recoveries.
    """
    try:
        result = await agent.book_site_visit(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/analytics", response_model=LeadAnalytics)
async def generate_lead_analytics(payload: Dict[str, List[ChatMessage]] = Body(...)):
    """
    Analyzes conversation transcript and produces post-conversation CRM analytics.
    """
    try:
        messages = payload.get("messages", [])
        analytics = await agent.extract_analytics(messages)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
