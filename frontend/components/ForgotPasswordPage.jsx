'use client';
import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { requestPasswordReset } from '@/context/UserService';
import { toast } from 'sonner';

const ForgotPasswordPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!email) {
            toast.error('Please enter your email!');
            return; 
        }

        setLoading(true);

        try {
            const result = await requestPasswordReset(email);
            if (result.success) {
                toast.success('If that email exists, we sent a reset link.');
                router.push('/confirm');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-2xl p-8 md:p-12 animate-float">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="w-25 h-25 bg-gradient-to-r from-purple-200 to-purple-400 rounded-xl flex items-center justify-center mb-4">
                            <Image className="w-18" src='/images/mascot.png' height={200} width={200} alt='mascot' />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            Forgot Password?
                        </h1>
                        <p className="text-[var(--color-text)] mt-2">No worries! Enter your email and we&apos;ll send you a reset link.</p>
                    </div>

                    {/* Corrected Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-lg border-b border-gray-200 pl-10 py-3 text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading} // Disable button when loading
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 cursor-pointer text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <div className="mt-8 text-center">
                        <a href="/login" className="font-medium text-purple-500 hover:text-purple-300 flex items-center justify-center group">
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            Back to Sign In
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;