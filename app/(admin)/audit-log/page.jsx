'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

const LOGS = [
  { id: 'evt_1', user: 'admin@consultb3.com', action: 'CREATE_RESOURCE', target: 'Q4 Financial Planner.xlsx', time: 'Oct 28, 14:32' },
  { id: 'evt_2', user: 'system_webhook', action: 'SYNC_CLIENT', target: 'Acme Corp', time: 'Oct 28, 12:15' },
  { id: 'evt_3', user: 'admin@consultb3.com', action: 'UPDATE_MODULE', target: 'Phase 1: Foundation', time: 'Oct 27, 09:41' },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">System Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-1">Immutable record of all portal modifications.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-md shadow-sm hover:bg-stone-50 flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter Logs</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600 font-mono">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 font-sans">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Event ID</th>
              <th className="p-4">Actor</th>
              <th className="p-4">Action</th>
              <th className="p-4">Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-stone-50">
                <td className="p-4 text-slate-500">{log.time}</td>
                <td className="p-4 text-xs text-slate-400">{log.id}</td>
                <td className="p-4">{log.user}</td>
                <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">{log.action}</span></td>
                <td className="p-4 text-slate-900">{log.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}