/**
 * @file Toast.jsx
 * @description In-app feedback alert component for success, error, warning, and info banners.
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = ({
  type = 'info',
  message,
  onClose,
  className = ''
}) => {
  if (!message) return null;

  const configs = {
    success: {
      icon: CheckCircle2,
      style: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
    },
    error: {
      icon: AlertCircle,
      style: 'bg-rose-950/80 border-rose-500/40 text-rose-200'
    },
    warning: {
      icon: AlertTriangle,
      style: 'bg-amber-950/80 border-amber-500/40 text-amber-200'
    },
    info: {
      icon: Info,
      style: 'bg-sky-950/80 border-sky-500/40 text-sky-200'
    }
  };

  const current = configs[type] || configs.info;
  const Icon = current.icon;

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg text-sm transition-all duration-200 ${current.style} ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/20 text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
