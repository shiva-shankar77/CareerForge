/**
 * @file Performance.jsx
 * @module AnalyticsModule
 * @owner Member 3 & Member 5
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Card } from '../../components/common/Card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const Performance = () => {
  const radarData = [
    { subject: 'Data Structures', score: 85 },
    { subject: 'React / Frontend', score: 90 },
    { subject: 'Node.js / Express', score: 80 },
    { subject: 'System Design', score: 65 },
    { subject: 'Communication', score: 88 },
    { subject: 'Problem Solving', score: 78 }
  ];

  return (
    <TeammateStubCard
      title="Candidate Performance Analytics"
      owner="Member 3 (AI service) & Member 5 (Analytics)"
      branch="feature/ai-interview"
      description="Visual evaluation graphs tracking technical competency, communication ratings, and readiness indicators."
      endpoints={[
        'GET /api/interviews/history'
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Skill Competency Radar" subtitle="Aggregated from recent AI evaluations">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 100]} />
                <Radar name="Candidate" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Readiness Summary" subtitle="Gemini AI recommendations">
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">Top Strength</span>
              <p>Excellent component lifecycle understanding and React hook best practices.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">Suggested Focus</span>
              <p>Practice scalable database indexing and microservices caching patterns.</p>
            </div>
          </div>
        </Card>
      </div>
    </TeammateStubCard>
  );
};
