'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Enter your account email to receive a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 bg-green-50 border border-green-200 text-green-700 p-4 rounded-md text-center">
            If an account exists for {email}, a reset link has been sent.
            <div className="mt-4">
              <Link href="/auth/login" className="font-semibold text-red-600 hover:text-red-500">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Send Reset Link
            </button>

            <div className="text-center text-sm">
              <Link href="/auth/login" className="font-medium text-gray-600 hover:text-red-600">
                Back to Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
