/**
 * @file Jobs.jsx
 * @module JobModule
 * @owner Member 2
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

export const Jobs = () => {
  return (
    <TeammateStubCard
      title="Explore Campus Job Openings"
      owner="Member 2 (Jobs + Applications + Recruiter)"
      branch="feature/jobs-applications"
      description="Browse verified vacancies posted by hiring recruiters, filter by skill, and submit job applications."
      endpoints={[
        'GET /api/jobs',
        'GET /api/jobs/:id',
        'POST /api/applications'
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Full Stack Developer (MERN)"
          subtitle="TechCorp Solutions • Hybrid"
          action={<span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">Active</span>}
          hoverEffect
        >
          <div className="space-y-3 mt-2 text-xs text-slate-300">
            <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Bengaluru, India</p>
            <p className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-slate-400" /> ₹7,00,000 - ₹11,00,000 / yr</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">React</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">Node.js</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">MongoDB</span>
            </div>
            <Button variant="primary" size="sm" className="w-full mt-3" onClick={() => alert('Application flow owned by Member 2')}>
              1-Click Apply (Member 2)
            </Button>
          </div>
        </Card>

        <Card
          title="AI / ML Engineering Intern"
          subtitle="Innovate AI Labs • Remote"
          action={<span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-1 rounded-lg">Internship</span>}
          hoverEffect
        >
          <div className="space-y-3 mt-2 text-xs text-slate-300">
            <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Hyderabad, India</p>
            <p className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-slate-400" /> ₹3,00,000 - ₹4,80,000 / yr</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">Python</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">Gemini API</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">FastAPI</span>
            </div>
            <Button variant="primary" size="sm" className="w-full mt-3" onClick={() => alert('Application flow owned by Member 2')}>
              1-Click Apply (Member 2)
            </Button>
          </div>
        </Card>
      </div>
    </TeammateStubCard>
  );
};
