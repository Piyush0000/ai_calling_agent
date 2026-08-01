'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LeadData {
  name?: string;
  phone?: string;
  preferred_location?: string;
  property_type?: string;
  configuration?: string;
  budget?: string;
  purpose?: string;
  timeline?: string;
  interest_level?: string;
  language?: string;
  questions_asked?: string[];
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [language, setLanguage] = useState('en-US');
  const [status, setStatus] = useState('Ready to start a conversation');
  const [error, setError] = useState('');
  const [showLeads, setShowLeads] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const conversationHistoryRef = useRef<Message[]>([]);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => {
        setIsListening(true);
        setStatus('Listening...');
      };
      
      recognition.onend = () => {
        setIsListening(false);
        // Auto-restart listening if conversation is active and not speaking
        if (isActive && !isSpeaking) {
          setTimeout(() => {
            if (isActive && !isListening && !isSpeaking) {
              try {
                recognitionRef.current?.start();
              } catch (error) {
                console.log('Auto-restart error:', error);
              }
            }
          }, 1000);
        } else {
          setStatus('Tap to speak');
        }
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access.');
          stopConversation();
        } else if (event.error === 'no-speech') {
          setStatus('Tap to speak');
        }
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    // Load voices for speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log('Voices loaded');
      };
    }
  }, [language]);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setError('Text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1.3; // Higher pitch for female voice

    // Force female voice selection
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const femaleVoice = voices.find((voice: any) => 
        voice.name.includes('Female') || 
        voice.name.includes('Zira') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Google Hindi') ||
        voice.name.includes('Microsoft Zira')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        const langPrefix = language.split('-')[0];
        const matchingVoice = voices.find((voice: any) => voice.lang.startsWith(langPrefix));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        } else {
          utterance.voice = voices[0];
        }
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatus('Riya is speaking...');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      // Auto-restart listening if conversation is active
      if (isActive) {
        setStatus('Listening...');
        setTimeout(() => {
          if (isActive && !isListening) {
            startListening();
          }
        }, 800);
      } else {
        setStatus('Tap to speak');
      }
    };

    utterance.onerror = (event: any) => {
      console.error('Speech synthesis error:', event.error);
      setIsSpeaking(false);
      setStatus('Tap to speak');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleUserMessage = async (message: string) => {
    setStatus('Processing...');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationHistory: conversationHistoryRef.current
        })
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const data = await response.json();
      
      conversationHistoryRef.current = data.conversationHistory;
      
      setTranscript(prev => [...prev, { role: 'user', content: message }]);
      setTranscript(prev => [...prev, { role: 'assistant', content: data.response }]);
      
      speak(data.response);
      
      if (data.leadData) {
        console.log('Lead captured:', data.leadData);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      setError('Failed to connect to the backend. Please ensure the server is running.');
      setStatus('Connection error');
    }
  };

  const startConversation = () => {
    setIsActive(true);
    conversationHistoryRef.current = [];
    setTranscript([]);
    
    const greeting = "Hello! I'm Riya from Sunrise Meadows. How can I help you today?";
    setTranscript([{ role: 'assistant', content: greeting }]);
    speak(greeting);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isSpeaking) {
      try {
        recognitionRef.current.lang = language;
        recognitionRef.current.start();
      } catch (error) {
        console.log('Recognition start error:', error);
      }
    }
  };

  const stopConversation = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Error stopping recognition:', error);
      }
    }
    setIsActive(false);
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
    setStatus('Conversation stopped');
  };

  const loadLeads = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/leads`);
      if (!response.ok) {
        throw new Error('Failed to load leads');
      }
      const data = await response.json();
      setLeads(data);
      setShowLeads(true);
    } catch (error) {
      console.error('Error loading leads:', error);
      setError('Failed to load leads. Please ensure the backend is running.');
    }
  };

  const handleButtonClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else if (isActive) {
      if (isSpeaking) {
        stopConversation();
      } else {
        startListening();
      }
    } else {
      startConversation();
    }
  };

  // Handle transcript click to start listening
  const handleTranscriptClick = () => {
    if (isActive && !isListening && !isSpeaking) {
      startListening();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏠 Riya - Real Estate AI Agent</h1>
          <p className="text-gray-600">Your AI-powered real estate sales assistant</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex-1 p-3 border-2 border-gray-200 rounded-lg bg-white cursor-pointer"
          >
            <option value="en-US">English (US)</option>
            <option value="hi-IN">Hindi (India)</option>
            <option value="en-IN">English (India)</option>
          </select>
          
          <button
            onClick={handleButtonClick}
            className={`flex-1 p-4 rounded-lg font-bold cursor-pointer transition-all flex items-center justify-center gap-2 select-none
              ${isActive ? 'bg-green-500 text-white' : 'bg-purple-600 text-white'}
              ${isListening ? 'animate-pulse' : ''}`}
          >
            <span>{isListening ? '⏹️' : '🎤'}</span>
            <span>
              {!isActive ? 'Start Call' : 
               isListening ? 'Stop Call' : 
               isSpeaking ? 'Stop Call' : 'Tap to Speak'}
            </span>
          </button>
        </div>

        {/* Status */}
        <div className={`text-center p-3 rounded-lg mb-6 font-medium
          ${status.includes('Listening') ? 'bg-red-100 text-red-600' :
           status.includes('Processing') ? 'bg-yellow-100 text-yellow-600' :
           status.includes('Speaking') ? 'bg-green-100 text-green-600' :
           'bg-gray-100 text-gray-600'}`}>
          {status}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Transcript */}
        <div 
          onClick={handleTranscriptClick}
          className="bg-gray-50 rounded-lg p-6 mb-6 min-h-64 max-h-96 overflow-y-auto cursor-pointer"
        >
          {transcript.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-100 border-l-4 border-blue-500' 
                  : 'bg-purple-100 border-l-4 border-purple-500'
              }`}
            >
              <div className="font-bold text-sm text-gray-600 mb-2">
                {msg.role === 'user' ? 'You' : 'Riya'}
              </div>
              <div className="text-gray-800">{msg.content}</div>
            </div>
          ))}
        </div>

        {/* View Leads Button */}
        <button
          onClick={loadLeads}
          className="w-full p-4 bg-green-500 text-white rounded-lg font-bold cursor-pointer hover:bg-green-600 transition-colors"
        >
          View Captured Leads
        </button>
      </div>

      {/* Leads Modal */}
      {showLeads && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Captured Leads</h2>
              <button
                onClick={() => setShowLeads(false)}
                className="text-3xl text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ×
              </button>
            </div>
            
            {leads.length === 0 ? (
              <div className="text-center text-gray-600 py-8">No leads captured yet</div>
            ) : (
              leads.map((lead, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-green-500">
                  <h3 className="font-bold text-gray-800 mb-3">{lead.name || 'Unknown'}</h3>
                  <p className="text-gray-600 mb-1"><strong>Phone:</strong> {lead.phone || 'Not provided'}</p>
                  <p className="text-gray-600 mb-1"><strong>Preferred Location:</strong> {lead.preferred_location || 'Not specified'}</p>
                  <p className="text-gray-600 mb-1"><strong>Property Type:</strong> {lead.property_type || 'Not specified'}</p>
                  <p className="text-gray-600 mb-1"><strong>Configuration:</strong> {lead.configuration || 'Not specified'}</p>
                  <p className="text-gray-600 mb-1"><strong>Budget:</strong> {lead.budget || 'Not specified'}</p>
                  <p className="text-gray-600 mb-1"><strong>Purpose:</strong> {lead.purpose || 'Not specified'}</p>
                  <p className="text-gray-600 mb-1"><strong>Timeline:</strong> {lead.timeline || 'Not specified'}</p>
                  <p className="text-gray-600 mb-1"><strong>Interest Level:</strong> {lead.interest_level || 'Unknown'}</p>
                  <p className="text-gray-600 mb-1"><strong>Language:</strong> {lead.language || 'Unknown'}</p>
                  <div className="text-gray-400 text-sm mt-3">
                    {new Date(lead.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}