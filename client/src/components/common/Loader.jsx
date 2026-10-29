/**
 * @file Loader.jsx
 * @description Flexible loading indicator component with full-screen and inline modes.
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
          <Loader2 className="absolute w-6 h-6 text-brand-400 animate-pulse" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-300 tracking-wide">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      {text && <span className="text-xs text-slate-400">{text}</span>}
    </div>
  );
};
