/**
 * @file AppRoutes.jsx
 * @description Master Application Router.
 * Configures public landing/auth pages, role-guarded layout trees, and 501-stubbed teammate routes.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { RecruiterLayout } from '../layouts/RecruiterLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Guard
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { Landing } from '../pages/Landing';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';

// Student Pages (Member 1, 2, 3, 4)
import { Profile } from '../pages/student/Profile';
import { ResumeBuilder } from '../pages/student/ResumeBuilder';
import { Jobs } from '../pages/student/Jobs';
import { MyApplications } from '../pages/student/MyApplications';
import { MockInterview } from '../pages/student/MockInterview';
import { InterviewHistory } from '../pages/student/InterviewHistory';
import { Performance } from '../pages/student/Performance';

// Recruiter Pages (Member 2)
import { RecruiterDashboard } from '../pages/recruiter/Dashboard';
import { PostJob } from '../pages/recruiter/PostJob';
import { ManageJobs } from '../pages/recruiter/ManageJobs';
import { Applicants } from '../pages/recruiter/Applicants';

// Admin Pages (Member 5)
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminUsers } from '../pages/admin/Users';
import { AdminRecruiters } from '../pages/admin/Recruiters';
import { AdminJobs } from '../pages/admin/Jobs';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Student Protected Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/jobs" replace />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="resume-builder" element={<ResumeBuilder />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="mock-interview" element={<MockInterview />} />
        <Route path="interview-history" element={<InterviewHistory />} />
        <Route path="performance" element={<Performance />} />
      </Route>

      {/* Recruiter Protected Routes */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/recruiter/dashboard" replace />} />
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
        <Route path="applicants" element={<Applicants />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="recruiters" element={<AdminRecruiters />} />
        <Route path="jobs" element={<AdminJobs />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
