'use client';
import { getUser } from '@/services/UserService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoaderPage from './LoaderPage';

function Header() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUser = () => {
            try {
                const data = getUser();

                if (data && data.id) {
                    setUser(data);
                }
            } catch (err) {
                console.error('Error fetching user: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return <LoaderPage />;
    }

    const openPage = (link) => {
        router.push(link);
        setIsMenuOpen(false);
    };

    const handleLinkClick = (href) => {
        setIsMenuOpen(false);
        router.push(href);
    }

    return (
        <nav className={'bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 transition-shadow '}>
            <div className="max-w-7xl mx-auto px-6 py-2">
                <div className="flex items-center justify-between">
                    <Link href='/' className="cursor-pointer">
                        <Image className='w-40' height={10} width={180} src={'/icons/logo.png'} alt="logo" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className='hidden lg:flex items-center justify-end space-x-5'>
                        <div className="flex items-center space-x-7">
                            <Link href="/#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link>
                            <Link href="/#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</Link>
                            <Link href="/blogs" className="text-gray-600 hover:text-purple-600 transition-colors">Blogs</Link>
                            <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
                        </div>
                        <div>
                            {user ? (
                                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm" onClick={() => openPage('/dashboard')}>
                                    Dashboard
                                </button>
                            ) : (
                                <div className='flex items-center space-x-4'>
                                    <button className="bg-white text-purple-500 px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-200 shadow-md" onClick={() => openPage('/login')}>Sign In</button>
                                    <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm" onClick={() => openPage('/register')}>
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Hamburger Button */}
                    <div className="lg:hidden">
                        <button className='cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
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

            {/* 3. Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden px-6 pt-2 pb-4 flex flex-col items-center space-y-3">
                    <Link href="/#features" onClick={() => handleLinkClick('/#features')} className="block text-gray-600 hover:text-purple-600">Features</Link>
                    <Link href="/#how-it-works" onClick={() => handleLinkClick('/#how-it-works')} className="block text-gray-600 hover:text-purple-600">How It Works</Link>
                    <Link href="/blogs" onClick={() => handleLinkClick('/blogs')} className="block text-gray-600 hover:text-purple-600">Blogs</Link>
                    <Link href="/about" onClick={() => handleLinkClick('/about')} className="block text-gray-600 hover:text-purple-600">About</Link>
                    {user ? (
                        <button className="w-full text-center cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm" onClick={() => openPage('/dashboard')}>
                            Dashboard
                        </button>
                    ) : (
                        <div className='w-full flex flex-col items-center gap-5'>
                            <button className="w-full text-center cursor-pointer bg-white text-purple-500 px-4 py-2 rounded-lg shadow-md" onClick={() => openPage('/login')}>Sign In</button>
                            <button className="w-full text-center cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm" onClick={() => openPage('/register')}>
                                Register
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Header;