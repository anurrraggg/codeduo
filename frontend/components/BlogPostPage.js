'use client';
import React, { useState } from 'react';
import {
    ArrowLeft,
    Clock,
    Eye,
    Heart,
    Share2,
    Bookmark,
    User,
    Calendar,
    Tag,
    MessageCircle,
    ThumbsUp,
    ChevronRight,
    Mail,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { post, relatedPosts } from '@/services/BlogPostPage';
import { recentPosts } from '@/services/BlogService';

const BlogPostPage = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likes, setLikes] = useState(247);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Algorithms': 'bg-blue-100 text-blue-800',
            'Data Structures': 'bg-green-100 text-green-800',
            'System Design': 'bg-orange-100 text-orange-800',
            'Interview Prep': 'bg-purple-100 text-purple-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-3">
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden mb-8">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-8">
                                {/* Category and Meta */}
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                                        {post.category}
                                    </span>
                                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(post.publishedDate)}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{post.views.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                    {post.title}
                                </h1>

                                {/* Author */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                                            <p className="text-sm text-gray-600">{post.author.bio}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={handleLike}
                                            className={`p-2 rounded-lg transition-colors ${isLiked
                                                ? 'text-red-500 bg-red-50'
                                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                                }`}
                                        >
                                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                        </button>
                                        <button
                                            onClick={() => setIsSaved(!isSaved)}
                                            className={`p-2 rounded-lg transition-colors ${isSaved
                                                ? 'text-purple-600 bg-purple-50'
                                                : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                                                }`}
                                        >
                                            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8">
                            <div
                                className="prose prose-lg max-w-none prose-purple"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                                style={{
                                    '--tw-prose-headings': '#1f2937',
                                    '--tw-prose-links': '#7c3aed',
                                    '--tw-prose-code': '#374151',
                                    '--tw-prose-pre-bg': '#1f2937'
                                }}
                            />

                            {/* Tags */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-100 cursor-pointer transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Engagement Stats */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <ThumbsUp className="w-4 h-4" />
                                            <span>{likes} likes</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>23 comments</span>
                                        </div>
                                    </div>
                                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                                        Share this post
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map(relatedPost => (
                                    <Link href={`/blogs/${relatedPost.id}`} key={relatedPost.id} className="bg-white rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 overflow-hidden group cursor-pointer">
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            width={1000}
                                            height={1000}
                                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedPost.category)} mb-2 inline-block`}>
                                                {relatedPost.category}
                                            </span>
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="w-3 h-3 mr-1" />
                                                <span>{relatedPost.readTime}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white top-6">
                            <Mail className="w-8 h-8 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                            <p className="text-purple-100 text-sm mb-4">
                                Get the latest coding tutorials and tips delivered to your inbox weekly.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
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
                                {recentPosts.map(recentPost => (
                                    <Link key={recentPost.id} href={`/blogs/${recentPost.id}`}>
                                        <div className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div>
                                                <h4 className="text-gray-900 font-medium text-sm mb-1 hover:text-purple-600 cursor-pointer transition-colors">
                                                    {recentPost.title}
                                                </h4>
                                                <p className="text-gray-500 text-xs">{formatDate(recentPost.date)}</p>
                                            </div>
                                        </div>
                                    </Link>
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
                                {['Arrays', 'Algorithms', 'Dynamic Programming', 'Trees', 'Graphs', 'Sorting', 'Hash Tables', 'Recursion', 'Binary Search', 'Big O'].map(tag => (
                                    <span key={tag} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-100 cursor-pointer transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;