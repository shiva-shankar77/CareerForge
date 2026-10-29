/**
 * @file StudentLayout.jsx
 * @description Candidate Student portal shell with responsive sidebar, notifications bell, and role controls.
 */

import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  User,
  FileText,
  ClipboardList,
  Bot,
  History,
  BarChart3,
  LogOut,
  Bell,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const StudentLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Browse Jobs', path: '/student/jobs', icon: Briefcase },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'ATS Resume Builder', path: '/student/resume-builder', icon: FileText },
    { name: 'My Applications', path: '/student/applications', icon: ClipboardList },
    { name: 'AI Mock Interview', path: '/student/mock-interview', icon: Bot, badge: 'Live AI' },
    { name: 'Interview History', path: '/student/interview-history', icon: History },
    { name: 'Performance Analytics', path: '/student/performance', icon: BarChart3 }
  ];

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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold tracking-tight text-white font-['Outfit']">Career<span className="text-brand-400">Forge</span></span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Tag */}
        <div className="px-6 py-3 border-b border-slate-800/50 bg-slate-900/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Candidate Student</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-600/15 text-brand-300 border border-brand-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Mini Profile & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-indigo-600 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                {user?.name?.charAt(0) || 'S'}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 glass-panel border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-semibold text-slate-200">Student Portal</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell (Member 4 feature) */}
            <button
              title="Notifications"
              className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-slate-950" />
            </button>
            <div className="h-4 w-px bg-slate-800" />
            <span className="text-xs text-slate-400 hidden sm:inline-block">Logged in as: <strong className="text-slate-200">{user?.name}</strong></span>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
