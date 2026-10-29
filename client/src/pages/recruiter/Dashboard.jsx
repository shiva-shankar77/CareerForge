/**
 * @file Dashboard.jsx
 * @module RecruiterPortal
 * @owner Member 2
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Card } from '../../components/common/Card';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';

export const RecruiterDashboard = () => {
  return (
    <TeammateStubCard
      title="Recruiter Overview Hub"
      owner="Member 2 (Jobs + Applications + Recruiter)"
      branch="feature/jobs-applications"
      description="Quick metrics on active job vacancies, applicant counts, and pending candidate reviews."
      endpoints={[
        'GET /api/recruiters/stats',
        'GET /api/recruiters/profile'
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Active Jobs</span>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Total Applicants</span>
            <p className="text-2xl font-bold text-white">18</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Shortlisted</span>
            <p className="text-2xl font-bold text-white">5</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Pending Review</span>
            <p className="text-2xl font-bold text-white">13</p>
          </div>
        </div>
      </div>
    </TeammateStubCard>
  );
};
