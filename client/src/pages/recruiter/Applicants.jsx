/**
 * @file Applicants.jsx
 * @module ApplicationModule
 * @owner Member 2
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Table } from '../../components/common/Table';

export const Applicants = () => {
  const sampleApplicants = [
    { studentName: 'Aarav Sharma', job: 'Junior Full Stack Developer', cgpa: 8.85, atsScore: '89%', status: 'Applied' },
    { studentName: 'Priya Patel', job: 'AI / ML Intern', cgpa: 9.15, atsScore: '94%', status: 'Shortlisted' }
  ];

  return (
    <TeammateStubCard
      title="Candidate Applicant Review"
      owner="Member 2 (Jobs + Applications + Recruiter)"
      branch="feature/jobs-applications"
      description="Inspect applicant profiles, view parsed ATS scores, and update candidate hiring status."
      endpoints={[
        'GET /api/applications/job/:jobId',
        'PATCH /api/applications/:id/status'
      ]}
    >
      <Table
        columns={['Candidate Name', 'Job Applied', 'CGPA', 'ATS Match', 'Status', 'Decision']}
        data={sampleApplicants}
        renderRow={(app, idx) => (
          <tr key={idx} className="hover:bg-slate-800/40">
            <td className="px-6 py-4 font-semibold text-white">{app.studentName}</td>
            <td className="px-6 py-4 text-slate-300">{app.job}</td>
            <td className="px-6 py-4 text-slate-400">{app.cgpa}</td>
            <td className="px-6 py-4 font-bold text-brand-400">{app.atsScore}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {app.status}
              </span>
            </td>
            <td className="px-6 py-4 space-x-2">
              <button className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold">Shortlist</button>
              <button className="text-xs text-rose-400 hover:text-rose-300 font-semibold">Reject</button>
            </td>
          </tr>
        )}
      />
    </TeammateStubCard>
  );
};
