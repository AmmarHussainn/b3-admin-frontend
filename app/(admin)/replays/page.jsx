'use client';

import React, { useState } from 'react';
import { Search, Plus, Video, X } from 'lucide-react';

const DUMMY_REPLAYS = [
  { id: 1, title: '2026-10 Growth Lab - Cash Flow', date: 'Oct 28, 2026', status: 'Live' },
  { id: 2, title: '2026-09 Growth Lab - Market Fit', date: 'Sep 25, 2026', status: 'Live' },
  { id: 3, title: '2026-11 Growth Lab - Forecasting (Draft)', date: 'Nov 20, 2026', status: 'Draft' },
];

export default function ReplaysPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replays, setReplays] = useState(DUMMY_REPLAYS);

  // Functional Search
  const filteredReplays = replays.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddReplay = (e) => {
    e.preventDefault();
    const newReplay = {
      id: Date.now(),
      title: e.target.title.value,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Draft'
    };
    setReplays([newReplay, ...replays]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Growth Lab Replays</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and publish monthly session recordings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-md shadow flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Replay</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center bg-white border border-slate-200 rounded-md p-2 shadow-sm max-w-md">
        <Search className="w-4 h-4 text-slate-400 ml-2 mr-2" />
        <input 
          type="text"
          placeholder="Search replays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-4">Replay Title</th>
              <th className="p-4">Upload Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredReplays.map((replay) => (
              <tr key={replay.id} className="hover:bg-stone-50">
                <td className="p-4 font-medium text-slate-900 flex items-center space-x-3">
                  <Video className="w-4 h-4 text-blue-900" />
                  <span>{replay.title}</span>
                </td>
                <td className="p-4">{replay.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${replay.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {replay.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                </td>
              </tr>
            ))}
            {filteredReplays.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">No replays found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-stone-50">
              <h3 className="font-semibold text-slate-900">Upload New Replay</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddReplay} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Replay Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  placeholder="e.g., 2026-12 Growth Lab"
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Video File</label>
                <div className="border-2 border-dashed border-slate-300 rounded-md p-4 text-center cursor-pointer hover:bg-stone-50">
                  <span className="text-sm text-blue-600 font-medium">Click to select MP4</span>
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md shadow">Save Draft</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}