/**
 * @file Card.jsx
 * @description Flexible container card component with header, title, and action slots.
 */

import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  action,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:border-slate-700 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-100">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
