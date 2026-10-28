'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Reset Password</h1>
        <p className="text-slate-500 text-sm mt-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:outline-none text-slate-900 sm:text-sm"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
          >
            Send Reset Link
          </button>
        </form>
      ) : (
        <div className="bg-stone-50 border border-slate-200 rounded-md p-4 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-sm font-medium text-slate-900">Check your email</h3>
          <p className="text-xs text-slate-500 mt-1">
            If an account exists for that email, we have sent password reset instructions.
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/login" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>
      </div>
    </div>
  );
}