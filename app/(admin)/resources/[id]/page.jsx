'use client';

import React from 'react';
import { ArrowLeft, FileText, Download, BarChart2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ResourceDetailPage({ params }) {
  const resourceId = params?.id || 'doc-123';

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/resources" className="p-2 border border-slate-200 rounded-md hover:bg-stone-50 text-slate-500">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Q4 Financial Planner.xlsx</h1>
          <p className="text-slate-500 text-sm mt-1">Resource ID: {resourceId} • Spreadsheet • 1.2 MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Resource Metadata</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                <input type="text" defaultValue="Q4 Financial Planner" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea rows="3" defaultValue="Essential workbook for projecting Q4 revenue targets." className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none"></textarea>
              </div>
              <div className="pt-2">
                <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md shadow">Save Metadata</button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center"><BarChart2 className="w-4 h-4 mr-2 text-blue-900"/> File Insights</h3>
            <div className="space-y-4">
              <div className="bg-stone-50 p-3 rounded border border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-500">Total Downloads</span>
                <span className="text-lg font-bold text-slate-900">412</span>
              </div>
              <div className="bg-stone-50 p-3 rounded border border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-500">Last Download</span>
                <span className="text-sm font-medium text-slate-900">2 hours ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm space-y-3">
            <button className="w-full px-4 py-2 bg-blue-50 text-blue-900 border border-blue-200 rounded-md text-sm font-medium hover:bg-blue-100 flex justify-center items-center">
              <Download className="w-4 h-4 mr-2" /> Download Current File
            </button>
            <button className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm font-medium hover:bg-stone-50 flex justify-center items-center">
              <RefreshCw className="w-4 h-4 mr-2" /> Replace File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}