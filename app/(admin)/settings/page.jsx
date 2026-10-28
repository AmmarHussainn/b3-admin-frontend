'use client';

import React, { useState } from 'react';
import { UserPlus, Shield, Mail } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Settings & Team</h1>
        <p className="text-slate-500 text-sm mt-1">Manage portal preferences and administrative access.</p>
      </div>

      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {['general', 'team'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 text-sm font-medium capitalize ${
                activeTab === tab 
                  ? 'border-blue-900 text-blue-900' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab} Settings
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'general' ? (
        <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-2xl shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Portal Branding</h3>
            <p className="text-sm text-slate-500 mb-4">Update the logos and names used across client portals.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" defaultValue="Consult b3" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                <input type="email" defaultValue="support@consultb3.com" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none" />
              </div>
              <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md shadow">Save Changes</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-md shadow flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>
          <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-stone-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-stone-50">
                  <td className="p-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">A</div>
                    <div>
                      <div className="font-medium text-slate-900">Admin User</div>
                      <div className="text-xs text-slate-500">admin@consultb3.com</div>
                    </div>
                  </td>
                  <td className="p-4"><span className="flex items-center text-blue-900"><Shield className="w-4 h-4 mr-1"/> Owner</span></td>
                  <td className="p-4"><span className="text-green-600 font-medium">Active</span></td>
                  <td className="p-4 text-right"><button className="text-slate-400 hover:text-slate-900">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}