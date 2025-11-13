'use client';
import React from 'react';
import { Clock, Tag, TrendingUp, ChevronRight, Mail, Eye, Heart, Share2 } from 'lucide-react';
import { blogPosts, featuredPost, getCategoryColor, recentPosts } from '@/context/BlogService';
import Link from 'next/link';

const BlogPage = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[var(--background-textured)]">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Featured Post */}
                <section className="mb-12">
                    <div
                        className="rounded-2xl shadow-xl border overflow-hidden"
                        style={{
                            backgroundColor: "rgba(181, 183, 185, 0.1)",
                            borderColor: "rgba(124, 126, 129, 0.3)",
                            color: "var(--foreground)",
                        }}
                    >
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-64 md:h-full object-cover"
                                />
                            </div>
                            <div className="md:w-1/2 p-8">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Featured
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)}`}>
                                        {featuredPost.category}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4 leading-tight">
                                    {featuredPost.title}
                                </h2>

                                <p className="text-[var(--color-text-secondary)] mb-6 text-lg">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{featuredPost.views.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <Link href='/blogs/dsa' className="bg-gradient-to-r from-purple-500 to-purple-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
                                        <span>Read More</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Blog Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {blogPosts.map(post => (
                                <article
                                    key={post.id}
                                    className="rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200 overflow-hidden group"
                                    style={{
                                        backgroundColor: "rgba(181, 183, 185, 0.1)",
                                        borderColor: "rgba(124, 126, 129, 0.3)",
                                        color: "var(--foreground)",
                                    }}
                                >
                                    {/* Wrap the main card content inside the Link */}
                                    <Link href={`/blogs/${post.id}`} className="block relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                                                    post.category
                                                )}`}
                                            >
                                                {post.category}
                                            </span>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                                {post.title}
                                            </h3>

                                            <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-3">{post.excerpt}</p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="bg-[var(--background)] text-[var(--color-text-secondary)] px-2 py-1 rounded text-xs"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Footer with meta + actions */}
                                    <div className="flex items-center justify-between px-6 pb-4">
                                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                <Heart className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </article>

                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                            <Mail className="w-8 h-8 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                            <p className="text-purple-100 text-sm mb-4">
                                Get the latest coding tutorials and tips delivered to your inbox weekly.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 rounded-lg ring-2 ring-white text-white placeholder-white focus:outline-none"
                                />
                                <button className="w-full bg-white cursor-pointer text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="bg-white rounded-xl p-6 border border-purple-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                                Recent Posts
                            </h3>
                            <div className="space-y-4">
                                {recentPosts.map(post => (
                                    <div key={post.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="text-gray-900 font-medium text-sm mb-1 hover:text-purple-600 cursor-pointer transition-colors">
                                                {post.title}
                                            </h4>
                                            <p className="text-gray-500 text-xs">{formatDate(post.date)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="bg-white rounded-xl p-6 border border-purple-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Tag className="w-5 h-5 text-purple-600 mr-2" />
                                Popular Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Arrays', 'Algorithms', 'Dynamic Programming', 'Trees', 'Graphs', 'Sorting', 'Hash Tables', 'Recursion', 'Binary Search', 'Big O', 'Interview'].map(tag => (
                                    <span key={tag} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-100 cursor-pointer transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;