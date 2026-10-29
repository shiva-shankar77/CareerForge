/**
 * @file RecruiterLayout.jsx
 * @description Hiring Partner & Recruiter portal shell with job management navigation and verification status banner.
 */

import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Layers,
  Users,
  LogOut,
  Building2,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const RecruiterLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard Hub', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Post a New Job', path: '/recruiter/post-job', icon: PlusCircle },
    { name: 'Manage Job Postings', path: '/recruiter/manage-jobs', icon: Layers },
    { name: 'Applicant Review', path: '/recruiter/applicants', icon: Users }
  ];

  const isVerified = user?.isVerified ?? false;

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass-panel border-r border-slate-800/80 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold tracking-tight text-white font-['Outfit']">Career<span className="text-sky-400">Forge</span></span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Status Card */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hiring Partner</span>
            {isVerified ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <ShieldAlert className="w-3 h-3" />
                Pending
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-600/15 text-sky-300 border border-sky-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Mini Profile & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-700 to-indigo-600 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                {user?.name?.charAt(0) || 'R'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-100 truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 glass-panel border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-semibold text-slate-200">Recruiter Console</h2>
          </div>

          <div className="flex items-center gap-4">
            {!isVerified && (
              <span className="hidden md:inline-block text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1 rounded-full">
                ⚠️ Account pending admin approval to publish jobs
              </span>
            )}
            <span className="text-xs text-slate-400">Recruiter: <strong className="text-slate-200">{user?.name}</strong></span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
