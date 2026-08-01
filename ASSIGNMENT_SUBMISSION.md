# Assignment Submission: Live Real Estate AI Calling Agent

## Candidate Name
Piyush

## Live Demo URL
[To be added after deployment - will be deployed to Render + Vercel]

## Calling Number / Voice Demo Link
Browser-based voice demo (same as Live Demo URL)
*Note: This is a browser-based voice demo using Web Speech API, not an actual phone call system, as permitted by the assignment requirements.*

## Video Demo Link
[To be recorded - showing complete working flow]

## GitHub/Source Code Link
https://github.com/Piyush0000/ai_calling_agent

## Tools and Technologies Used

### Core Technologies
- **LLM/AI Model**: Groq API with Llama 3.3 70B Versatile
- **Voice Platform**: Web Speech API (Browser-based Speech Recognition & Synthesis)
- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON file storage (leads.json)

### Free-Tier Services
- **Hosting**: Render (Backend) + Vercel (Frontend)
- **AI API**: Groq (Free tier, no credit card required)
- **Voice API**: Web Speech API (Built into Chrome browser)

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Editor**: VS Code

## AI Model Used

**Model**: Llama 3.3 70B Versatile via Groq API

**Reason for Selection**:
- Free tier available without credit card
- Fast response times suitable for real-time voice conversations
- Good multilingual support (Hindi, Hinglish, English)
- High quality natural language generation
- Cost-effective for demo purposes

