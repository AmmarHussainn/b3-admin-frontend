'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className=" flex items-center justify-center bg-stone-50">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="h-10 w-10 rounded bg-blue-900 flex items-center justify-center text-white font-bold font-serif text-xl">b3</div>
        </div>
        <h1 className="text-2xl font-serif font-bold text-center text-slate-900 mb-2">Admin Portal</h1>
        <p className="text-center text-sm text-slate-500 mb-8">Sign in with your enterprise credentials</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-2.5 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
              placeholder="admin@consultb3.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs text-blue-700 hover:underline">Forgot?</a>
            </div>
            <input 
              type="password" 
              required
              className="w-full p-2.5 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium p-2.5 rounded-md shadow transition-colors"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}