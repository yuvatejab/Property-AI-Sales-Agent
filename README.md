<<<<<<< HEAD
=======
# Northstar Homes — AI Sales & Lead Qualification Agent (Priya)

> **Huvo AI | Forward Deployed Engineer Assignment**  
> Fictional Real-Estate Conversational Sales Agent for **Northstar Homes** (*Project: Northstar One, Sector 79, Gurugram*).
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03

---

## 🏗️ 1. Project Overview & Scenario

<<<<<<< HEAD
Northstar Homes is launching **Northstar One**, an ultra-luxury residential community situated in the scenic foothills of the Aravalli hills in **Sector 79, Gurugram**.

### 📌 Project Grounding & Truth
- **Project Name:** Northstar One
- **Location:** Sector 79, Gurugram (Signal-free access via NH-48 and SPR, ~15–20 mins to Cyber Hub)
- **Configurations & Starting Prices:**
  - **2 BHK:** ₹1.35 Crore onwards (~1,250 – 1,350 sq. ft.)
  - **3 BHK:** ₹1.75 Crore onwards (~1,650 – 1,850 sq. ft.)
- **Amenities:** 30,000+ sq. ft. Grand Clubhouse, Infinity Pool, Squash/Tennis Courts, Landscaped Zen Gardens, EV Charging Stations, 3-tier Biometric Security.
=======
Northstar Homes is launching **Northstar One**, an ultra-luxury residential community in **Sector 79, Gurugram** (foothills of the Aravalli hills).

### 📌 Project Truth & Grounding
- **Project Name:** Northstar One
- **Location:** Sector 79, Gurugram (Direct access via NH-48 & SPR, ~15-20 min from Cyber Hub)
- **Configurations & Starting Prices:**
  - **2 BHK:** ₹1.35 Crore onwards (approx. 1,250 – 1,350 sq. ft.)
  - **3 BHK:** ₹1.75 Crore onwards (approx. 1,650 – 1,850 sq. ft.)
- **Amenities:** 30,000+ sq. ft. Grand Clubhouse, Infinity Pool, Sports Courts, Landscaped Zen Gardens, EV Charging, 3-tier Security.
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
- **RERA Status & Possession:** RERA Registered, targeted possession in 2027.
- **Experience Centre:** Open all 7 days (10:00 AM – 7:00 PM) with complimentary chauffeur cab pick-up & drop.

---

<<<<<<< HEAD
## 🧠 2. AI Intelligence & Voice Engine Architecture

The conversational engine is built with a resilient, multi-tiered hierarchy optimized for natural, low-latency dialogue:

1. **Primary LLM Engine (OpenRouter)**:
   - Prioritizes top reasoning and conversational models:
     - `meta-llama/llama-3.3-70b-instruct` / `meta-llama/llama-3.3-70b-instruct:free`
     - `qwen/qwen-2.5-72b-instruct` / `qwen/qwen-2.5-72b-instruct:free`
     - `deepseek/deepseek-chat`
     - `mistralai/mistral-small-24b-instruct-2501:free`
   - Delivers human-like code-switching across English, Hindi, and colloquial Hinglish.
2. **Fallback LLM Engine (Google Gemini)**:
   - Seamless failover to `gemini-3.7-flash`, `gemini-flash-latest`, and `gemini-3.1-flash-lite` via `@google/genai` if OpenRouter is unconfigured or rate-limited.
3. **Neural Text-To-Speech (TTS)**:
   - High-fidelity natural speech using Indian English (`en-IN-NeerjaNeural`) and Hindi (`hi-IN-SwaraNeural`) neural voices with inline **Listen** audio controls in every message bubble.
4. **Structured CRM Lead Intelligence Extraction**:
   - Automated post-conversation JSON parser extracting lead preferences, budget alignment, purchase timeline, objection resolutions, and site-visit status.

---

## 🖥️ 3. Application Views & Navigation

The interactive application features a top navigation bar:

1. **Project Details (Default Landing Screen)**:
   - Comprehensive overview of Northstar One, unit floor plans (2 BHK & 3 BHK), amenities grid, micro-market connectivity, and direct booking triggers.
2. **Priya AI Chat**:
   - Natural conversational interface with Priya.
   - Zero visual clutter, interactive quick-prompt chips, and instant neural voice audio readout.
