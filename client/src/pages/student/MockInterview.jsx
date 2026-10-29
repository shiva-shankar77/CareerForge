/**
 * @file MockInterview.jsx
 * @module RealtimeInterviewModule
 * @owner Member 4 (Realtime Socket.io + UI) & Member 3 (AI Evaluation)
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Button } from '../../components/common/Button';
import { Bot, Mic, Video, Sparkles } from 'lucide-react';

export const MockInterview = () => {
  return (
    <TeammateStubCard
      title="AI-Powered Technical Mock Interview Room"
      owner="Member 4 (Socket.io) & Member 3 (AI Service)"
      branch="feature/realtime-notifications & feature/ai-interview"
      description="Interactive real-time interview simulator. Candidate answers technical questions via microphone/webcam; Gemini AI evaluates answer depth, problem-solving, and communication clarity."
      endpoints={[
        'POST /api/interviews/create',
        'POST /api/ai/generate-questions',
        'POST /api/ai/evaluate-answer',
        'POST /api/interviews/:sessionId/submit'
      ]}
      socketEvents={[
        'interview:start (Client -> Server)',
        'interview:question (Server -> Client)',
        'interview:answer (Client -> Server)',
        'interview:evaluation (Server -> Client)',
        'interview:complete (Server -> Client)'
      ]}
    >
      <div className="glass-card rounded-2xl p-8 border border-brand-500/30 text-center max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-brand-500/20">
          <Bot className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">Ready for your AI Technical Screen?</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
            Choose your target role (Frontend, Backend, MERN, AI/ML) and difficulty level. The system will start a Socket.io session and stream questions live.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="lg" icon={Mic} onClick={() => alert('Socket.io live session owned by Member 4')}>
            Launch Live AI Session
          </Button>
        </div>
      </div>
    </TeammateStubCard>
  );
};
