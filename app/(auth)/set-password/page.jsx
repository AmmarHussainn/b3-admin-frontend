'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import Link from 'next/link';

export default function SetPasswordPage() {
  const [isSet, setIsSet] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSet(true);
  };

  if (isSet) {
    return (
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <ShieldCheck className="w-12 h-12 text-blue-900 mx-auto mb-4" />
        <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">Account Activated</h2>
        <p className="text-slate-500 text-sm mb-6">Your password is set and your account is ready to use.</p>
        <Link href="/login" className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Welcome to the Portal</h1>
        <p className="text-slate-500 text-sm mt-2">Please set a secure password to activate your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Create Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="password"
              required
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none text-slate-900 sm:text-sm"
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Must be at least 8 characters long.</p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800"
        >
          Activate Account
        </button>
      </form>
    </div>
  );
}