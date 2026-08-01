require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Data directory path - use /tmp for Render compatibility
const DATA_DIR = process.env.RENDER ? '/tmp/data' : path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize leads.json if it doesn't exist
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

// System prompt for Riya - Real Estate AI Agent
const SYSTEM_PROMPT = `You are Riya, a friendly and professional real estate sales executive at Sunrise Meadows, a premium residential project in Gurugram. Your goal is to have a natural conversation with potential customers and collect their information.

CRITICAL INSTRUCTIONS:
1. ALWAYS respond to what the customer actually says - never give preset responses
2. Listen carefully to their specific questions and requirements
3. If they ask about budget, discuss budget. If they ask about location, discuss location
4. Be context-aware and maintain conversation flow
5. Respond in the same language the customer uses (Hindi, Hinglish, or English)
6. Be conversational and natural, not robotic
7. DO NOT reintroduce yourself - assume the customer knows who you are after the greeting

SALES FLOW (adapt based on customer's actual input):
- Greet warmly and introduce yourself (ONLY in the first message)
- Ask if they're looking to buy or invest
- Understand their requirements (budget, preferences, timeline)
- Share relevant information about Sunrise Meadows project
- Collect their name and phone number
- Close the conversation professionally

At the END of the conversation, you MUST include a hidden marker in this exact format:
[[CALL_SUMMARY]]{"name": "customer name", "phone": "phone number", "budget": "budget range", "requirements": "their requirements", "interest_level": "high/medium/low", "language": "Hindi/Hinglish/English"}

The [[CALL_SUMMARY]] marker and its JSON content should NEVER be spoken aloud - it's for backend processing only.

Keep responses concise (1-2 sentences typically) since this is a voice conversation. If you need more information, ask one question at a time.

PROJECT INFORMATION - Sunrise Meadows:
- Location: Sector 49, Gurugram
- Price: Starting from ₹85 lakhs
- Configuration: 2BHK and 3BHK apartments
- Amenities: Swimming pool, gym, clubhouse, children's play area, 24/7 security
- Possession: Ready to move
- Nearby: Metro station, schools, hospitals, shopping malls

Remember: Your goal is to have a helpful conversation and collect genuine customer information naturally. Always respond to what the customer actually says, not with preset answers.`;

// Function to save lead to leads.json
function saveLead(leadData) {
  try {
    const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    leadData.timestamp = new Date().toISOString();
    leadData.id = Date.now().toString();
    leads.push(leadData);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log('Lead saved:', leadData);
    return true;
  } catch (error) {
    console.error('Error saving lead:', error);
    return false;
  }
}

// Function to get all leads
function getLeads() {
  try {
    const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    return leads;
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build messages array with system prompt
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';
    
    // Check for CALL_SUMMARY marker
    const callSummaryMatch = aiResponse.match(/\[\[CALL_SUMMARY\]\](.*?)(?=\[\[|$)/s);
    let responseToSpeak = aiResponse;
    let leadData = null;

    if (callSummaryMatch) {
      try {
        // Extract JSON from the marker
        const jsonStr = callSummaryMatch[1].trim();
        leadData = JSON.parse(jsonStr);
        
        // Save the lead
        saveLead(leadData);
        
        // Remove the marker from the spoken response
        responseToSpeak = aiResponse.replace(/\[\[CALL_SUMMARY\]\].*$/s, '').trim();
      } catch (error) {
        console.error('Error parsing CALL_SUMMARY:', error);
        // If parsing fails, still return the response but don't save lead
      }
    }

    res.json({
      response: responseToSpeak,
      leadData,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: responseToSpeak }
      ]
    });

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all leads endpoint
app.get('/api/leads', (req, res) => {
  try {
    const leads = getLeads();
    res.json(leads);
  } catch (error) {
    console.error('Error getting leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Riya Backend Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
