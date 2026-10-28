'use client';

import React from 'react';
import { Users, Video, FileText, ArrowUpRight, Clock, Activity } from 'lucide-react';

const RECENT_ACTIVITY = [
  { id: 1, action: 'New Client Provisioned', subject: 'Acme Corp', time: '2 mins ago', type: 'user' },
  { id: 2, action: 'Resource Uploaded', subject: 'Q3 Financial Templates.xlsx', time: '1 hour ago', type: 'doc' },
  { id: 3, action: 'Replay Published', subject: '2026-10 Growth Lab', time: '3 hours ago', type: 'video' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Welcome Back, Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Here is what is happening in your portal today.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Clients', value: '142', icon: Users, trend: '+3 this week' },
          { label: 'Growth Replays', value: '24', icon: Video, trend: '1 pending upload' },
          { label: 'Library Assets', value: '89', icon: FileText, trend: '+12 this month' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-900 rounded-md">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-slate-500">
              <ArrowUpRight className="w-4 h-4 mr-1 text-green-600" />
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-900" />
          <h2 className="font-semibold text-slate-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {RECENT_ACTIVITY.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-stone-50">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.type === 'user' ? 'bg-green-100 text-green-700' :
                  activity.type === 'doc' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {activity.type === 'user' ? <Users className="w-4 h-4"/> : 
                   activity.type === 'doc' ? <FileText className="w-4 h-4"/> : 
                   <Video className="w-4 h-4"/>}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.subject}</p>
                </div>
              </div>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}