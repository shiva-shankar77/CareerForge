/**
 * @file Table.jsx
 * @description Standardized data table component with custom headers, row rendering, and responsive scrolling.
 */

import React from 'react';

export const Table = ({
  columns = [],
  data = [],
  renderRow,
  emptyMessage = 'No records found.',
  className = ''
}) => {
  return (
    <div className={`overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 ${className}`}>
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900/90 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} scope="col" className="px-6 py-3.5 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {data.length > 0 ? (
            data.map((item, idx) => renderRow(item, idx))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
