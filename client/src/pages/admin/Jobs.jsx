/**
 * @file Jobs.jsx
 * @module AdminConsole
 * @owner Member 5
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Table } from '../../components/common/Table';

export const AdminJobs = () => {
  const sampleJobs = [
    { title: 'Full Stack Developer', company: 'TechCorp Solutions', postedBy: 'Sarah Connor', status: 'Active' },
    { title: 'AI Engineering Intern', company: 'Innovate AI Labs', postedBy: 'David Miller', status: 'Active' }
  ];

  return (
    <TeammateStubCard
      title="Platform Job Moderation"
      owner="Member 5 (Admin + Analytics + Deployment)"
      branch="feature/admin-deploy"
      description="Inspect active job postings across campus drives to ensure legitimacy and policy compliance."
      endpoints={[
        'GET /api/jobs',
        'DELETE /api/jobs/:id'
      ]}
    >
      <Table
        columns={['Job Title', 'Company', 'Recruiter', 'Status', 'Moderation Action']}
        data={sampleJobs}
        renderRow={(job, idx) => (
          <tr key={idx} className="hover:bg-slate-800/40">
            <td className="px-6 py-4 font-semibold text-white">{job.title}</td>
            <td className="px-6 py-4 text-slate-300">{job.company}</td>
            <td className="px-6 py-4 text-slate-400">{job.postedBy}</td>
            <td className="px-6 py-4">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                {job.status}
              </span>
            </td>
            <td className="px-6 py-4">
              <button className="text-xs text-rose-400 hover:text-rose-300 font-semibold">
                Archive / Remove
              </button>
            </td>
          </tr>
        )}
      />
    </TeammateStubCard>
  );
};
