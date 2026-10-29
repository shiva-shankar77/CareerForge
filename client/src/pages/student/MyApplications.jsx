/**
 * @file MyApplications.jsx
 * @module ApplicationModule
 * @owner Member 2
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Table } from '../../components/common/Table';

export const MyApplications = () => {
  const sampleApplications = [
    {
      company: 'TechCorp Solutions',
      role: 'Junior Full Stack Developer',
      appliedAt: '2026-10-28',
      status: 'Shortlisted'
    },
    {
      company: 'Innovate AI Labs',
      role: 'Machine Learning Intern',
      appliedAt: '2026-10-25',
      status: 'Applied'
    }
  ];

  return (
    <TeammateStubCard
      title="My Placement Applications"
      owner="Member 2 (Jobs + Applications + Recruiter)"
      branch="feature/jobs-applications"
      description="Track the status of your submitted applications (Applied, Shortlisted, Rejected, Selected)."
      endpoints={[
        'GET /api/applications/my-applications'
      ]}
    >
      <Table
        columns={['Company', 'Role Applied', 'Application Date', 'Current Status', 'Action']}
        data={sampleApplications}
        renderRow={(app, idx) => (
          <tr key={idx} className="hover:bg-slate-800/40">
            <td className="px-6 py-4 font-semibold text-white">{app.company}</td>
            <td className="px-6 py-4 text-slate-300">{app.role}</td>
            <td className="px-6 py-4 text-slate-400">{app.appliedAt}</td>
            <td className="px-6 py-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                app.status === 'Shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
              }`}>
                {app.status}
              </span>
            </td>
            <td className="px-6 py-4">
              <button className="text-xs text-brand-400 hover:text-brand-300 font-semibold">
                View Details
              </button>
            </td>
          </tr>
        )}
      />
    </TeammateStubCard>
  );
};
