import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Clock } from 'lucide-react';

export default function LinkExpiredPage() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
      <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Clock className="w-8 h-8 text-amber-600" />
      </div>
      
      <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">Link Expired</h1>
      
      <div className="bg-stone-50 border border-slate-200 rounded-md p-4 mb-6 text-left flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-600">
          For your security, password reset and invitation links expire after 24 hours. The link you clicked is no longer valid.
        </p>
      </div>

      <div className="space-y-3">
        <Link 
          href="/forgot-password" 
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800"
        >
          Request New Link
        </Link>
        <Link 
          href="/login" 
          className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-stone-50"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}