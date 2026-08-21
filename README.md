# Northstar Homes — AI Sales & Lead Qualification Agent (Priya)

> **Huvo AI | Forward Deployed Engineer Assignment**
>
> Fictional Real-Estate Conversational Sales Agent for **Northstar Homes**
> *Project: Northstar One, Sector 79, Gurugram*

---

## 🏗️ 1. Project Overview & Scenario

Northstar Homes is launching **Northstar One**, an ultra-luxury residential community situated in the scenic foothills of the Aravalli Hills in **Sector 79, Gurugram**.

### 📌 Project Grounding & Truth

* **Project Name:** Northstar One
* **Location:** Sector 79, Gurugram (Signal-free access via NH-48 and SPR, ~15–20 minutes to Cyber Hub)
* **Configurations & Starting Prices:**

  * **2 BHK:** ₹1.35 Crore onwards (~1,250–1,350 sq. ft.)
  * **3 BHK:** ₹1.75 Crore onwards (~1,650–1,850 sq. ft.)
* **Amenities:** 30,000+ sq. ft. Grand Clubhouse, Infinity Pool, Squash Courts, Tennis Courts, Landscaped Zen Gardens, EV Charging Stations, and 3-tier Biometric Security
* **RERA Status & Possession:** RERA Registered, targeted possession in 2027
* **Experience Centre:** Open all 7 days (10:00 AM – 7:00 PM) with complimentary chauffeur cab pick-up and drop

---

## 🧠 2. AI Intelligence & Voice Engine Architecture

The conversational engine is built with a resilient multi-tiered hierarchy optimized for natural, low-latency dialogue.

### 1. Primary LLM Engine (OpenRouter)

Prioritizes top reasoning and conversational models:

* `meta-llama/llama-3.3-70b-instruct`
* `meta-llama/llama-3.3-70b-instruct:free`
* `qwen/qwen-2.5-72b-instruct`
* `qwen/qwen-2.5-72b-instruct:free`
* `deepseek/deepseek-chat`
* `mistralai/mistral-small-24b-instruct-2501:free`

Features:

* Human-like conversational flow
* Natural code-switching between English, Hindi, and Hinglish
* Context-aware sales qualification and objection handling

### 2. Fallback LLM Engine (Google Gemini)

Automatic failover when OpenRouter is unavailable or rate-limited.

Supported models:

* `gemini-3.7-flash`
* `gemini-flash-latest`
* `gemini-3.1-flash-lite`

### 3. Neural Text-to-Speech (TTS)

High-fidelity speech synthesis using:

* `en-IN-NeerjaNeural`
* `hi-IN-SwaraNeural`

Features:

* Natural Indian English and Hindi voices
* Audio playback for every assistant response
* Improved accessibility and voice-first experience

### 4. Structured CRM Intelligence Extraction

Automatically extracts:

* Lead profile
* Budget alignment
* Purchase intent
* Timeline
* Site visit status
* Objections and resolutions
* Follow-up recommendations

---

## 🖥️ 3. Application Views & Navigation

The application includes four major views.

### 1. Project Details

Default landing page containing:

* Project overview
* Pricing information
* Unit configurations
* Amenities
* Connectivity highlights

### 2. Priya AI Chat

Features:

* Natural conversational interface
* Quick prompt suggestions
* Real-time responses
* Voice playback support

### 3. CRM Dossier

Displays:

* Lead score
* Qualification status
* Customer preferences
* Follow-up recommendations
* Structured CRM intelligence

### 4. Book Sample Flat Tour

Includes:

* Date and time selection
* Customer information collection
* Complimentary cab booking

---

## 📂 4. Project File Structure

```text
northstar-homes-agent/

├── server.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── metadata.json
├── .env.example
├── README.md
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types.ts
│   │
│   ├── components/
│   │   ├── ProjectOverview.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   └── SiteVisitModal.tsx
│   │
│   ├── constants/
│   │   └── systemPrompt.ts
│   │
│   └── utils/
│
├── backend/
│   ├── main.py
│   ├── agent.py
│   ├── prompt.py
│   └── models.py
│
└── requirements.txt
```

