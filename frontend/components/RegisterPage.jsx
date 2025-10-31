'use client';
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { googleAuth, signup } from '@/services/UserService';
import Image from 'next/image';

const GoogleIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        d="M20.64 12.2045c0-.6382-.0573-1.2518-.1636-1.8409H12v3.4818h4.8436c-.2086 1.125-.8427 2.0782-1.7772 2.7218v2.2582h2.9087c1.7018-1.5668 2.6836-3.8741 2.6836-6.6218z"
        fill="#4285F4"
      />
      <path
        d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2582c-.806.5446-1.8273.8682-3.0477.8682-2.3455 0-4.3282-1.5818-5.0364-3.7104H3.957v2.3318C5.4382 18.9832 8.4818 21 12 21z"
        fill="#34A853"
      />
      <path
        d="M6.9636 13.71c-.18-.5445-.2827-1.1168-.2827-1.71s.1027-1.1655.2827-1.71V7.9582H3.957A8.9965 8.9965 0 003 12c0 1.4545.3477 2.8273.957 4.0418L6.9636 13.71z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.2818c1.3227 0 2.5077.4545 3.4405 1.346l2.5813-2.5814C16.4632 3.5236 14.426 3 12 3 8.4818 3 5.4382 5.0168 3.957 7.9582L6.9636 10.29C7.6718 8.1618 9.6545 6.2818 12 6.2818z"
        fill="#EA4335"
      />
    </g>
  </svg>
);

const RegisterPage = () => {
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Password strength check (min 8 chars, upper, lower, number, special)
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordRegex.test(formData.password)) {
    //   toast.error('Password must be 8+ chars with upper, lower, number, special.');
    //   return;
    // }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const user = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (!user) {
        console.error('Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      toast.success(`Welcome ${user.username}! Your account has been created.`);
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    if (loading2) return;

    setLoading2(true);

    try {
      const response = await googleAuth();
      if (response.success) {
        router.push(response.url);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading2(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-2xl p-8 md:p-12 animate-float">
          <div className="flex flex-col items-center mb-8">
            <div className="w-25 h-25 bg-gradient-to-r from-purple-200 to-purple-400 rounded-xl flex items-center justify-center mb-4">
              <Image className="w-18" src='/images/mascot.png' height={200} width={200} alt='mascot' />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Join CodeDuo
            </h1>
            <p className="text-[var(--color-text)] mt-2">Create an account to start your journey.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="text-sm font-medium text-[var(--color-text)]">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-b border-gray-200 pl-10 py-3 text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-b border-gray-200 pl-10 py-3 text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-[var(--color-text)]">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={isVisiblePassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-b border-gray-200 pl-10 pr-10 py-3 text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="••••••••"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                  title={isVisiblePassword ? "Hide Password" : "Show Password"}
                >
                  {isVisiblePassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-[var(--color-text)]">Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={isVisibleConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-b border-gray-200 pl-10 pr-10 py-3 text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                  placeholder="••••••••"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
                  title={isVisibleConfirmPassword ? "Hide Password" : "Show Password"}
                >
                  {isVisibleConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 cursor-pointer text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-70"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-4">
            <button
              className={`w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg font-medium transition-colors ${!loading2 ? 'text-[var(--color-text)] hover:text-gray-800 hover:bg-gray-50 cursor-pointer' : 'text-gray-400 bg-gray-100 cursor-not-allowed'}`}
              onClick={handleAuth}
              disabled={loading2}
            >
              <GoogleIcon className="w-5 h-5 mr-3" />
              {!loading2 ? 'Sign Up with Google' : 'Loading...'}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-[var(--color-text)]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-purple-500 hover:text-purple-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;