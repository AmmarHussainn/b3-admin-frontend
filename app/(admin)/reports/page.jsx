'use client';

import React from 'react';
import { ArrowUpRight, Users, Play, Clock } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Platform engagement and utilization metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Clients</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">142</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-900 rounded-md"><Users className="w-5 h-5" /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-700">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span className="font-medium">+12% this month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Replays Watched</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">853</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-900 rounded-md"><Play className="w-5 h-5" /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-700">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span className="font-medium">+5% this month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg. Watch Time</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">42m</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-900 rounded-md"><Clock className="w-5 h-5" /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-500">
            <span className="font-medium">Consistent with last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}