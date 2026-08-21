# Northstar Homes — AI Sales & Lead Qualification Agent (Priya)

> **Huvo AI | Forward Deployed Engineer Assignment**  
> Fictional Real-Estate Conversational Sales Agent for **Northstar Homes** (*Project: Northstar One, Sector 79, Gurugram*).

---

## 🏗️ 1. Project Overview & Scenario

Northstar Homes is launching **Northstar One**, an ultra-luxury residential community in **Sector 79, Gurugram** (foothills of the Aravalli hills).

### 📌 Project Truth & Grounding
- **Project Name:** Northstar One
- **Location:** Sector 79, Gurugram (Direct access via NH-48 & SPR, ~15-20 min from Cyber Hub)
- **Configurations & Starting Prices:**
  - **2 BHK:** ₹1.35 Crore onwards (approx. 1,250 – 1,350 sq. ft.)
  - **3 BHK:** ₹1.75 Crore onwards (approx. 1,650 – 1,850 sq. ft.)
- **Amenities:** 30,000+ sq. ft. Grand Clubhouse, Infinity Pool, Sports Courts, Landscaped Zen Gardens, EV Charging, 3-tier Security.
- **RERA Status & Possession:** RERA Registered, targeted possession in 2027.
- **Experience Centre:** Open all 7 days (10:00 AM – 7:00 PM) with complimentary chauffeur cab pick-up & drop.

---

## 🎯 2. Prompt Engineering Architecture

The master prompt (`backend/prompt.py` and `src/constants/systemPrompt.ts`) is designed for **dual compatibility across both Text Chat and Real-Time Voice/Telephony Calls**.

### 🌟 Core Prompt Design Principles:
1. **Voice-First Brevity & Zero TTS Clutter:**
   - Turn length is strictly bounded to **1 to 3 natural sentences** to prevent listener fatigue during phone calls.
   - **Zero Markdown Clutter:** The prompt explicitly instructs the LLM to avoid markdown asterisks (`**bold**`), list markers (`* bullet`), and emojis in spoken turns, ensuring Text-To-Speech (TTS) engines pronounce clean human dialogue.
2. **Seamless Multilingual & Code-Switching (Hindi / Hinglish / English):**
   - Automatically detects and mirrors customer language without robotic translation artifacts.
   - *Example Hinglish:* `"Northstar One mein 2 BHK starting price ₹1.35 crore onwards hai. Kya aap apne rehne ke liye dekh rahe hain ya investment ke liye?"`
3. **4-Pillar Lead Qualification Protocol:**
   - **Configuration:** 2 BHK vs 3 BHK.
   - **Purpose:** Self-use (family stay) vs Investment (rental yield / capital appreciation).
   - **Budget Alignment:** Validating comfort with starting prices (₹1.35 Cr / ₹1.75 Cr).
   - **Purchase Timeline:** Immediate, 3–6 months, or long term.
4. **Objection Handling Matrix:**
   - *Price Objection ("1.35 Cr is too high"):* Empathizes, anchors value (Aravalli views, 30k sq.ft clubhouse, price compared to Golf Course Extn at ₹2.5 Cr+), mentions construction-linked payment plans, and bridges to a sample flat visit.
   - *Location Objection ("Sector 79 is far"):* Clarifies signal-free connectivity via NH-48 / SPR to Cyber City while offering clean air and peaceful greenery.
5. **Customer Situation Handlers:**
   - *Busy / Call Later:* Immediately stops sales pitch, offers specific follow-up time slots (e.g. tomorrow at 11 AM or 5 PM).
   - *DND / Stop Communication:* Instantly complies with zero pushback, confirms record deletion, and ends gracefully.
6. **Strict Anti-Hallucination Guardrails:**
   - The agent **never invents unauthorized spot discounts** or custom structural modifications.
   - For unknown technical queries, the agent bridges to the Senior Sales Director / architectural team during the site visit.
7. **Site-Visit Scheduling & Failure Recovery:**
   - Proactively locks slots, collects visitor details, offers complimentary chauffeur pick-up, and handles fully-booked slot conflicts with alternative recommendations.
8. **Human Escalation:**
   - Seamlessly hands off NRI legal paperwork, complex financing, or escalation requests to Senior Sales Consultants.

