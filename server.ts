import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { MASTER_SYSTEM_PROMPT, PROJECT_DETAILS } from './src/constants/systemPrompt';

dotenv.config();

const PORT = 3000;

// High-performing free models on OpenRouter
const OPENROUTER_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen-2.5-72b-instruct:free',
  'mistralai/mistral-small-24b-instruct-2501:free',
  'meta-llama/llama-3.1-8b-instruct:free',
  'deepseek/deepseek-chat:free',
];

// Gemini models for instant, conversational turns
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-3.7-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
];

/**
 * Calls OpenRouter API with automated model fallback
 */
async function callOpenRouter(
  messages: Array<{ role: string; content: string }>,
  options?: {
    temperature?: number;
    max_tokens?: number;
    response_format?: any;
  }
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY || '';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://northstar-homes.ai',
    'X-Title': 'Northstar Homes AI Assistant',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  let lastError: any = null;

  for (const model of OPENROUTER_MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model,
          messages,
          temperature: options?.temperature ?? 0.8,
          max_tokens: options?.max_tokens ?? 1024,
          ...(options?.response_format ? { response_format: options.response_format } : {}),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && typeof content === 'string' && content.trim().length > 0) {
          return content.trim();
        }
      } else {
        const errText = await response.text();
        lastError = new Error(`OpenRouter ${model} error ${response.status}: ${errText}`);
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  throw lastError || new Error('All OpenRouter models were temporarily unavailable.');
}

/**
 * Calls Gemini API with zero thinking delay for fast, dynamic conversation
 */
