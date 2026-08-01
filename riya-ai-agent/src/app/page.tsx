'use client';

import { useState, useEffect, useRef } from 'react';
import VoiceAssistant from '@/components/VoiceAssistant';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <VoiceAssistant />
    </main>
  );
}