---

## 💻 3. System Architecture & Tech Stack

```
northstar-homes-agent/
├── backend/                  # MANDATORY BACKEND: FastAPI (Python)
│   ├── main.py              # FastAPI application endpoints (/chat, /analytics, /book-site-visit, /test-suite)
│   ├── agent.py             # Agent core with Google GenAI SDK (Gemini 3.7 Flash)
│   ├── prompt.py            # Master system prompt (source of truth)
│   ├── models.py            # Pydantic data schemas & response validation
│   ├── test_scenarios.py    # 8 automated QA test scenarios
│   └── test_agent.py        # Standalone CLI test runner
├── src/                     # Interactive Web Application (React + TypeScript + Tailwind CSS)
│   ├── components/
│   │   ├── Header.tsx           # Navigation & Project Factsheet
│   │   ├── ChatInterface.tsx    # Text Chat with quick scenarios & TTS audio toggle
│   │   ├── VoiceCallInterface.tsx # Realistic Telephony Voice Simulator (STT & TTS)
│   │   ├── AnalyticsDashboard.tsx # CRM Dossier & JSON intelligence extractor
│   │   ├── TestRunnerLab.tsx    # Live QA Evaluator for test scenarios
│   │   ├── PromptInspector.tsx  # Master Prompt syntax viewer
│   │   └── SiteVisitModal.tsx   # Interactive booking & failure recovery engine
│   ├── constants/systemPrompt.ts # Synchronized TypeScript prompt constants
│   ├── types/index.ts          # Shared TypeScript interfaces
│   └── App.tsx                 # Main application view container
├── server.ts                # Express / Node runtime server bridge
├── requirements.txt         # Python dependencies for FastAPI backend
├── package.json             # Frontend dependencies & build scripts
├── .env.example             # Environment variable declarations
└── README.md                # Assignment documentation
```

### Backend:
- **Framework:** FastAPI (Python 3.10+) / Pydantic v2
- **LLM Engine:** Google GenAI SDK (`google-genai` / `@google/genai`) powered by `gemini-3.7-flash`
- **Endpoints:**
  - `POST /api/chat`: Dual voice/chat conversational turn generation
  - `POST /api/analytics`: Post-conversation CRM lead extraction into structured JSON
  - `POST /api/book-site-visit`: Slot validation, reservation confirmation & conflict recovery
  - `POST /api/run-test-scenario`: Single test scenario execution with assertion evaluation
  - `POST /api/run-all-tests`: Full automated test battery runner
  - `GET /api/prompt`: Returns master prompt and project factsheet

### Frontend:
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide Icons, Plus Jakarta Sans
- **Features:** Real-time Text Chat, Telephony Voice Simulator with Web Speech API audio, Live CRM Analytics Dossier, Automated Test Lab, and Site-Visit Booking.

---

## 🚀 4. How to Run the Bot

### Option A: Running the FastAPI Backend (Python)

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd northstar-homes-agent
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set your Gemini API Key in `.env`:**
   ```bash
   cp .env.example .env
   # Edit .env and set GEMINI_API_KEY="your_api_key_here"
   ```

5. **Start the FastAPI server:**
   ```bash
   uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   *FastAPI Swagger documentation will be live at `http://localhost:8000/docs`.*

6. **Run standalone CLI test scenarios:**
   ```bash
   python -m backend.test_agent
   ```

---

### Option B: Running the Interactive Web App (Vite + Node Server Bridge)

1. **Install npm dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server (binds to port 3000):**
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

---

## 🧪 5. Automated Test Cases & QA Battery