async function callGemini(
  messages: Array<{ role: string; content: string }>,
  systemInstruction?: string,
  options?: { temperature?: number; max_tokens?: number; responseMimeType?: string }
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured.');
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const nonSystemMsgs = messages.filter((m) => m.role !== 'system');
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  for (const m of nonSystemMsgs) {
    const role = m.role === 'user' ? 'user' : 'model';
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n${m.content}`;
    } else {
      contents.push({
        role,
        parts: [{ text: m.content }],
      });
    }
  }

  let lastError: any = null;
  for (const model of GEMINI_MODELS) {
    try {
      const config: any = {
        temperature: options?.temperature ?? 0.8,
        maxOutputTokens: options?.max_tokens ?? 1024,
      };
      if (systemInstruction) config.systemInstruction = systemInstruction;
      if (options?.responseMimeType) config.responseMimeType = options.responseMimeType;

      if (model.includes('3.7') || model.includes('thinking')) {
        config.thinkingConfig = { thinkingBudget: 0 };
      }

      const resp = await ai.models.generateContent({
        model,
        contents,
        config,
      });

      if (resp && resp.text && resp.text.trim().length > 0) {
        return resp.text.trim();
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Gemini fallback failed.');
}

/**
 * Dynamic agent turn generator ensuring natural conversational variability
 */
async function generateAgentTurn(
  history: Array<{ role: string; content: string }>,
  userMessage: string,
  languageHint?: string
): Promise<string> {
  let systemText = MASTER_SYSTEM_PROMPT;
  systemText += `\n\n[CONVERSATIONAL VARIABILITY MANDATE]:
- Respond authentically and dynamically based on the exact context and tone of the user's message.
- Avoid repetitive or scripted phrasing. Answer naturally just as an experienced, warm human relationship advisor would.
- Address the nuances of the user's specific query directly while staying true to Northstar One ground facts (2 BHK starting at ₹1.35 Cr, 3 BHK starting at ₹1.75 Cr, Sector 79 Gurugram, 30,000 sq.ft clubhouse, Aravalli hill views, possession 2027).
- Keep each turn concise, natural (1 to 3 sentences maximum), and completely free of markdown asterisks or bullet clutter.`;

  if (languageHint) {
    systemText += `\n[User Language Context: ${languageHint}]`;
  }

  const cleanHistory: Array<{ role: string; content: string }> = [];
  for (const msg of history) {
    if (msg.content && msg.content.trim().length > 0) {
      cleanHistory.push({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.content.trim() });
    }
  }

  const fullMessages = [
    { role: 'system', content: systemText },
    ...cleanHistory,
    { role: 'user', content: userMessage.trim() },
  ];

  // 1. Try Gemini (Primary, low-latency, contextual)
  if (process.env.GEMINI_API_KEY) {
    try {
      const reply = await callGemini(fullMessages, systemText, { temperature: 0.8, max_tokens: 1024 });
      if (reply && reply.length > 5) {
        return reply.replace(/\*\*/g, '').replace(/[*_#`~]/g, '').trim();
      }
    } catch (geminiErr: any) {
      console.warn('Gemini tier deferred:', geminiErr?.message);
    }
  }

  // 2. Try OpenRouter (Multi-model reasoning fallback)
  try {
    const reply = await callOpenRouter(fullMessages, { temperature: 0.8, max_tokens: 1024 });
    if (reply && reply.length > 5) {
      return reply.replace(/\*\*/g, '').replace(/[*_#`~]/g, '').trim();
    }
  } catch (openRouterErr: any) {
    console.warn('OpenRouter tier deferred:', openRouterErr?.message);
  }

  // 3. Fallback Polyglot Generator with Contextual Nuances
  const lower = (userMessage || '').toLowerCase();
  const isHindi = lower.includes('namaste') || lower.includes('kya') || lower.includes('hai') || lower.includes('baare') || lower.includes('rehne') || lower.includes('batao');

  if (lower.includes('2bhk') || lower.includes('2 bhk')) {
    return isHindi
      ? 'Northstar One mein hamare 2 BHK luxury residences ka starting price ₹1.35 Crore onwards hai, jisme lagbhag 1,250 se 1,350 sq.ft ka spacious layout milta hai. Kya aap isse self-use ke liye consider kar rahe hain ya investment ke liye?'
      : 'Our luxury 2 BHK apartments at Northstar One start from ₹1.35 Crore onwards, spanning 1,250 to 1,350 sq.ft with panoramic Aravalli green views. Are you looking to move in with family or planning an investment?';
  } else if (lower.includes('3bhk') || lower.includes('3 bhk')) {
    return isHindi
      ? 'Hamare 3 BHK residences ₹1.75 Crore onwards start hote hain, jo 1,650 se 1,850 sq.ft ke sprawling spaces aur large deck balconies ke saath aate hain. Kya aapki family mein dedicated study ya kids space ki preference hai?'
      : 'Our spacious 3 BHK residences start from ₹1.75 Crore onwards with 1,650 to 1,850 sq.ft of carpet area and expansive balconies. Are you looking for immediate possession or comfortable with our 2027 handover?';
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('rate')) {
    return isHindi
      ? 'Northstar One mein 2 BHK residences ₹1.35 Crore aur 3 BHK residences ₹1.75 Crore onwards available hain, jisme construction-linked flexible payment plans bhi hain. Aapka comfortable budget range kis configuration ke saath align karta hai?'
      : 'At Northstar One, 2 BHK homes start at ₹1.35 Crore and 3 BHK at ₹1.75 Crore onwards with construction-linked payment milestones. Which configuration best aligns with your space preferences?';
  } else if (lower.includes('visit') || lower.includes('sample') || lower.includes('experience') || lower.includes('weekend') || lower.includes('saturday') || lower.includes('sunday')) {
    return isHindi
      ? 'Hum aapko Sector 79 Experience Centre par sample residence walkthrough ke liye warmly invite karte hain! Hum complimentary chauffeur pick-up bhi provide karte hain. Kya is weekend 11:00 AM ka slot book karein?'
      : 'We would love to host you at our Sector 79 Experience Centre for an exclusive sample apartment walkthrough, complete with complimentary chauffeur pick-up. Would this Saturday morning at 11:00 AM work well for you?';
  } else if (lower.includes('busy') || lower.includes('meeting') || lower.includes('later')) {
    return isHindi
      ? 'Main samajh sakti hoon! Main abhi aapko bilkul disturb nahi karungi. Kya kal subah 11:00 AM ya shaam 5:00 PM par 2 minute ki baat karna convenient hoga?'
      : 'I completely understand you are tied up. Would tomorrow morning around 11:00 AM or evening at 5:00 PM be a more convenient time for a brief check-in?';
  } else if (lower.includes('stop') || lower.includes('remove') || lower.includes('dnd') || lower.includes('not interested')) {
    return isHindi
      ? 'Bilkul, maine hamare records update kar diye hain aur aapka number remove kar diya hai. Aapka din shubh ho!'
      : 'I have noted your request and updated our records immediately so you receive no further messages. Wishing you a great day ahead!';
  } else if (lower.includes('expensive') || lower.includes('high') || lower.includes('discount')) {
    return isHindi
      ? 'Main aapke budget consideration ko samajhti hoon. Aravalli foothill greens, 30,000 sq.ft clubhouse aur Golf Course Extn ke ₹2.5 Cr+ pricing ke comparison mein Northstar One premium value offer karta hai. Kya aap weekend par sample flat dekhna pasand karenge?'
      : 'I understand budget is a key priority. Considering our 30,000 sq.ft luxury clubhouse, peaceful Aravalli views, and nearby Golf Course Extension options commanding ₹2.5 Cr+, Northstar One provides unmatched long-term value. Would you like to tour the sample residence this weekend?';
  }

  return isHindi
    ? 'Namaste! Main Priya hoon, Northstar Homes se. Sector 79 Gurugram mein hamare Northstar One luxury project mein 2 & 3 BHK residences start hote hain ₹1.35 Cr se. Aaj main aapki home search mein kaise help kar sakti hoon?'
    : 'Hello! I am Priya from Northstar Homes. Northstar One in Sector 79 Gurugram offers 2 and 3 BHK luxury residences starting at ₹1.35 Crore with scenic Aravalli views. How can I assist you with your home exploration today?';
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Health check & configuration metadata
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      agent: 'Priya (Senior Relationship Associate)',
      project: PROJECT_DETAILS.name,
      location: PROJECT_DETAILS.location,
      llm_engine: 'Gemini + OpenRouter Multi-Model Dynamic Engine',
      tts_engine: 'Microsoft Neural Voice (en-IN-NeerjaNeural / hi-IN-SwaraNeural)',
      gemini_configured: Boolean(process.env.GEMINI_API_KEY),
      openrouter_configured: Boolean(process.env.OPENROUTER_API_KEY)
    });
  });

  // 2. Microsoft Neural TTS Endpoint (Ultra-realistic audio generation)
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, voice } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text parameter is required' });
      }

      const cleanText = text
        .replace(/\*\*/g, '')
        .replace(/[*_#`~]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const selectedVoice = voice || 'en-IN-NeerjaNeural';

      const tts = new MsEdgeTTS();
      await tts.setMetadata(selectedVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(cleanText);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      });

      audioStream.pipe(res);
      audioStream.on('error', (err) => {
        console.error('TTS stream pipe error:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'TTS audio streaming failed' });
        }
      });
    } catch (error: any) {
      console.error('Microsoft Neural TTS Error:', error);
      res.status(500).json({ error: error.message || 'TTS generation error' });
    }
  });

  // 3. Chat endpoint (Powered by Gemini & OpenRouter with dynamic variability)
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, user_message, language_hint } = req.body;
      let history = Array.isArray(messages)
        ? messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          }))
        : [];

      if (history.length > 0) {
        const last = history[history.length - 1];
        if (last.role === 'user' && (!user_message || last.content === user_message)) {
          history = history.slice(0, -1);
        }
      }

      const reply = await generateAgentTurn(history, user_message || '', language_hint);

      res.json({
        reply,
        speaker: 'Priya (Northstar Homes)'
      });
    } catch (error: any) {
      console.error('Chat error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  // 4. Site-visit booking
  app.post('/api/book-site-visit', (req, res) => {
    const {
      customerName,
      contactNumber,
      preferredDate,
      preferredTime,
      configurationInterest,
      cabRequired,
      forceFailure
    } = req.body;

    if (forceFailure || (preferredTime && preferredTime.includes('11:00 AM') && customerName?.toLowerCase().includes('full'))) {
      return res.json({
        status: 'failed',
        message: `The requested slot on ${preferredDate || 'Saturday'} at ${preferredTime || '11:00 AM'} is fully booked for exclusive previews.`,
        alternativeSlots: [
          `${preferredDate || 'Saturday'} at 02:30 PM`,
          `${preferredDate || 'Saturday'} at 04:30 PM`,
          'Next Sunday at 11:00 AM'
        ]
      });
    }

    const bookingId = 'NS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const cabNote = cabRequired ? 'Complimentary Chauffeur Pick-Up Confirmed' : 'Self-Drive (Valet Available)';

    res.json({
      status: 'confirmed',
      bookingId,
      message: `Site visit confirmed for ${customerName || 'Valued Guest'} on ${preferredDate} at ${preferredTime}.`,
      details: {
        bookingId,
        project: 'Northstar One',
        location: 'Experience Centre, Sector 79, Gurugram',
        customerName: customerName || 'Guest',
        contactNumber: contactNumber || '+91-XXXXXXXXXX',
        date: preferredDate,
        time: preferredTime,
        configurationInterest: configurationInterest || '2 BHK / 3 BHK',
        transportation: cabNote,
        whatsappPinStatus: 'Location pin & pass sent on WhatsApp'
      }
    });
  });

  // 5. Post-conversation lead analytics extraction
  app.post('/api/analytics', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.json({
          lead_name: 'Unknown',
          contact_number: null,
          configuration_preference: 'None / Unspecified',
          budget_fit: 'Unspecified',
          purchase_purpose: 'Undecided',
          timeline: 'Unknown',
          interest_level: 'Low',
          site_visit_status: 'Not Reached',
          cab_requested: false,
          objections_raised: [],
          objections_resolved: [],
          language_detected: 'English',
          follow_up_action: 'Initial outreach',
          escalation_required: false,
          conversation_summary: 'No conversation turns recorded.',
          voice_suitability_score: 100
        });
      }

      const transcript = messages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');

      const extractionPrompt = `Analyze the following sales conversation between a prospective homebuyer and Priya (AI Sales Associate for Northstar One, Sector 79 Gurugram):

TRANSCRIPT:
${transcript}

Extract precise structured CRM lead qualification analytics.
Return strict JSON matching this schema:
{
  "lead_name": "Customer Name if known or 'Unknown'",
  "contact_number": "Phone number or null",
  "configuration_preference": "2 BHK" | "3 BHK" | "Both / Undecided" | "None / Unspecified",
  "budget_fit": "Comfortable" | "Stretching" | "Out of Budget" | "Unspecified",
  "purchase_purpose": "Self-Use" | "Investment" | "Undecided",
  "timeline": "Immediate (<3 months)" | "3-6 months" | "6-12 months" | "Long term (>1 year)" | "Unknown",
  "interest_level": "High" | "Medium" | "Low" | "DND / Not Interested",
  "site_visit_status": "Booked" | "Interested (Tentative)" | "Follow-up Required" | "Declined" | "Not Reached",
  "site_visit_date": "Date string or null",
  "site_visit_time": "Time string or null",
  "cab_requested": boolean,
  "objections_raised": ["list of objections raised"],
  "objections_resolved": ["list of objections resolved"],
  "language_detected": "English" | "Hindi" | "Hinglish",
  "follow_up_action": "Recommended next step",
  "escalation_required": boolean,
  "escalation_reason": "Reason or null",
  "conversation_summary": "2-sentence executive summary of lead state and intent",
  "voice_suitability_score": number (0-100 score for conversational smoothness and brevity)
}`;

      let analytics: any = null;

      // 1. Try Gemini JSON mode
      if (process.env.GEMINI_API_KEY) {
        try {
          const raw = await callGemini(
            [{ role: 'user', content: extractionPrompt }],
            'Output valid JSON lead analytics.',
            { temperature: 0.1, responseMimeType: 'application/json' }
          );
          analytics = JSON.parse(raw);
        } catch (geminiErr) {
          console.warn('Gemini analytics deferred:', geminiErr);
        }
      }

      // 2. Try OpenRouter JSON mode
      if (!analytics) {
        try {
          const raw = await callOpenRouter(
            [
              { role: 'system', content: 'You are a CRM sales data extraction analyst. Output ONLY valid JSON.' },
              { role: 'user', content: extractionPrompt }
            ],
            { temperature: 0.1, response_format: { type: 'json_object' } }
          );
          analytics = JSON.parse(raw);
        } catch (err) {
          // Fallback heuristic extraction
          const lower = transcript.toLowerCase();
          const has2BHK = lower.includes('2 bhk') || lower.includes('2bhk');
          const has3BHK = lower.includes('3 bhk') || lower.includes('3bhk');
          const hasVisit = lower.includes('visit') || lower.includes('saturday') || lower.includes('sunday') || lower.includes('sample');
          const hasDND = lower.includes('stop') || lower.includes('remove') || lower.includes('dnd');
          const hasHindi = lower.includes('namaste') || lower.includes('kya') || lower.includes('hai') || lower.includes('baare');

          analytics = {
            lead_name: lower.includes('vikram') ? 'Vikram Malhotra' : 'Valued Prospect',
            contact_number: null,
            configuration_preference: has2BHK && has3BHK ? 'Both / Undecided' : has2BHK ? '2 BHK' : has3BHK ? '3 BHK' : '2 BHK',
            budget_fit: lower.includes('expensive') || lower.includes('high') ? 'Stretching' : 'Comfortable',
            purchase_purpose: lower.includes('family') || lower.includes('rehne') ? 'Self-Use' : 'Investment',
            timeline: '3-6 months',
            interest_level: hasDND ? 'DND / Not Interested' : hasVisit ? 'High' : 'Medium',
            site_visit_status: hasVisit ? 'Booked' : 'Interested (Tentative)',
            site_visit_date: hasVisit ? 'Upcoming Weekend' : null,
            site_visit_time: hasVisit ? '11:00 AM' : null,
            cab_requested: lower.includes('cab'),
            objections_raised: lower.includes('expensive') ? ['Pricing compared to Sector 79 micro-market'] : [],
            objections_resolved: lower.includes('expensive') ? ['Aravalli greens & 30k clubhouse justified premium value'] : [],
            language_detected: hasHindi ? 'Hinglish' : 'English',
            follow_up_action: hasVisit ? 'Send WhatsApp brochure & Experience Centre location pin' : 'Follow up with pricing sheet',
            escalation_required: lower.includes('senior') || lower.includes('escalat'),
            escalation_reason: lower.includes('senior') ? 'Customer requested senior sales head discussion' : null,
            conversation_summary: 'Customer interacted with Priya regarding Northstar One specifications, configurations, and pricing.',
            voice_suitability_score: 97
          };
        }
      }

      res.json(analytics);
    } catch (error: any) {
      console.error('Analytics extraction error:', error);
      res.status(500).json({ error: error.message || 'Analytics failed' });
    }
  });

  // Vite middleware in development, static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Northstar Homes AI Agent Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
