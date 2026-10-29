/**
 * @file Profile.jsx
 * @module StudentModule
 * @owner Member 1
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <TeammateStubCard
      title="Student Profile & Portfolio"
      owner="Member 1 (Student profile + Resume)"
      branch="feature/student-resume"
      description="Manage educational background, verified technical skills, GitHub links, and personal bio."
      endpoints={[
        'GET /api/students/profile',
        'PUT /api/students/profile'
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Current Profile Details" subtitle="Populated from session">
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-slate-400 text-xs">Name</span>
              <p className="font-semibold text-white">{user?.name}</p>
            </div>
            <div>
              <span className="text-slate-400 text-xs">Email</span>
              <p className="font-semibold text-white">{user?.email}</p>
            </div>
            <div>
              <span className="text-slate-400 text-xs">Account Status</span>
              <p className="text-emerald-400 font-semibold">Verified Student</p>
            </div>
          </div>
        </Card>

        <Card title="Module Development Instructions" subtitle="For Member 1">
          <p className="text-xs text-slate-400 leading-relaxed">
            Implement the full profile editor form here. Use <code className="text-brand-400">PUT /api/students/profile</code> to persist education arrays, skill badges, and social URLs.
          </p>
        </Card>
      </div>
    </TeammateStubCard>
  );
};
