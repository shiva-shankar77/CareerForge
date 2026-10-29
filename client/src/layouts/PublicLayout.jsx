/**
 * @file PublicLayout.jsx
 * @description Layout for unauthenticated visitors, landing page, and documentation views.
 */

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const PublicLayout = () => {
  const { isAuthenticated, role, logout } = useAuth();

  const getDashboardPath = () => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'recruiter') return '/recruiter/dashboard';
    return '/student/jobs';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white font-['Outfit']">Career<span className="text-brand-400">Forge</span></span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">AI Placement</span>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition-colors">Features</a>
            <a href="#roles" className="hover:text-brand-400 transition-colors">Platform Modules</a>
            <a href="#team" className="hover:text-brand-400 transition-colors">Team Architecture</a>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardPath()}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Go to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 transition-all flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CareerForge – AI-Powered Placement & Interview Platform. Built for University Placement Drives.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-brand-400">Node.js + Express</span>
            <span>•</span>
            <span className="hover:text-brand-400">MongoDB</span>
            <span>•</span>
            <span className="hover:text-brand-400">Socket.io</span>
            <span>•</span>
            <span className="hover:text-brand-400">React + Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
