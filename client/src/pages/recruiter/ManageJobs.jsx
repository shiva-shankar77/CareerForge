/**
 * @file ManageJobs.jsx
 * @module JobModule
 * @owner Member 2
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Table } from '../../components/common/Table';

export const ManageJobs = () => {
  const sampleJobs = [
    { title: 'Junior Full Stack Developer', type: 'Full-time', applicants: 12, status: 'Active' },
    { title: 'Frontend React Engineer', type: 'Full-time', applicants: 6, status: 'Active' }
  ];

  return (
    <TeammateStubCard
      title="Manage Posted Jobs"
      owner="Member 2 (Jobs + Applications + Recruiter)"
      branch="feature/jobs-applications"
      description="View, edit, or close job postings published by your company."
      endpoints={[
        'GET /api/jobs/recruiter/my-jobs',
        'PUT /api/jobs/:id',
        'DELETE /api/jobs/:id'
      ]}
    >
      <Table
        columns={['Job Title', 'Type', 'Applicants', 'Status', 'Actions']}
        data={sampleJobs}
        renderRow={(job, idx) => (
          <tr key={idx} className="hover:bg-slate-800/40">
            <td className="px-6 py-4 font-semibold text-white">{job.title}</td>
            <td className="px-6 py-4 text-slate-300">{job.type}</td>
            <td className="px-6 py-4 font-bold text-sky-400">{job.applicants}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {job.status}
              </span>
            </td>
            <td className="px-6 py-4 space-x-2">
              <button className="text-xs text-sky-400 hover:text-sky-300 font-semibold">Edit</button>
              <button className="text-xs text-rose-400 hover:text-rose-300 font-semibold">Close</button>
            </td>
          </tr>
        )}
      />
    </TeammateStubCard>
  );
};
