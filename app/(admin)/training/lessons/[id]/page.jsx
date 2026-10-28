'use client';

import React, { useState } from 'react';
import { Search, FileVideo, Edit3 } from 'lucide-react';

const DUMMY_LESSONS = [
  { id: 1, title: 'Introduction to Frameworks', course: 'B2B Sales Mastery', duration: '12:45', updated: '2 days ago' },
  { id: 2, title: 'Cold Outreach Templates', course: 'B2B Sales Mastery', duration: '08:20', updated: '1 week ago' },
  { id: 3, title: 'Hiring your first SDR', course: 'Operational Excellence', duration: '22:15', updated: '3 weeks ago' },
];

export default function AllLessonsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = DUMMY_LESSONS.filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Lesson Library</h1>
          <p className="text-slate-500 text-sm mt-1">Master database of all individual video and text lessons.</p>
        </div>
      </div>

      <div className="flex items-center bg-white border border-slate-200 rounded-md p-2 shadow-sm max-w-md">
        <Search className="w-4 h-4 text-slate-400 ml-2 mr-2" />
        <input 
          type="text" placeholder="Search by lesson title..." 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-4">Lesson Title</th>
              <th className="p-4">Parent Course</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-stone-50">
                <td className="p-4 font-medium text-slate-900 flex items-center space-x-3">
                  <FileVideo className="w-4 h-4 text-blue-900" />
                  <span>{lesson.title}</span>
                </td>
                <td className="p-4">{lesson.course}</td>
                <td className="p-4 font-mono text-xs">{lesson.duration}</td>
                <td className="p-4">{lesson.updated}</td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-blue-900"><Edit3 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}