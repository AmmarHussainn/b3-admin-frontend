'use client';

import React from 'react';
import { ArrowLeft, BookOpen, Clock, PlayCircle, Plus } from 'lucide-react';
import Link from 'next/link';

// In a real app, use React() and fetch data based on params.id
export default function CourseDetailPage({ params }) {
  const courseId = params?.id || 'demo';

  const MODULES = [
    { id: 1, title: 'Module 1: Market Fundamentals', duration: '45 mins', type: 'Video' },
    { id: 2, title: 'Module 2: Competitor Analysis', duration: '60 mins', type: 'Interactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-2">
        <Link href="/training" className="p-2 border border-slate-200 rounded-md hover:bg-stone-50 text-slate-500">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Advanced Go-To-Market</h1>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-medium">Published</span>
          </div>
          <p className="text-slate-500 text-sm mt-1">Course ID: {courseId} • 12 Lessons • 4.5 Hours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-md shadow-sm">
            <h2 className="font-semibold text-slate-900 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-blue-900"/> Curriculum</h2>
            <button className="text-sm text-blue-600 hover:underline flex items-center"><Plus className="w-4 h-4 mr-1"/> Add Lesson</button>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-md shadow-sm divide-y divide-slate-100">
            {MODULES.map((mod) => (
              <div key={mod.id} className="p-4 flex items-center justify-between hover:bg-stone-50">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-5 h-5 text-slate-400" />
                  <span className="font-medium text-slate-900">{mod.title}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {mod.duration}</span>
                  <span className="bg-slate-100 px-2 py-1 rounded text-xs">{mod.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Course Settings</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Visibility</span>
                <span className="font-medium text-slate-900">Public</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Instructor</span>
                <span className="font-medium text-slate-900">Alex Chen</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Completion</span>
                <span className="font-medium text-slate-900">Certificate Enabled</span>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium hover:bg-stone-50">Edit Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}