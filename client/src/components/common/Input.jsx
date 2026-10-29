/**
 * @file Input.jsx
 * @description Accessible form input component with labels, error states, and icon prefixes.
 */

import React from 'react';

export const Input = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  helperText = '',
  required = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-slate-900/80 border rounded-xl text-slate-100 text-sm placeholder:text-slate-500 transition-all duration-200 outline-none
            ${Icon ? 'pl-10 pr-4' : 'px-4'} py-2.5
            ${error ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50' : 'border-slate-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'}
          `}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs text-rose-400 mt-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
};