3. **CRM Dossier**:
   - Real-time sales intelligence view displaying structured qualification data, lead score, qualification status, and follow-up recommendations.
4. **Book Sample Flat Tour**:
   - Interactive scheduling modal with date/time pickers, customer details, and complimentary chauffeur cab booking.

---

## 📂 4. Project File Structure

```
northstar-homes-agent/
├── server.ts                  # Unified Express backend & Vite middleware bridge
├── package.json               # Node.js dependencies and run scripts
├── tsconfig.json              # TypeScript compilation configuration
├── vite.config.ts             # Vite bundler configuration
├── metadata.json              # Platform metadata & permissions
├── .env.example               # Environment variables template
├── README.md                  # Complete documentation and setup guide
│
├── src/                       # Frontend React Application
│   ├── main.tsx               # React application entry point
│   ├── App.tsx                # Main view container & top navigation bar
│   ├── index.css              # Global styles and Tailwind CSS imports
│   ├── types.ts               # Shared TypeScript data types & interfaces
│   │
│   ├── components/            # UI Components
│   │   ├── ProjectOverview.tsx   # Initial landing page with project specs & pricing
│   │   ├── ChatInterface.tsx     # Priya AI chat with neural voice player
│   │   ├── AnalyticsDashboard.tsx# Structured CRM lead intelligence dossier
│   │   └── SiteVisitModal.tsx    # Interactive site-visit booking modal
│   │
│   ├── constants/             # Application constants
│   │   └── systemPrompt.ts    # Grounded sales prompt & qualification rules
│   │
│   └── utils/                 # Frontend helper utilities
│
├── backend/                   # Python FastAPI Backend (Optional standalone service)
│   ├── main.py                # FastAPI endpoints (/api/chat, /api/analytics, etc.)
│   ├── agent.py               # Python Gemini / LLM agent implementation
│   ├── prompt.py              # Python system prompt definition
│   └── models.py              # Pydantic data validation models
│
└── requirements.txt           # Python backend dependencies
```

---

## 🚀 5. How to Run the Interactive Application Locally

The application runs as a **unified full-stack service** in a single process (Express backend + Vite frontend together on port `3000`).

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** (or `pnpm` / `yarn`)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file at the root of the project:
```bash
cp .env.example .env
```

Open `.env` and configure your API keys:
```env
# OpenRouter API Key (Recommended - powers primary LLMs like Llama 3.3 70B & Qwen 2.5)
OPENROUTER_API_KEY="your_openrouter_api_key_here"

# Google Gemini API Key (Fallback AI engine)
GEMINI_API_KEY="your_gemini_api_key_here"

# Application URL (Optional, defaults to local host)
APP_URL="http://localhost:3000"
```

> **Note:** The app works with **either** `OPENROUTER_API_KEY` or `GEMINI_API_KEY` configured. If both are provided, OpenRouter is used as the primary engine with Gemini as the automatic fallback.

### Step 3: Start the Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to:
```
http://localhost:3000
```
- You will land directly on the **Project Details** overview.
- Switch to **Priya AI Chat** to interact via text and audio speech.
- Switch to **CRM Dossier** to inspect automatically extracted lead intelligence.
- Click **Book Sample Flat Tour** to schedule a visit.

---

## 📦 6. Production Build & Deployment

To compile and launch the production-ready standalone build:

```bash
# 1. Build frontend Vite assets and bundle server.ts into dist/server.cjs
npm run build

# 2. Start the production server
npm start
```
The production server will listen on `http://localhost:3000`.

---

## 🐍 7. Running the Optional Python FastAPI Backend

If you prefer to run the Python FastAPI backend service:

1. Create and activate a Python virtual environment:
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
<<<<<<< HEAD
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch the FastAPI server:
   ```bash
   uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```
4. Access the interactive API docs at:
   ```
   http://localhost:8000/docs
=======

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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03
   ```

---

<<<<<<< HEAD
## 🔌 8. Backend API Endpoints (Express & FastAPI)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Generates conversational dialogue with Priya using OpenRouter / Gemini |
| `POST` | `/api/analytics` | Parses transcript into structured JSON CRM lead intelligence |
| `POST` | `/api/tts` | Converts assistant response text to neural speech audio buffer |
| `POST` | `/api/book-site-visit` | Validates and reserves sample flat walkthrough slots |
| `GET` | `/api/project-info` | Returns Northstar One specs, pricing, and amenities |
| `GET` | `/api/health` | Service health check and configured LLM status |

