/**
 * @file Signup.jsx
 * @description Working Registration Screen allowing new Student or Recruiter signups.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Toast } from '../../components/common/Toast';

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const payload = {
      name,
      email,
      password,
      role,
      ...(role === 'recruiter' && { companyName })
    };

    const result = await signup(payload);
    setIsLoading(false);

    if (result.success) {
      if (role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/student/jobs');
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 group mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white font-['Outfit']">Career<span className="text-brand-400">Forge</span></span>
          </Link>
          <h2 className="text-xl font-bold text-slate-100">Create your account</h2>
          <p className="text-xs text-slate-400 mt-1">Start your placement journey with AI mock interviews</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'student'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎓 Candidate Student
          </button>
          <button
            type="button"
            onClick={() => setRole('recruiter')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'recruiter'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            💼 Hiring Recruiter
          </button>
        </div>

        {errorMessage && (
          <Toast
            type="error"
            message={errorMessage}
            onClose={() => setErrorMessage('')}
          />
        )}

        {/* Form */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              placeholder="e.g. Alex Johnson"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {role === 'recruiter' && (
              <Input
                label="Company / Organization Name"
                name="companyName"
                placeholder="e.g. TechCorp Solutions"
                icon={Building2}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            )}

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder={role === 'student' ? 'e.g. alex@uni.edu' : 'e.g. hr@company.com'}
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
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
              Register as {role === 'student' ? 'Student' : 'Recruiter'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
