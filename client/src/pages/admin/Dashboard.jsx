/**
 * @file Dashboard.jsx
 * @module AdminConsole
 * @owner Member 5
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Card } from '../../components/common/Card';
import { Users, Building2, Briefcase, Bot } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <TeammateStubCard
      title="Platform Executive Dashboard"
      owner="Member 5 (Admin + Analytics + Deployment)"
      branch="feature/admin-deploy"
      description="System-wide analytics, recruiter verification backlog, user moderation, and server metrics."
      endpoints={[
        'GET /api/admin/dashboard-stats'
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Total Users</span>
            <p className="text-2xl font-bold text-white">6</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Recruiters</span>
            <p className="text-2xl font-bold text-white">2</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Job Postings</span>
            <p className="text-2xl font-bold text-white">5</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Mock Sessions</span>
            <p className="text-2xl font-bold text-white">14</p>
          </div>
        </div>
      </div>
    </TeammateStubCard>
  );
};
