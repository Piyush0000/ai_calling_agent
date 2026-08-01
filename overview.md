# Riya — Free Real Estate AI Calling Agent (Brief)

## What it is
A browser-based voice agent ("Riya") that acts as a real estate sales exec.
Talks in Hindi / Hinglish / English, follows the required sales flow, and
saves a lead summary at the end of the call. Built for the AI Internship
final-round assignment — **entirely free, no paid tools.**

## Stack (all free tier)
- **LLM / brain:** Groq API — `llama-3.3-70b-versatile` (free, no card, fast, good Hinglish)
- **Speech-to-text:** Browser `SpeechRecognition` (Web Speech API)
- **Text-to-speech:** Browser `speechSynthesis` (Web Speech API)
- **Backend:** Node.js + Express
- **Lead storage:** local `leads.json` file
- **Hosting:** Vercel/Netlify (frontend) + Render/Railway free tier (backend)

Why free: the assignment allows a **browser-based voice demo** instead of an
actual phone call — so no Twilio/telephony spend needed at all.

## How it works
1. `backend/server.js` holds one system prompt: persona + dummy sample
   project ("Sunrise Meadows", Gurugram) + the required conversation flow
   (greet → buy/invest → requirements → project Q&A → collect name/phone →
   close).
2. Model replies in whatever language style (Hindi/Hinglish/English) the
   customer uses.
3. When the call wraps up, the model appends a hidden `[[CALL_SUMMARY]]{json}`
   marker → backend strips it, saves it to `leads.json`, never speaks it aloud.
4. `frontend/index.html` is a single-file voice UI: mic button, live
   transcript, language dropdown, "view captured leads" button.

## To run locally
```bash
cd backend
cp .env.example .env      # add your free Groq key (console.groq.com/keys)
npm install && npm start  # runs on localhost:3001
```
Open `frontend/index.html` in Chrome — done.

## To get a live URL for the interview
- Backend → Render or Railway (free Web Service, root dir `backend`)
- Frontend → Vercel or Netlify (set `window.BACKEND_URL` to your backend URL first)
- Or just run locally + free `ngrok` tunnel

## Known limitations
- Hindi speech recognition/synthesis quality varies by browser/OS (best on Chrome desktop/Android)
- It's a browser call, not a real phone call (disclosed, and allowed by the brief)
- Free hosting tiers may cold-start after inactivity

## Submission doc — fill-in template
```
Candidate Name:
Live Demo URL:
Calling Number / Voice Demo Link:  <same URL — browser-based>
Video Demo Link:
GitHub/Source Code Link:
Tools Used:  Groq LLM, Web Speech API, Node/Express, JSON storage, Vercel + Render
Known Limitations: see above
```