'use client';

import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BulkProvisioningPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Bulk Client Provisioning</h1>
        <p className="text-slate-500 text-sm mt-1">Upload a CSV to batch create users and assign portal access.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
        {!uploadComplete ? (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:bg-stone-50 transition-colors">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-50 rounded-full text-blue-900">
                <UploadCloud className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Drag and drop your CSV file</h3>
            <p className="text-sm text-slate-500 mb-6">Must include headers: Name, Email, Container_ID</p>
            <button 
              onClick={handleSimulateUpload}
              disabled={isUploading}
              className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-md shadow disabled:opacity-70"
            >
              {isUploading ? 'Parsing Data...' : 'Select File'}
            </button>
          </div>
        ) : (
          <div className="text-center p-8 border border-green-200 bg-green-50 rounded-lg">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-green-900 mb-2">Upload Successful</h3>
            <p className="text-sm text-green-700 mb-6">45 new clients have been successfully provisioned and emailed.</p>
            <button 
              onClick={() => setUploadComplete(false)}
              className="px-4 py-2 border border-green-300 text-green-800 bg-white rounded-md text-sm font-medium hover:bg-green-50"
            >
              Upload Another Batch
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
          <FileSpreadsheet className="w-5 h-5 mr-2 text-slate-400" /> Recent Batch Operations
        </h3>
        <div className="divide-y divide-slate-100">
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-900">cohort_q4_2026.csv</p>
              <p className="text-xs text-slate-500">Processed by Admin • Oct 28, 2026</p>
            </div>
            <span className="flex items-center text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
              <CheckCircle2 className="w-3 h-3 mr-1" /> 142 Imported
            </span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-900">failed_sync_recovery.csv</p>
              <p className="text-xs text-slate-500">Processed by System • Oct 25, 2026</p>
            </div>
            <span className="flex items-center text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
              <AlertCircle className="w-3 h-3 mr-1" /> 3 Errors
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}