---

## 🚀 5. How to Run the Interactive Application Locally

The application runs as a unified full-stack service using Express and Vite on port `3000`.

### Prerequisites

* Node.js v18+
* npm, pnpm, or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Configure:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
```

> The application works with either OpenRouter or Gemini configured. When both are available, OpenRouter is used as the primary engine and Gemini acts as the fallback.

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Open the Application

```text
http://localhost:3000
```

Available sections:

* Project Details
* Priya AI Chat
* CRM Dossier
* Book Sample Flat Tour

---

## 📦 6. Production Build & Deployment

Build and run production:

```bash
npm run build
npm start
```

The production server runs at:

```text
http://localhost:3000
```

---

## 🐍 7. Running the Optional Python FastAPI Backend

### Create Virtual Environment

```bash
python -m venv venv
```

Activate:

**Linux / macOS**

```bash
source venv/bin/activate
```

**Windows**

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start FastAPI

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

### API Documentation

```text
http://localhost:8000/docs
```

---

## 🔌 8. Backend API Endpoints

| Method | Endpoint               | Description                                                             |
| ------ | ---------------------- | ----------------------------------------------------------------------- |
| POST   | `/api/chat`            | Generates conversational dialogue with Priya using OpenRouter or Gemini |
| POST   | `/api/analytics`       | Parses transcript into structured CRM intelligence                      |
| POST   | `/api/tts`             | Converts assistant responses into speech                                |
| POST   | `/api/book-site-visit` | Books a sample flat walkthrough                                         |
| GET    | `/api/project-info`    | Returns project information                                             |
| GET    | `/api/health`          | Health check and AI provider status                                     |

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
  "objections_raised": [
    "Pricing comparison with other Sector 79 projects"
  ],
  "objections_resolved": [
    "Clubhouse amenities and Aravalli greens justified value"
  ],
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

Watch the complete walkthrough demonstrating:

* Lead qualification workflow
* Objection handling
* Voice synthesis
* CRM intelligence extraction

**Loom Video Walkthrough**

https://www.loom.com/share/925821fdeb6349ba9ac355d918868da2

---

## ⚖️ 11. Key Assumptions

### 1. RERA & Project Truth

Northstar One is assumed to be an officially RERA-approved luxury residential development in Sector 79, Gurugram with targeted possession in 2027.

Pricing assumptions:

* ₹1.35 Crore onwards for 2 BHK
* ₹1.75 Crore onwards for 3 BHK

Prices exclude taxes, registration, and government charges.

### 2. Experience Centre Availability

Physical sample apartments and sales representatives are available every day between 10:00 AM and 7:00 PM.

### 3. Multilingual Conversations

Users communicating in Hindi or Hinglish can comfortably understand:

* Hinglish text responses
* Hindi voice playback
* English-Hindi mixed conversations

### 4. Autonomous Lead Qualification

Priya is designed to:

* Qualify prospects
* Capture budget information
* Understand timelines
* Schedule site visits

Complex legal, commercial, or customization requests are escalated to human sales teams.

---

---

## 🤖 13. AI Tools & Models Used

### Primary Conversational Models (OpenRouter)

* `meta-llama/llama-3.3-70b-instruct`
* `meta-llama/llama-3.3-70b-instruct:free`


### Fallback Conversational Models (Google Gemini)

* `gemini-3.7-flash`
* `gemini-flash-latest`
* `gemini-3.1-flash-lite`

### Speech Synthesis Engine

Microsoft Neural Speech:

* `en-IN-NeerjaNeural`
* `hi-IN-SwaraNeural`

### Structured Output Processing

* JSON schema enforcement
* CRM lead extraction
* Qualification scoring
* Follow-up recommendations

---


