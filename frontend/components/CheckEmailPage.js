import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CheckEmailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-2xl p-8 md:p-12 animate-float text-center">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Check Your Email
            </h1>
            <p className="text-gray-500 mt-2 max-w-sm">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
          </div>

          {/* Information */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm text-gray-600 mb-8">
            <p>Didn't receive the email? Check your spam folder or try again in a few minutes.</p>
          </div>

          {/* Back to Login Link */}
          <div className="text-center">
            <a href="/login" className="font-medium text-purple-600 hover:text-purple-500 flex items-center justify-center group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Sign In
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;