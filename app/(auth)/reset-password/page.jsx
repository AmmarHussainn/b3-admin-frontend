'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation for matching passwords here
    setIsReset(true);
  };

  if (isReset) {
    return (
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">Password Reset Successful</h2>
        <p className="text-slate-500 text-sm mb-6">Your password has been securely updated.</p>
        <Link href="/login" className="w-full inline-flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Create New Password</h1>
        <p className="text-slate-500 text-sm mt-2">Enter your new password below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="block w-full pl-10 pr-10 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none text-slate-900 sm:text-sm"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none text-slate-900 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}