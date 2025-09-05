'use client';
import React from 'react';
import { User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GoogleIcon = ({ className = "w-5 h-5", ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M20.64 12.2045c0-.6382-.0573-1.2518-.1636-1.8409H12v3.4818h4.8436c-.2086 1.125-.8427 2.0782-1.7772 2.7218v2.2582h2.9087c1.7018-1.5668 2.6836-3.8741 2.6836-6.6218z" fill="#4285F4" />
        <path d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2582c-.806.5446-1.8273.8682-3.0477.8682-2.3455 0-4.3282-1.5818-5.0364-3.7104H3.957v2.3318C5.4382 18.9832 8.4818 21 12 21z" fill="#34A853" />
        <path d="M6.9636 13.71c-.18-.5445-.2827-1.1168-.2827-1.71s.1027-1.1655.2827-1.71V7.9582H3.957A8.9965 8.9965 0 003 12c0 1.4545.3477 2.8273.957 4.0418L6.9636 13.71z" fill="#FBBC05" />
        <path d="M12 6.2818c1.3227 0 2.5077.4545 3.4405 1.346l2.5813-2.5814C16.4632 3.5236 14.426 3 12 3 8.4818 3 5.4382 5.0168 3.957 7.9582L6.9636 10.29C7.6718 8.1618 9.6545 6.2818 12 6.2818z" fill="#EA4335" />
      </g>
    </svg>
  );
};

const RegisterPage = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-2xl p-8 md:p-12 animate-float">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Join CodeDuo
            </h1>
            <p className="text-gray-500 mt-2">Create an account to start your journey.</p>
          </div>

          {/* Registration Form */}
          <form className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="block w-full rounded-lg border-gray-200 pl-10 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border-gray-200 pl-10 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-lg border-gray-200 pl-10 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="block w-full rounded-lg border-gray-200 pl-10 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 cursor-pointer to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Logins */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center cursor-pointer py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              <GoogleIcon className="w-5 h-5 mr-3" />
              Sign up with Google
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;