/**
 * @file TeammateStubCard.jsx
 * @description Developer guidance card rendered on teammate stub pages.
 * Clarifies module ownership, target git branches, and relevant API endpoints.
 */

import React from 'react';
import { GitBranch, UserCheck, Server, Sparkles } from 'lucide-react';

export const TeammateStubCard = ({
  title,
  owner,
  branch,
  description,
  endpoints = [],
  socketEvents = [],
  children
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">{title}</h1>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>

      {/* Teammate Ownership Information Box */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Assigned Team Member</span>
              <p className="text-sm font-bold text-slate-100">{owner}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/60 text-xs font-mono text-slate-300">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>{branch}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-400 mb-2">
              <Server className="w-3.5 h-3.5 text-sky-400" />
              <span>Target Backend Endpoints</span>
            </div>
            <ul className="space-y-1 text-slate-300 font-mono">
              {endpoints.map((ep, i) => (
                <li key={i} className="bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-850">
                  {ep}
                </li>
              ))}
            </ul>
          </div>

          {socketEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Socket.io Realtime Events</span>
              </div>
              <ul className="space-y-1 text-slate-300 font-mono">
                {socketEvents.map((evt, i) => (
                  <li key={i} className="bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-850">
                    {evt}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Feature Preview or Custom Children */}
      {children}
    </div>
  );
};
