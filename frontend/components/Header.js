'use client';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

function Header() {
    const router = useRouter();

    const openPage = (link) => {
        router.push(link);
    };
    return (
        <nav className={'bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 transition-shadow '}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <button onClick={() => openPage('/')} className="flex items-center space-x-3 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                            CodeDuo
                        </h1>
                    </button>
                    <div className='flex items-center justify-end space-x-5'>
                        <div className="hidden md:flex items-center space-x-7">
                            <Link href="/#features" className="text-gray-600 hover:text-purple-600 transition-colors">Featues</Link>
                            <Link href="/#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</Link>
                            <Link href="/blogs" className="text-gray-600 hover:text-purple-600 transition-colors">Blogs</Link>
                            <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors cursor-pointer" onClick={() => openPage('/login')}>Sign In</button>
                            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm"  onClick={() => openPage('/register')}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;