| # | Scenario Category | Customer Input | Expected Agent Behaviour | Key Prompt Assertion |
|---|---|---|---|---|
| 1 | **Hindi / Hinglish Discovery** | `"Hi, 2 BHK ka kya price hai? Rehne ke liye dekh rahe hain."` | Mirrors Hinglish naturally, quotes ₹1.35 Cr starting price, mentions 2027 possession, asks qualification question. | Mirrors Hindi/Hinglish, quotes correct price, concise turn. |
| 2 | **Price Objection** | `"1.35 Crore is way too expensive for Sector 79."` | Empathizes, anchors Aravalli green views & 30k sq.ft clubhouse, compares to ₹2.5 Cr+ Golf Course Extn, invites for visit. | Empathy + Value framing without fake discounts. |
| 3 | **Busy Customer** | `"I'm in an important client meeting right now, can't talk."` | Stops sales pitch immediately, politely proposes morning or 5 PM callback. | Zero pressure, clean callback capture. |
| 4 | **DND / Stop Request** | `"Please stop calling me and remove my number. Not interested."` | Immediately complies without argument, confirms opt-out, wishes pleasant day. | Immediate compliance with DND regulations. |
| 5 | **Unknown Specs / Discount** | `"Can you give 20% spot discount and break the master bedroom pillar?"` | Refuses to invent discounts or approve alterations, bridges to Senior Sales Director during site visit. | Strict anti-hallucination. |
| 6 | **Site Visit Booking** | `"I'd like to visit this Saturday 11 AM. My name is Vikram."` | Confirms Saturday 11 AM for Vikram, offers free chauffeur pick-up, confirms WhatsApp pin. | Seamless slot lock + cab service. |
| 7 | **Slot Conflict Recovery** | `"Can you book Saturday 11 AM?"` *(Slot is full)* | Informs 11 AM is full, offers Saturday 2:30 PM / Sunday 11 AM, confirms rescheduled slot. | Graceful error handling & rescheduling. |
| 8 | **Human Escalation** | `"I need to speak directly to your senior sales head regarding NRI wire transfers."` | Acknowledges with composure, confirms escalating to Senior Sales Head, confirms phone number. | Smooth human handoff. |

---

## 📊 6. Post-Conversation CRM Analytics Schema

After every session, the bot extracts structured JSON analytics for sales CRM ingestion:

```json
{
  "lead_name": "Vikram Malhotra",
  "contact_number": "+91 98765 43210",
  "configuration_preference": "2 BHK",
  "budget_fit": "Comfortable",
  "purchase_purpose": "Self-Use",
  "timeline": "3-6 months",
  "interest_level": "High",
  "site_visit_status": "Booked",
  "site_visit_date": "2026-08-23",
  "site_visit_time": "11:00 AM",
  "cab_requested": true,
  "objections_raised": ["Price consideration"],
  "objections_resolved": ["Quality and clubhouse amenities justified value"],
  "language_detected": "Hinglish",
  "follow_up_action": "Send WhatsApp confirmation pass and Google Maps location pin",
  "escalation_required": false,
  "escalation_reason": null,
  "conversation_summary": "Vikram inquired in Hinglish about 2 BHK for family use. Qualified budget and scheduled sample flat walkthrough for Saturday 11 AM with chauffeur pickup.",
  "voice_suitability_score": 98
}
```

---

## ⚖️ 7. Key Assumptions & Known Limitations

### Key Assumptions:
1. **RERA & Possession:** Project is officially RERA approved with targeted possession in 2027; pricing is standard base price excluding registration/taxes.
2. **Experience Centre:** Physical sample apartments are available on-site for customer walkthroughs 7 days a week.
3. **Code-Switching Context:** The agent assumes users speaking conversational Hindi or Hinglish understand Latinized Hinglish script in text mode and spoken Hindi in voice mode.

### Known Limitations:
1. **Dynamic Inventory Matrix:** Unit-level real-time inventory (e.g. specific flat 1402 on 14th floor) is delegated to site visits rather than locked dynamically by the conversational agent.
2. **Browser STT Support:** Voice recognition in the web simulator depends on browser Web Speech API support (Chrome/Edge/Safari).
3. **Telephony Carrier Integration:** The simulator uses browser Web Audio & Speech Synthesis; production telephony deployment would connect this prompt to Twilio / Exotel / LiveKit SIP trunks.

---

## 🤖 8. AI Tools & Models Used
- **Foundation LLM:** Google `gemini-3.7-flash` via `@google/genai` & `google-genai` Python SDK
- **Prompt Optimization:** Systematic prompt engineering with sectioned system instruction and few-shot formatting rules
- **Structured JSON Mode:** Enforced schema parsing for lead qualification analytics and automated QA evaluation
