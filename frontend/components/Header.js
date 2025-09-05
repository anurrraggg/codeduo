'use client';
import Image from 'next/image';
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
            <div className="max-w-7xl mx-auto px-6 py-2">
                <div className="flex items-center justify-between">
                    <button onClick={() => openPage('/')} className="cursor-pointer">
                        <Image className='w-40' height={10} width={180} src={'/icons/logo.png'} alt="logo" />
                    </button>
                    <div className='flex items-center justify-end space-x-5'>
                        <div className="hidden md:flex items-center space-x-7">
                            <Link href="/#features" className="text-gray-600 hover:text-purple-600 transition-colors">Featues</Link>
                            <Link href="/#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</Link>
                            <Link href="/blogs" className="text-gray-600 hover:text-purple-600 transition-colors">Blogs</Link>
                            <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-white text-purple-500 px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-200 shadow-md" onClick={() => openPage('/login')}>Sign In</button>
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