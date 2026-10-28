'use client';

import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen bg-stone-50 text-slate-800 flex flex-col items-center justify-between p-6 font-sans overflow-hidden max-md:h-auto max-md:min-h-screen max-md:overflow-y-auto">
      {/* Top Spacer / Brand Logo */}
      <div className="pt-4 flex items-center space-x-3">
        <div className="h-10 w-10 rounded bg-blue-900 flex items-center justify-center text-white font-bold font-serif text-xl shadow-sm">
          b3
        </div>
        <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
          Consult b3
        </span>
      </div>

      {/* Main Auth Form Container Centered Vertically */}
      <main className="w-full max-w-md my-auto py-4">
        {children}
      </main>

      {/* Footer Branding */}
      <footer className="pb-2 text-center text-xs text-slate-400 font-sans">
        Consult b3 Admin Portal &bull; Powered by b3 Growth System™
      </footer>
    </div>
  );
}