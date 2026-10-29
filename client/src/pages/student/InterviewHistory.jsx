/**
 * @file InterviewHistory.jsx
 * @module InterviewHistoryModule
 * @owner Member 3
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Table } from '../../components/common/Table';

export const InterviewHistory = () => {
  const sampleSessions = [
    {
      role: 'Full Stack MERN Developer',
      difficulty: 'Medium',
      date: '2026-10-27',
      score: '84/100',
      status: 'Completed'
    },
    {
      role: 'Frontend React Specialist',
      difficulty: 'Hard',
      date: '2026-10-24',
      score: '78/100',
      status: 'Completed'
    }
  ];

  return (
    <TeammateStubCard
      title="Mock Interview History & AI Reports"
      owner="Member 3 (AI service + Interview REST APIs)"
      branch="feature/ai-interview"
      description="Review completed mock interviews, breakdown scores (Technical, Communication, Problem Solving), and read Gemini AI recommendations."
      endpoints={[
        'GET /api/interviews/history',
        'GET /api/interviews/:sessionId'
      ]}
    >
      <Table
        columns={['Target Role', 'Difficulty', 'Date Completed', 'AI Overall Score', 'Action']}
        data={sampleSessions}
        renderRow={(session, idx) => (
          <tr key={idx} className="hover:bg-slate-800/40">
            <td className="px-6 py-4 font-semibold text-white">{session.role}</td>
            <td className="px-6 py-4 text-slate-300">{session.difficulty}</td>
            <td className="px-6 py-4 text-slate-400">{session.date}</td>
            <td className="px-6 py-4 font-bold text-brand-400">{session.score}</td>
            <td className="px-6 py-4">
              <button className="text-xs text-brand-400 hover:text-brand-300 font-semibold">
                View Full AI Report
              </button>
            </td>
          </tr>
        )}
      />
    </TeammateStubCard>
  );
};
