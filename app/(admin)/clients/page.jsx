'use client';

import React, { useState } from 'react';
import { Search, ShieldAlert, MoreHorizontal } from 'lucide-react';

const DUMMY_CLIENTS = [
  { id: 1, name: 'Alice Walker', email: 'alice@growthcorp.com', status: 'Active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Robert Chen', email: 'robert@startup.io', status: 'Revoked', lastLogin: 'Oct 12, 2026' },
  { id: 3, name: 'Sarah Miller', email: 'sarah@enterprise.net', status: 'Active', lastLogin: 'Yesterday' },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = DUMMY_CLIENTS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Client Access Management</h1>
          <p className="text-slate-500 text-sm mt-1">Audit entitlement status and manage portal access.</p>
        </div>
      </div>

      <div className="flex items-center bg-white border border-slate-200 rounded-md p-2 shadow-sm max-w-md">
        <Search className="w-4 h-4 text-slate-400 ml-2 mr-2" />
        <input 
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-4">Client Information</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Login</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-stone-50">
                <td className="p-4">
                  <div className="font-medium text-slate-900">{client.name}</div>
                  <div className="text-xs text-slate-500">{client.email}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {client.status}
                  </span>
                </td>
                <td className="p-4">{client.lastLogin}</td>
                <td className="p-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-blue-900 rounded">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}