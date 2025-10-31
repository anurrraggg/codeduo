'use client';

import { getUser } from '@/services/UserService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoaderPage from './LoaderPage';
import { Sun, Moon } from 'lucide-react';
import useTheme from '@/services/hooks/useTheme';
import InstallPrompt from './InstallPrompt';

export default function Header() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // custom hook handles html.dark toggling + localStorage
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        try {
            const data = getUser();
            if (data?.id) setUser(data);
        } catch (err) {
            console.error('Error fetching user:', err);
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) return <LoaderPage />;

    const openPage = (link) => {
        router.push(link);
        setIsMenuOpen(false);
    };

    const handleLinkClick = (href) => {
        setIsMenuOpen(false);
        router.push(href);
    };

    return (
        <nav
            style={{
                background: 'var(--background)',
                color: 'var(--foreground)',
                borderBottom: '1px solid var(--color-border-navbar)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                transition: 'background 0.3s, color 0.3s',
            }}
            className="backdrop-blur-md"
        >
            <div className="max-w-7xl mx-auto px-6 py-2">
                <div className="flex items-center justify-between">
                    <Link href="/" className="cursor-pointer">
                        <Image
                            className="w-40"
                            height={10}
                            width={180}
                            src={isDark ? "/icons/logo2.png" : "/icons/logo.png"}
                            alt="logo"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center justify-end space-x-5">
                        <div className="flex items-center space-x-7">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                style={{
                                    background: 'none',
                                    borderRadius: '9999px',
                                    transition: 'transform 0.3s',
                                    cursor: 'pointer',
                                }}
                                className="transform hover:scale-110"
                                aria-label="Toggle color mode"
                            >
                                {isDark ? <Moon size={25} /> : <Sun size={25} />}
                            </button>
                            <InstallPrompt />
                            <Link href="/#features" style={{ transition: 'color 0.2s' }} className="hover:text-[var(--purple-600)]">
                                Features
                            </Link>
                            <Link href="/#how-it-works" style={{ transition: 'color 0.2s' }} className="hover:text-[var(--purple-600)]">
                                How It Works
                            </Link>
                            <Link href="/blogs" style={{ transition: 'color 0.2s' }} className="hover:text-[var(--purple-600)]">
                                Blogs
                            </Link>
                            <Link href="/about" style={{ transition: 'color 0.2s' }} className="hover:text-[var(--purple-600)]">
                                About
                            </Link>
                        </div>

                        <div>
                            {user ? (
                                <button
                                    style={{
                                        background: 'linear-gradient(to right, var(--purple-500), var(--purple-600))',
                                        color: 'var(--white, #fff)',
                                        padding: '0.5rem 1.5rem',
                                        cursor: 'pointer',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                        transition: 'background 0.2s',
                                    }}
                                    onClick={() => openPage('/dashboard')}
                                >
                                    Dashboard
                                </button>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <button
                                        style={{
                                            background: 'var(--white, #fff)',
                                            color: 'var(--purple-500)',
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                            transition: 'background 0.2s, color 0.2s',
                                        }}
                                        onClick={() => openPage('/login')}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        style={{
                                            background: 'linear-gradient(to right, var(--purple-500), var(--purple-600))',
                                            color: 'var(--white, #fff)',
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                        onClick={() => openPage('/register')}
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger Button */}
                    <div className="lg:hidden">
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Open menu"
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden px-6 pt-2 pb-4 flex flex-col items-center space-y-3">
                    <InstallPrompt />
                    <Link href="/#features" onClick={() => handleLinkClick('/#features')} style={{ transition: 'color 0.2s' }} className="block hover:text-[var(--purple-600)]">
                        Features
                    </Link>
                    <Link href="/#how-it-works" onClick={() => handleLinkClick('/#how-it-works')} style={{ transition: 'color 0.2s' }} className="block hover:text-[var(--purple-600)]">
                        How It Works
                    </Link>
                    <Link href="/blogs" onClick={() => handleLinkClick('/blogs')} style={{ transition: 'color 0.2s' }} className="block hover:text-[var(--purple-600)]">
                        Blogs
                    </Link>
                    <Link href="/about" onClick={() => handleLinkClick('/about')} style={{ transition: 'color 0.2s' }} className="block hover:text-[var(--purple-600)]">
                        About
                    </Link>

                    {/* Mobile Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            scale: 'hover:scale-120',
                            transition: 'scale 0.2s',
                        }}
                    >
                        {isDark ? <Moon size={25} /> : <Sun size={25} />}
                    </button>

                    {user ? (
                        <button
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                background: 'linear-gradient(to right, var(--purple-500), var(--purple-600))',
                                color: 'var(--white, #fff)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                            }}
                            onClick={() => openPage('/dashboard')}
                        >
                            Dashboard
                        </button>
                    ) : (
                        <div className="w-full flex flex-col items-center gap-5">
                            <button
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    background: 'var(--white, #fff)',
                                    color: 'var(--purple-500)',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                }}
                                onClick={() => openPage('/login')}
                            >
                                Sign In
                            </button>
                            <button
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    background: 'linear-gradient(to right, var(--purple-500), var(--purple-600))',
                                    color: 'var(--white, #fff)',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                                }}
                                onClick={() => openPage('/register')}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}