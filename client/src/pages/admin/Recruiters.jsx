/**
 * @file Recruiters.jsx
 * @module AdminConsole
 * @owner Member 5
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Table } from '../../components/common/Table';

export const AdminRecruiters = () => {
  const pendingRecruiters = [
    { name: 'David Miller', company: 'Innovate AI Labs', email: 'recruiter2@innovate.io', status: 'Pending Verification' }
  ];

  return (
    <TeammateStubCard
      title="Recruiter Verification Queue"
      owner="Member 5 (Admin + Analytics + Deployment)"
      branch="feature/admin-deploy"
      description="Review corporate hiring partner registrations and grant verified job-posting permissions."
      endpoints={[
        'GET /api/admin/recruiters/pending',
        'PATCH /api/admin/recruiters/:id/verify'
      ]}
    >
      <Table
        columns={['Recruiter Name', 'Company', 'Work Email', 'Verification Status', 'Decision']}
        data={pendingRecruiters}
        renderRow={(rec, idx) => (
          <tr key={idx} className="hover:bg-slate-800/40">
            <td className="px-6 py-4 font-semibold text-white">{rec.name}</td>
            <td className="px-6 py-4 text-slate-300">{rec.company}</td>
            <td className="px-6 py-4 text-slate-400 font-mono text-xs">{rec.email}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                {rec.status}
              </span>
            </td>
            <td className="px-6 py-4 space-x-2">
              <button className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold">Approve Company</button>
              <button className="text-xs text-rose-400 hover:text-rose-300 font-semibold">Reject</button>
            </td>
          </tr>
        )}
      />
    </TeammateStubCard>
  );
};
