/**
 * @file Users.jsx
 * @module AdminConsole
 * @owner Member 5
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Table } from '../../components/common/Table';

export const AdminUsers = () => {
  const sampleUsers = [
    { name: 'Aarav Sharma', email: 'student1@uni.edu', role: 'student', status: 'Active' },
    { name: 'Sarah Connor', email: 'recruiter1@techcorp.com', role: 'recruiter', status: 'Active' },
    { name: 'David Miller', email: 'recruiter2@innovate.io', role: 'recruiter', status: 'Active' }
  ];

  return (
    <TeammateStubCard
      title="User Directory & Access Control"
      owner="Member 5 (Admin + Analytics + Deployment)"
      branch="feature/admin-deploy"
      description="Inspect all registered accounts across roles and toggle block/unblock flags."
      endpoints={[
        'GET /api/admin/users',
        'PATCH /api/admin/users/:id/block'
      ]}
    >
      <Table
        columns={['Name', 'Email Address', 'Role', 'Status', 'Actions']}
        data={sampleUsers}
        renderRow={(user, idx) => (
          <tr key={idx} className="hover:bg-slate-800/40">
            <td className="px-6 py-4 font-semibold text-white">{user.name}</td>
            <td className="px-6 py-4 text-slate-300 font-mono text-xs">{user.email}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                user.role === 'student' ? 'text-emerald-400 bg-emerald-500/10' : 'text-sky-400 bg-sky-500/10'
              }`}>
                {user.role}
              </span>
            </td>
            <td className="px-6 py-4 text-slate-400">{user.status}</td>
            <td className="px-6 py-4">
              <button className="text-xs text-rose-400 hover:text-rose-300 font-semibold">
                Suspend Account
              </button>
            </td>
          </tr>
        )}
      />
    </TeammateStubCard>
  );
};