**Model Capabilities**:
- Natural conversation flow
- Context awareness for multi-turn conversations
- Language adaptation (responds in customer's language)
- Structured data extraction for call summaries

## Voice or Calling Platform Used

**Platform**: Web Speech API (Browser-native)

**Reason for Selection**:
- Completely free (no API costs)
- No registration or setup required
- Works directly in Chrome browser
- Supports speech recognition and synthesis
- No phone system integration needed (as permitted by assignment)

**Implementation Details**:
- **Speech Recognition**: Uses `webkitSpeechRecognition` API
- **Speech Synthesis**: Uses `speechSynthesis` API with female voice selection
- **Language Support**: Hindi (hi-IN), English (en-US, en-IN)
- **Voice Selection**: Prioritizes female voices (Microsoft Zira, Samantha)

**Limitations**:
- Browser-dependent (works best in Chrome)
- Requires HTTPS for microphone access
- Speech recognition quality varies by browser/OS
- Not a real phone call system (browser-based demo)

## How the Conversation Flow Was Created

### System Prompt Engineering
The conversation flow is created through a carefully designed system prompt that:

1. **Defines Persona**: Riya as a real estate sales executive at Sunrise Meadows
2. **Sets Conversation Rules**: Natural language, customer language matching, no preset responses
3. **Structures Sales Flow**: 7-step conversation progression
4. **Enforces Data Collection**: Specific requirement gathering
5. **Handles Context**: Maintains conversation history across turns
6. **Implements Call Summary**: Structured JSON extraction at conversation end

### Conversation Flow Steps
1. **Greeting & Introduction**: "Hello! I'm Riya from Sunrise Meadows..."
2. **Intent Discovery**: "Are you looking to buy or invest?"
3. **Requirement Gathering**: Location, property type, configuration, budget, purpose, timeline
4. **Project Information**: Shares relevant Sunrise Meadows details
5. **Question Handling**: Natural responses to customer interruptions
6. **Contact Collection**: Name and phone number
7. **Professional Closing**: Ends conversation naturally

### Context Management
- Conversation history maintained across API calls
- AI remembers previous customer responses
- Adaptive flow based on customer's actual input
- Language detection and matching

### Call Summary Generation
- Hidden marker system: `[[CALL_SUMMARY]]{JSON}`
- AI automatically includes this at conversation end
- Backend parses and extracts structured data
- JSON includes all required fields for lead capture

## Challenges Faced

### Technical Challenges

1. **Speech Recognition Accuracy**
   - **Issue**: Inconsistent speech recognition, especially for Hindi
   - **Solution**: Enabled interim results, increased maxAlternatives, added confidence logging
   - **Status**: Improved but still browser-dependent

2. **Microphone Permission Requests**
   - **Issue**: Repeated permission requests during conversation
   - **Solution**: Changed to continuous recognition mode, stop only during AI speech
   - **Status**: Resolved - single permission request per session

3. **Conversation Flow Interruption**
   - **Issue**: Recognition stopping after AI responses, not listening to second responses
   - **Solution**: Improved timing, better state management, auto-restart logic
   - **Status**: Significantly improved

4. **AI Reintroduction**
   - **Issue**: AI repeatedly introducing herself in each response
   - **Solution**: Updated system prompt with explicit instructions against reintroduction
   - **Status**: Resolved

5. **Voice Gender Selection**
   - **Issue**: Default male voice instead of female voice for Riya
   - **Solution**: Implemented female voice prioritization (Zira, Samantha, Google Hindi)
   - **Status**: Resolved - Microsoft Zira female voice selected

### Integration Challenges

1. **Groq API Integration**
   - **Issue**: Initial setup and API key management
   - **Solution**: Environment variables, proper error handling
   - **Status**: Working smoothly

2. **Lead Data Storage**
   - **Issue**: File system vs database decision for demo
   - **Solution**: JSON file storage with proper field validation
   - **Status**: Functional for demo purposes

3. **Deployment Configuration**
   - **Issue**: Setting up free-tier hosting with proper environment variables
   - **Solution**: Render for backend, Vercel for frontend, proper configuration files
   - **Status**: Configured and ready for deployment

## What Would Be Improved in Next Version

### Technical Improvements

1. **Real Phone Integration**
   - Integrate with Twilio or similar for actual phone calls
   - More professional demo experience
   - Better voice quality and reliability

2. **Database Integration**
   - Replace JSON storage with PostgreSQL/MongoDB
   - Better data persistence and reliability
   - Support for concurrent users

3. **Advanced Speech Recognition**
   - Use specialized speech APIs (Google Speech-to-Text, Azure Speech)
   - Better accuracy for Hindi/Hinglish
   - Noise cancellation and enhancement

4. **Voice Cloning**
   - Implement custom voice cloning for consistent brand voice
   - More natural and professional sounding

### Feature Improvements

1. **Advanced Conversation Flow**
   - More sophisticated context management
   - Better handling of complex customer scenarios
   - Sentiment analysis for customer mood detection

2. **Multi-Project Support**
   - Support for multiple real estate projects
   - Dynamic project information based on customer interest
   - Comparison features between projects

3. **Analytics Dashboard**
   - Real-time conversation analytics
   - Lead quality scoring
   - Conversation performance metrics

4. **CRM Integration**
   - Direct integration with real estate CRM systems
   - Automatic lead qualification and routing
   - Follow-up automation

### Architecture Improvements

1. **Scalability**
   - Load balancing for high-volume calls
   - Queue management for concurrent conversations
   - Caching for improved performance

2. **Security**
   - Enhanced data encryption
   - GDPR compliance for customer data
   - Secure API key management

3. **Monitoring & Logging**
   - Comprehensive error tracking
   - Performance monitoring
   - Conversation quality analytics

4. **Testing Framework**
   - Automated testing for conversation flows
   - Load testing for system performance
   - A/B testing for prompt optimization

## Known Limitations

### Current Limitations

1. **Browser Dependency**
   - Works best in Chrome browser
   - Speech recognition quality varies by browser/OS
   - Requires HTTPS for microphone access

2. **Speech Recognition Accuracy**
   - Hindi recognition accuracy is inconsistent
   - Background noise affects recognition
   - Requires clear speaking environment

3. **Data Persistence**
   - JSON file storage (not production-ready)
   - Data loss on redeployment (Render free tier uses /tmp)
   - No backup mechanism

4. **Scalability**
   - Single-user architecture
   - No concurrent conversation support
   - Limited free-tier resources

5. **Demo Nature**
   - Browser-based voice demo, not real phone system
   - Not production-ready for real customers
   - Limited integration with existing systems

### Functional Limitations

1. **Conversation Length**
   - Optimal for short conversations (2-5 minutes)
   - May lose context in very long conversations
   - Token limits may affect very long sessions

2. **Language Support**
   - Limited to Hindi, Hinglish, English
   - Regional dialects may not be well recognized
   - Mixed language switching can be challenging

3. **Complex Handling**
   - May struggle with very complex customer scenarios
   - Limited ability to handle multiple simultaneous topics
   - Simple follow-up question handling

## System Architecture

### Frontend Architecture
- **Single Page Application**: HTML5 + CSS3 + Vanilla JavaScript
- **Voice Interface**: Web Speech API for speech recognition and synthesis
- **State Management**: JavaScript variables for conversation state
- **API Communication**: Fetch API for backend communication

### Backend Architecture
- **REST API**: Express.js server with CORS enabled
- **AI Integration**: Groq SDK for LLM API calls
- **Data Storage**: JSON file system with lead data
- **Environment Management**: dotenv for configuration

### Data Flow
1. User speaks → Speech recognition converts to text
2. Text sent to backend via API
3. Backend sends conversation history to Groq API
4. AI generates response with system prompt context
5. Response returned to frontend
6. Text-to-speech converts response to voice
7. Call summary extracted and saved to JSON file

## Security Considerations

- API keys stored in environment variables (not committed to git)
- CORS enabled for frontend-backend communication
- Basic input validation on API endpoints
- No sensitive customer data in demo version
- HTTPS required for microphone access

## Performance Characteristics

- **Average Response Time**: 1-2 seconds per AI response
- **Speech Recognition Latency**: 500ms - 1 second
- **Voice Synthesis Speed**: Real-time generation
- **Conversation Flow**: Natural timing with 800ms-1.5s delays
- **Concurrent Users**: Single user (demo limitation)

## Conclusion

This implementation successfully demonstrates the core requirements of the assignment:
- ✅ Natural voice-based AI conversation
- ✅ Multi-language support (Hindi, Hinglish, English)
- ✅ Structured real estate sales conversation flow
- ✅ Comprehensive lead data capture
- ✅ Call summary generation
- ✅ Browser-based voice demo (as permitted)
- ✅ Functional and technically sound implementation

The system is ready for live demonstration and technical discussion during the interview.
