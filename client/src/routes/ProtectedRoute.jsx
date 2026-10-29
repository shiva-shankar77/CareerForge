/**
 * @file ProtectedRoute.jsx
 * @description Route guard component ensuring authentication and role-based permissions.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/common/Loader';

export const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen text="Verifying credentials..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to the user's natural home screen if trying to access unauthorized role route
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
    return <Navigate to="/student/jobs" replace />;
  }

  return children;
};
