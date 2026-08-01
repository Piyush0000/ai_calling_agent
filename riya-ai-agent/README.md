# Riya - Real Estate AI Calling Agent (Next.js Version)

A modern, production-ready browser-based voice AI agent that acts as a real estate sales executive. Built with Next.js 15, TypeScript, and React for superior code quality and user experience.

## 🚀 Tech Stack (All Free Tier)

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS for modern UI
- **LLM/Brain**: Groq API - `llama-3.3-70b-versatile` (free, no card, fast)
- **Speech-to-Text**: Browser `SpeechRecognition` (Web Speech API)
- **Text-to-Speech**: Browser `speechSynthesis` (Web Speech API)
- **API Routes**: Next.js API routes for backend
- **Lead Storage**: Local JSON file storage
- **Hosting**: Vercel (full-stack Next.js deployment)

## 🏗️ Architecture

### Project Structure (Next.js App Router)
```
riya-ai-agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts        # Chat API endpoint
│   │   │   └── leads/
│   │   │       └── route.ts        # Leads API endpoint
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Main page (VoiceAssistant component)
│   │   └── globals.css              # Global styles
│   └── components/
│       └── VoiceAssistant.tsx        # Main voice UI component
├── data/
│   └── leads.json                   # Lead storage (gitignored)
├── .env.local.example               # Environment variables template
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

### How It Works

1. **User Interaction**: User speaks to Riya through the browser microphone
2. **Speech Recognition**: React component uses Web Speech API with hooks
3. **State Management**: React hooks manage conversation state and UI
4. **API Processing**: Next.js API routes handle backend logic
5. **AI Integration**: Groq API generates contextual responses
6. **Lead Capture**: System prompt includes hidden `[[CALL_SUMMARY]]` marker
7. **Data Extraction**: API routes parse and save lead data to JSON
8. **Speech Synthesis**: Web Speech API converts responses to voice

## 🎯 Key Features

### Modern React Implementation
- **React Hooks**: useState, useEffect, useRef for state management
- **TypeScript**: Full type safety and better developer experience
- **Component Architecture**: Modular, reusable components
- **State Management**: Clean React state patterns
- **Error Handling**: Comprehensive error boundaries and user feedback

### Enhanced Conversation Flow
- **Auto-restart listening**: Smooth conversation flow without manual triggers
- **React state management**: Reliable button and status updates
- **Better speech handling**: Improved recognition and synthesis
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS

### Multi-language Support
- Hindi, Hinglish, English conversations
- Language detection and adaptation
- Voice selection for different languages

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Free Groq API key from [console.groq.com](https://console.groq.com/keys)

### Installation

1. **Navigate to project directory**
   ```bash
   cd riya-ai-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your Groq API key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables (.env.local)
