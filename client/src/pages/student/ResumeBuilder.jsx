/**
 * @file ResumeBuilder.jsx
 * @module ResumeModule
 * @owner Member 1
 */

import React from 'react';
import { TeammateStubCard } from '../../components/common/TeammateStubCard';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { FileUp } from 'lucide-react';

export const ResumeBuilder = () => {
  return (
    <TeammateStubCard
      title="ATS Resume Builder & Parser"
      owner="Member 1 (Student profile + Resume)"
      branch="feature/student-resume"
      description="Upload resumes in PDF/Docx format, extract text, and calculate ATS compatibility scores."
      endpoints={[
        'POST /api/resumes/upload',
        'GET /api/resumes/my-resumes',
        'POST /api/resumes/parse-ats'
      ]}
    >
      <EmptyState
        icon={FileUp}
        title="Resume Upload & ATS Engine"
        description="Member 1 will implement the drag-and-drop resume uploader, PDF parsing pipeline, and ATS compatibility visualizer."
        actionText="Upload Resume (Coming Soon)"
        onAction={() => alert('Assigned to Member 1')}
      />
    </TeammateStubCard>
  );
};
