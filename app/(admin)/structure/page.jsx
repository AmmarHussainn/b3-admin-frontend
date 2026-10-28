'use client';

import React from 'react';
import { Layers, Move, Eye } from 'lucide-react';

export default function StructurePage() {
  const NAV_ITEMS = ['Dashboard', 'Growth Lab Replays', 'Training System', 'Resource Library'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Portal Structure</h1>
        <p className="text-slate-500 text-sm mt-1">Configure the navigation and layout your clients see.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm max-w-2xl">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-stone-50">
          <h2 className="font-semibold text-slate-900">Client Navigation Menu</h2>
          <button className="text-sm text-blue-600 hover:underline flex items-center"><Eye className="w-4 h-4 mr-1"/> Preview</button>
        </div>
        <div className="p-4 space-y-2">
          {NAV_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-white hover:border-blue-300 cursor-move group">
              <div className="flex items-center space-x-3">
                <Move className="w-4 h-4 text-slate-400 group-hover:text-blue-900" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
              <span className="text-xs text-slate-400">Visible</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}