# Riya - Real Estate AI Calling Agent

A browser-based voice AI agent that acts as a real estate sales executive. Riya can converse in Hindi, Hinglish, and English, follows a structured sales flow, and captures lead information automatically.

## 🎯 Project Overview

Riya is an AI-powered real estate sales assistant built for the AI Internship final-round assignment. The project uses entirely free tools and demonstrates:

- **Voice-to-Voice AI Conversations**: Using Web Speech API for speech recognition and synthesis
- **Natural Language Processing**: Powered by Groq's fast LLM API
- **Lead Capture**: Automatic extraction and storage of customer information
- **Multi-language Support**: Hindi, Hinglish, and English conversations
- **Browser-based Demo**: No phone system required - runs entirely in the browser

## 🏗️ Architecture

### Tech Stack (All Free Tier)

- **LLM/Brain**: Groq API - `llama-3.3-70b-versatile` (free, no credit card required)
- **Speech-to-Text**: Browser `SpeechRecognition` (Web Speech API)
- **Text-to-Speech**: Browser `speechSynthesis` (Web Speech API)
- **Backend**: Node.js + Express
- **Lead Storage**: Local JSON file storage
- **Hosting**: Render (backend) + Vercel (frontend) - both free tiers

### Project Structure

```
real-estate-ai-agent/
├── backend/
│   ├── server.js              # Express server with Groq API integration
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   └── data/
│       ├── .gitkeep           # Ensures data directory is tracked
│       └── leads.json         # Lead storage (gitignored for privacy)
├── frontend/
│   └── index.html             # Single-page voice UI application
├── .gitignore                 # Git ignore patterns
├── render.yaml                # Render deployment configuration
├── vercel.json                # Vercel deployment configuration
└── README.md                  # This file
```

### How It Works

1. **User Interaction**: User speaks to Riya through the browser microphone
2. **Speech Recognition**: Web Speech API converts speech to text
3. **AI Processing**: Backend sends conversation to Groq API with system prompt
4. **Response Generation**: AI generates contextual response in the user's language
5. **Lead Capture**: When conversation ends, AI includes hidden `[[CALL_SUMMARY]]` marker
6. **Data Extraction**: Backend parses the marker and saves lead data to JSON
7. **Speech Synthesis**: Response is converted back to speech for the user

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Free Groq API key from [console.groq.com](https://console.groq.com/keys)
- Chrome browser (best Web Speech API support)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd real-estate-ai-agent
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Groq API key
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3001`

5. **Open the frontend**
   Open `frontend/index.html` in Chrome browser

6. **Start a conversation**
   - Click "Start Call" button
   - Allow microphone access
   - Start speaking with Riya

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

### Frontend Backend URL

For local development, the frontend defaults to `http://localhost:3001`. For production deployment, you'll need to update the `BACKEND_URL` in `frontend/index.html`:

```javascript
const BACKEND_URL = 'https://your-render-backend-url.onrender.com';
```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com) (free tier)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Build command: `npm install`
   - Start command: `node server.js`
   - Add environment variable: `GROQ_API_KEY` = your Groq API key

3. **Deploy**
   - Render will automatically deploy your backend
   - Note the deployed URL (e.g., `https://riya-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com) (free tier)

2. **Update Backend URL**
   - Edit `frontend/index.html`
   - Set `BACKEND_URL` to your Render backend URL

3. **Deploy**
   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Vercel will automatically deploy your frontend

4. **Configure Domain**
   - Vercel will provide a `.vercel.app` domain
   - Note the deployed URL

### Alternative: ngrok (for quick testing)

```bash
# In one terminal, start the backend
cd backend
npm start

# In another terminal, start ngrok
ngrok http 3001

# Use the ngrok URL as BACKEND_URL in frontend
```

## 📊 Lead Data

Captured leads are stored in `backend/data/leads.json` with the following structure:

```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "phone": "+91 9876543210",
    "budget": "₹85-90 lakhs",
    "requirements": "2BHK, ready to move",
    "interest_level": "high",
    "language": "English",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

## 🎨 Features

### Conversation Flow

Riya follows a structured sales conversation:

1. **Greeting**: Warm introduction as Sunrise Meadows sales executive
2. **Intent**: Ask if customer is looking to buy or invest
3. **Requirements**: Understand budget, preferences, timeline
4. **Project Info**: Share details about Sunrise Meadows
5. **Contact Collection**: Get name and phone number
6. **Closing**: Professional conversation conclusion

### Multi-language Support

- **English**: Standard English conversation
- **Hindi**: Hindi language conversation
- **Hinglish**: Mixed Hindi-English conversation (very natural)

### Lead Capture

The AI automatically captures:
- Customer name
- Phone number
- Budget range
- Specific requirements
- Interest level (high/medium/low)
- Language preference
- Timestamp

## 🔍 API Endpoints

### POST /api/chat
Process a chat message and get AI response.

**Request:**
```json
{
  "message": "I'm looking for a 2BHK apartment",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "response": "Great! I can help you with that. What's your budget range?",
  "leadData": null,
  "conversationHistory": [...]
}
```

### GET /api/leads
Get all captured leads.

**Response:**
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "phone": "+91 9876543210",
    "budget": "₹85-90 lakhs",
    "requirements": "2BHK, ready to move",
    "interest_level": "high",
    "language": "English",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🏢 Project Information (Sunrise Meadows)

- **Location**: Sector 49, Gurugram
- **Price**: Starting from ₹85 lakhs
- **Configuration**: 2BHK and 3BHK apartments
- **Amenities**: Swimming pool, gym, clubhouse, children's play area, 24/7 security
- **Possession**: Ready to move
- **Nearby**: Metro station, schools, hospitals, shopping malls

## ⚠️ Known Limitations

1. **Browser Compatibility**: Web Speech API works best on Chrome desktop/Android
2. **Speech Recognition Quality**: Hindi recognition varies by browser/OS
3. **Browser-based Call**: This is a browser demo, not a real phone call (disclosed and allowed by assignment brief)
4. **Free Hosting**: Free tiers may cold-start after inactivity
5. **Data Persistence**: On Render, data is stored in `/tmp` and may be lost on redeployment

## 🛠️ Development

### Running Locally

```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend (if using a local server)
cd frontend
# Simply open index.html in Chrome, or use:
npx serve .
```

### Testing

1. Start the backend server
2. Open frontend in Chrome
3. Click "Start Call"
4. Have a complete conversation
5. Check "View Captured Leads" to verify data capture
6. Check `backend/data/leads.json` for stored data

## 📝 Assignment Submission

**Candidate Name**: [Your Name]
**Live Demo URL**: [Your deployed Vercel URL]
**Calling Number / Voice Demo Link**: [Same URL - browser-based]
**Video Demo Link**: [Optional - if you create one]
**GitHub/Source Code Link**: [Your repository URL]
**Tools Used**: Groq LLM, Web Speech API, Node/Express, JSON storage, Vercel + Render
**Known Limitations**: See Known Limitations section above

## 🤝 Contributing

This is a demonstration project for an AI internship assignment. For improvements or issues, please create a pull request or issue.

## 📄 License

This project is created for educational purposes as part of an AI internship assignment.

## 🙏 Acknowledgments

- Groq API for fast, free LLM access
- Web Speech API for browser-based voice capabilities
- Render and Vercel for free hosting tiers

---

**Built with ❤️ for the AI Internship Final Round**
