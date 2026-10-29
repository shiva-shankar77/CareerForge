/**
 * @file EmptyState.jsx
 * @description Modern placeholder component displayed when lists, queries, or tables return zero results.
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = 'No items to display',
  description = 'Get started by creating your first entry or checking back later.',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`glass-panel rounded-2xl p-10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-6 border border-slate-800 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600/20 to-indigo-600/20 flex items-center justify-center text-brand-400 mb-4 border border-brand-500/20">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
