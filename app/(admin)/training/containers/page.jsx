'use client';

import React, { useState } from 'react';
import { Search, Plus, Package, MoreHorizontal, X } from 'lucide-react';

const DUMMY_CONTAINERS = [
  { id: 1, name: 'B2B Sales Mastery', courses: 4, status: 'Active', enrolled: 124 },
  { id: 2, name: 'Operational Excellence', courses: 6, status: 'Active', enrolled: 89 },
  { id: 3, name: 'Leadership Incubator', courses: 2, status: 'Draft', enrolled: 0 },
];

export default function TrainingContainersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containers, setContainers] = useState(DUMMY_CONTAINERS);

  const filtered = containers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAdd = (e) => {
    e.preventDefault();
    setContainers([{
      id: Date.now(),
      name: e.target.name.value,
      courses: 0,
      status: 'Draft',
      enrolled: 0
    }, ...containers]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Training Containers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage top-level learning tracks and bundles.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-md shadow flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Container</span>
        </button>
      </div>

      <div className="flex items-center bg-white border border-slate-200 rounded-md p-2 shadow-sm max-w-md">
        <Search className="w-4 h-4 text-slate-400 ml-2 mr-2" />
        <input 
          type="text" placeholder="Search containers..." 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-4">Container Name</th>
              <th className="p-4">Courses Included</th>
              <th className="p-4">Total Enrolled</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="p-4 font-medium text-slate-900 flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 text-blue-900 rounded"><Package className="w-4 h-4" /></div>
                  <span>{item.name}</span>
                </td>
                <td className="p-4">{item.courses} Courses</td>
                <td className="p-4">{item.enrolled} Clients</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-blue-900"><MoreHorizontal className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-stone-50">
              <h3 className="font-semibold text-slate-900">Create Container</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Container Name</label>
                <input type="text" name="name" required className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none" />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md shadow">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}