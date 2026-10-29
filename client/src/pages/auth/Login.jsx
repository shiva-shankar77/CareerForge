/**
 * @file Login.jsx
 * @description Working Authentication Screen with 1-Click Demo Credential fill for Student, Recruiter, and Admin.
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Mail, Lock, Zap, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Toast } from '../../components/common/Toast';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Check if redirected due to expired session
  const queryParams = new URLSearchParams(location.search);
  const sessionExpired = queryParams.get('session_expired');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      const userRole = result.user.role;
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/student/jobs');
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  /**
   * Helper to quickly fill credentials for viva demonstration
   */
  const fillCredentials = (role) => {
    setErrorMessage('');
    if (role === 'admin') {
      setEmail('admin@careerforge.dev');
      setPassword('Admin@123');
    } else if (role === 'recruiter') {
      setEmail('recruiter1@techcorp.com');
      setPassword('Recruiter@123');
    } else if (role === 'student') {
      setEmail('student1@uni.edu');
      setPassword('Student@123');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 group mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white font-['Outfit']">Career<span className="text-brand-400">Forge</span></span>
          </Link>
          <h2 className="text-xl font-bold text-slate-100">Sign in to your account</h2>
          <p className="text-xs text-slate-400 mt-1">Access your placement dashboard and mock interviews</p>
        </div>

        {/* 1-Click Demo Fill Card (Examiner / Testing Friendly) */}
        <div className="glass-card rounded-2xl p-4 border border-brand-500/20">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-300 mb-2.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Demo Fill (1-Click)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('student')}
              className="px-2 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all text-center"
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('recruiter')}
              className="px-2 py-1.5 text-xs font-semibold rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 transition-all text-center"
            >
              💼 Recruiter
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('admin')}
              className="px-2 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-all text-center"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Error Banners */}
        {sessionExpired && (
          <Toast
            type="warning"
            message="Your previous session has expired. Please log in again."
          />
        )}

        {errorMessage && (
          <Toast
            type="error"
            message={errorMessage}
            onClose={() => setErrorMessage('')}
          />
        )}

        {/* Login Form */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. student@uni.edu"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-4">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
