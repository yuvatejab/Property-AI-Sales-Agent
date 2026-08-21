# Northstar Homes — AI Sales & Lead Qualification Agent (Priya)

> **Huvo AI | Forward Deployed Engineer Assignment**  
> Fictional Real-Estate Conversational Sales Agent for **Northstar Homes** (*Project: Northstar One, Sector 79, Gurugram*).

---

## 🏗️ 1. Project Overview & Scenario

Northstar Homes is launching **Northstar One**, an ultra-luxury residential community situated in the scenic foothills of the Aravalli hills in **Sector 79, Gurugram**.

### 📌 Project Grounding & Truth
- **Project Name:** Northstar One
- **Location:** Sector 79, Gurugram (Signal-free access via NH-48 and SPR, ~15–20 mins to Cyber Hub)
- **Configurations & Starting Prices:**
  - **2 BHK:** ₹1.35 Crore onwards (~1,250 – 1,350 sq. ft.)
  - **3 BHK:** ₹1.75 Crore onwards (~1,650 – 1,850 sq. ft.)
- **Amenities:** 30,000+ sq. ft. Grand Clubhouse, Infinity Pool, Squash/Tennis Courts, Landscaped Zen Gardens, EV Charging Stations, 3-tier Biometric Security.
- **RERA Status & Possession:** RERA Registered, targeted possession in 2027.
- **Experience Centre:** Open all 7 days (10:00 AM – 7:00 PM) with complimentary chauffeur cab pick-up & drop.

---

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
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
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
   ```

---

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