---

## 📊 9. Post-Conversation CRM Schema
=======
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
>>>>>>> f751cc538a70b5126df38632e0784e5d49935b03

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
<<<<<<< HEAD
  "site_visit_date": "Upcoming Weekend",
  "site_visit_time": "11:00 AM",
  "cab_requested": true,
  "objections_raised": ["Pricing comparison with other Sector 79 projects"],
  "objections_resolved": ["Clubhouse amenities and Aravalli greens justified value"],
  "language_detected": "Hinglish",
  "follow_up_action": "Send WhatsApp brochure & Experience Centre location pin",
  "escalation_required": false,
  "escalation_reason": null,
  "conversation_summary": "Prospect engaged in Hinglish seeking 2 BHK for family use. Qualified budget and scheduled tour for Saturday 11 AM with chauffeur pickup.",
  "voice_suitability_score": 98
}
```
=======
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


---

## 🎥 10. Walkthrough Video Demo

Watch the full interactive walkthrough demo covering bot workflow, objection handling, neural voice synthesis, and CRM intelligence extraction:

🔗 **Loom Video Walkthrough:** [https://www.loom.com/share/925821fdeb6349ba9ac355d918868da2](https://www.loom.com/share/925821fdeb6349ba9ac355d918868da2)

---

## ⚖️ 11. Key Assumptions

1. **RERA & Project Truth:** Northstar One is an officially RERA-approved luxury residential development in Sector 79, Gurugram with targeted possession in 2027. Stated prices (₹1.35 Cr for 2 BHK, ₹1.75 Cr for 3 BHK) are base selling prices excluding statutory taxes and registration fees.
2. **Experience Centre Walkthroughs:** Physical sample apartments (2 BHK and 3 BHK) and sales advisors are available at the site Experience Centre all 7 days (10:00 AM – 7:00 PM).
3. **Multilingual Code-Switching:** Users conversing in Hindi or Hinglish understand Latinized Hinglish script in text mode and spoken Hindi in voice playback.
4. **Autonomous Lead Qualification:** Priya operates under strict conversational guardrails — qualifying intent, budget, timeline, and booking sample flat visits, while routing custom legal paperwork, structural modifications, or commercial negotiations to human sales directors.

---

## ⚠️ 12. Known Limitations

1. **Unit-Level Live Inventory Locking:** The bot provides starting prices and floor configurations (2 BHK / 3 BHK), but real-time unit-level availability (e.g., Tower B, Unit 1402) is verified and allocated dynamically by the onsite sales team during the site visit.
2. **Web Browser Speech Synthesis:** Voice playback and speech recognition in the web client rely on standard Web Audio and neural TTS synthesis APIs across modern browsers (Google Chrome, Microsoft Edge, Apple Safari).
3. **Telephony Carrier Gateways:** The current application simulates real-time conversational voice within the web interface; deploying as a direct inbound/outbound telephony phone agent requires binding this prompt and API to a SIP/PSTN trunk provider (e.g., Twilio Voice, Exotel, or LiveKit SIP).

---

## 🤖 13. AI Tools & Models Used

- **Primary Conversational Models (OpenRouter API):**
  - `meta-llama/llama-3.3-70b-instruct` / `meta-llama/llama-3.3-70b-instruct:free` (Complex dialogue reasoning & objection resolution)
  - `qwen/qwen-2.5-72b-instruct` / `qwen/qwen-2.5-72b-instruct:free` (Multilingual Hindi/Hinglish understanding)
  - `deepseek/deepseek-chat` / `mistralai/mistral-small-24b-instruct-2501` (Natural human cadence)
- **Fallback Conversational Models (Google Gemini API):**
  - `gemini-3.7-flash`, `gemini-flash-latest`, `gemini-3.1-flash-lite` via `@google/genai` and Python `google-genai` SDK
- **Speech Synthesis Engine:**
  - Microsoft Neural Speech Synthesis (`en-IN-NeerjaNeural` / `hi-IN-SwaraNeural`) for realistic Indian English and Hindi accent pronunciation
- **JSON Schema Enforcement:**
  - Automated structured output mode for real-time CRM intelligence extraction and lead scoring


