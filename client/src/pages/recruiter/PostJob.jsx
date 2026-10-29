/**
 * @file PostJob.jsx
 * @module JobModule
 * @owner Member 2
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { PlusCircle } from 'lucide-react';

export const PostJob = () => {
  return (
    <TeammateStubCard
      title="Create New Job Vacancy"
      owner="Member 2 (Jobs + Applications + Recruiter)"
      branch="feature/jobs-applications"
      description="Publish campus job openings with required technical skills, salary bands, and deadlines."
      endpoints={[
        'POST /api/jobs'
      ]}
    >
      <Card title="Job Creation Form (Stub)" subtitle="Member 2 will implement full schema inputs">
        <div className="space-y-4 max-w-xl">
          <p className="text-xs text-slate-400">
            Includes job title, role description, skill tags, salary range, vacancies, and application cutoff dates.
          </p>
          <Button variant="primary" icon={PlusCircle} onClick={() => alert('Job creation handled by Member 2')}>
            Publish Job Listing (Member 2)
          </Button>
        </div>
      </Card>
    </TeammateStubCard>
  );
};
