/**
 * @file Landing.jsx
 * @description High-conversion Landing Page showcasing the AI Placement Platform,
 * core modules, team architecture, and 1-click test credentials.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  FileCheck2,
  Briefcase,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const Landing = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-8">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span>Next-Gen Campus Placement & AI Interview Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] max-w-4xl mx-auto leading-[1.1]">
          Bridge the Gap Between Campus & <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">Top Tech Careers</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          CareerForge empowers students with automated ATS resume screening, realistic AI-driven technical mock interviews, and direct placement applications.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" variant="primary" icon={ArrowRight}>
              Create Student Account
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary" icon={Zap}>
              Sign In with Demo Accounts
            </Button>
          </Link>
        </div>

        {/* Test Accounts Quick Reference Pill */}
        <div className="mt-12 max-w-3xl mx-auto p-4 glass-card rounded-2xl border border-slate-800 text-left">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Pre-Seeded Demo Accounts (Ready for Viva & Testing)</span>
            </div>
            <Link to="/login" className="text-xs text-brand-400 hover:text-brand-300 font-semibold">
              Instant 1-Click Login →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-rose-400 block mb-1">Super Admin</span>
              <p className="text-slate-300 font-mono">admin@careerforge.dev</p>
              <p className="text-slate-500 font-mono">Admin@123</p>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-sky-400 block mb-1">Verified Recruiter</span>
              <p className="text-slate-300 font-mono">recruiter1@techcorp.com</p>
              <p className="text-slate-500 font-mono">Recruiter@123</p>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">Candidate Student</span>
              <p className="text-slate-300 font-mono">student1@uni.edu</p>
              <p className="text-slate-500 font-mono">Student@123</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Pillars */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">Architectural Highlights</h2>
          <p className="text-3xl font-extrabold text-white font-['Outfit']">Engineered for Scalable Campus Hiring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-brand-500/40 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 border border-brand-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">AI Technical Mock Interviews</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Realtime adaptive technical questioning powered by the Google Gemini API. Candidate audio and transcripts receive immediate quantitative scoring and actionable feedback.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-sky-500/40 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6 border border-sky-500/20">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Intelligent Resume ATS Parser</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automated parsing of student CVs to extract programming languages, frameworks, and academic scores. Generates ATS compatibility scores matched against recruiter job descriptions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Seamless Recruiter Portal</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Verified corporate hiring partners publish vacancies, screen candidate profiles, manage application pipelines, and schedule interviews with zero merge friction.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Member Team Architecture Callout */}
      <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400 mb-2">
                <Code2 className="w-4 h-4" />
                <span>Conflict-Free Collaboration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">5-Member Monorepo Architecture</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Every developer works in strict file isolation with pre-wired REST stubs and client placeholder screens, enabling simultaneous parallel velocity.
              </p>
            </div>
            <Link to="/signup">
              <Button variant="primary" icon={ArrowRight}>
                Explore the Platform
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-brand-400 block mb-1">Member 1</span>
              <p className="text-sm font-semibold text-white">Student & ATS Resume</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">feature/student-resume</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-sky-400 block mb-1">Member 2</span>
              <p className="text-sm font-semibold text-white">Jobs & Applications</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">feature/jobs-applications</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-indigo-400 block mb-1">Member 3</span>
              <p className="text-sm font-semibold text-white">Gemini AI Engine</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">feature/ai-interview</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 block mb-1">Member 4</span>
              <p className="text-sm font-semibold text-white">Socket.io Realtime</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">feature/realtime-notifications</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-rose-400 block mb-1">Member 5</span>
              <p className="text-sm font-semibold text-white">Admin & Analytics</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">feature/admin-deploy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