```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### Production Environment Variables
For Vercel deployment, set these in your Vercel dashboard:
- `GROQ_API_KEY`: Your Groq API key
- `NEXT_PUBLIC_BACKEND_URL`: Your deployed Vercel URL

## 🌐 Deployment

### Vercel Deployment (Recommended)

Since this is a Next.js app, Vercel deployment is straightforward:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure everything
   - Add environment variables in Vercel dashboard
   - Deploy!

### Environment Variables in Vercel
- Go to your project Settings → Environment Variables
- Add:
  - `GROQ_API_KEY`: Your Groq API key
  - `NEXT_PUBLIC_BACKEND_URL`: Your Vercel URL (or leave blank for same-domain)

## 📊 Lead Data Structure

```typescript
{
  id: string;
  name: string;
  phone: string;
  preferred_location: string;
  property_type: string;
  configuration: string;
  budget: string;
  purpose: string;
  timeline: string;
  interest_level: 'high' | 'medium' | 'low';
  language: 'Hindi' | 'Hinglish' | 'English';
  questions_asked: string[];
  timestamp: string;
}
```

## 🎨 UI Features

### Modern Design
- **Tailwind CSS**: Utility-first CSS for modern styling
- **Responsive Design**: Works on all devices
- **Visual Feedback**: Color-coded status indicators
- **Smooth Animations**: React-based transitions
- **Accessibility**: Keyboard-friendly and screen-reader compatible

### Conversation UI
- **Real-time Transcript**: Live conversation display
- **Status Indicators**: Listening, Processing, Speaking states
- **Leads Modal**: View captured leads in modern modal
- **Language Selector**: Easy language switching
- **Error Handling**: User-friendly error messages

## 🔍 API Endpoints

### POST /api/chat
Process chat messages and get AI responses.

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
    "interest_level": "high",
    "language": "English",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

## 🏢 Project Information (Sunrise Meadows)

- **Location**: Sector 49, Gurugram
- **Price**: Starting from ₹85 lakhs
- **Configuration**: 2BHK, 3BHK, and 4BHK apartments
- **Amenities**: Swimming pool, gym, clubhouse, children's play area, 24/7 security, landscaped gardens
- **Possession**: Ready to move
- **Nearby**: Metro station, international schools, hospitals, shopping malls, corporate hubs
- **Location advantages**: Well-connected to NH-8, Golf Course Road, Cyber City

## 🧪 Testing

### Local Testing
```bash
cd riya-ai-agent
npm run dev
```

### Testing Checklist
- [ ] Greeting and introduction
- [ ] Language switching (Hindi, Hinglish, English)
- [ ] Conversation flow (buy/invest → requirements → project info → contact → closing)
- [ ] Lead capture and storage
- [ ] CALL_SUMMARY marker parsing
- [ ] Voice quality (female voice selection)
- [ ] Transcript display
- [ ] Leads viewing functionality

## 📝 Assignment Submission

**Candidate Name**: Piyush
**Live Demo URL**: [To be added after Vercel deployment]
**Calling Number / Voice Demo Link**: [Same URL - browser-based]
**Video Demo Link**: [To be recorded]
**GitHub/Source Code Link**: https://github.com/Piyush0000/ai_calling_agent (Next.js version)
**Tools Used**: Next.js 15, TypeScript, React, Tailwind CSS, Groq LLM, Web Speech API, Vercel
**Known Limitations**: See below

## ⚠️ Known Limitations

1. **Browser Compatibility**: Web Speech API works best in Chrome desktop/Android
2. **Speech Recognition Quality**: Hindi recognition varies by browser/OS
3. **Browser-based Call**: This is a browser demo, not a real phone call (disclosed and allowed by assignment brief)
4. **Free Hosting**: Free tiers may cold-start after inactivity
5. **Data Persistence**: JSON file storage (suitable for demo, not production)

## 🔄 Differences from HTML Version

### Improvements in Next.js Version
- **Better Code Quality**: TypeScript for type safety
- **Modern UI**: Tailwind CSS for professional design
- **React State Management**: Reliable state handling with hooks
- **Component Architecture**: Modular, maintainable code
- **Better Performance**: Next.js optimization and caching
- **Easier Deployment**: Single-command Vercel deployment
- **Developer Experience**: Better debugging and tooling

### Features Retained
- Same conversation flow and AI capabilities
- Web Speech API integration
- Groq API for AI responses
- Lead capture and storage
- Multi-language support
- Female voice selection

## 🚀 Future Improvements

1. **Real Phone Integration**: Twilio or similar for actual phone calls
2. **Database Integration**: PostgreSQL/MongoDB for production data
3. **Advanced Speech Recognition**: Google Speech-to-Text API
4. **Voice Cloning**: Custom voice for brand consistency
5. **Analytics Dashboard**: Conversation metrics and lead quality
6. **CRM Integration**: Direct real estate CRM integration

## 🤝 Contributing

This is a demonstration project for an AI internship assignment. For improvements or issues, please create a pull request or issue.

## 📄 License

This project is created for educational purposes as part of an AI internship assignment.

---

**Built with ❤️ using Next.js 15 + TypeScript + Tailwind CSS**