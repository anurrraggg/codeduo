'use client';
import React, { useState } from 'react';
import { Search, Clock, User, Tag, TrendingUp, BookOpen, Code, Calculator, Briefcase, ChevronRight, Mail, Calendar, Eye, Heart, Share2, Filter } from 'lucide-react';

const BlogPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { name: 'All', count: 24, icon: <BookOpen className="w-4 h-4" /> },
        { name: 'Data Structures', count: 8, icon: <Code className="w-4 h-4" /> },
        { name: 'Algorithms', count: 7, icon: <TrendingUp className="w-4 h-4" /> },
        { name: 'Mathematics', count: 5, icon: <Calculator className="w-4 h-4" /> },
        { name: 'Interview Prep', count: 4, icon: <Briefcase className="w-4 h-4" /> }
    ];

    const featuredPost = {
        id: 1,
        title: "Master Dynamic Programming: From Beginner to Pro",
        excerpt: "Learn the fundamentals of dynamic programming with step-by-step examples, starting from the classic Fibonacci sequence to advanced optimization problems.",
        author: "Sarah Chen",
        date: "2024-12-15",
        readTime: "12 min read",
        category: "Algorithms",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        tags: ["Dynamic Programming", "Algorithms", "Optimization"],
        views: 2847,
        featured: true
    };

    const blogPosts = [
        {
            id: 2,
            title: "Understanding Big O Notation: A Visual Guide",
            excerpt: "Demystify algorithm complexity with easy-to-understand examples and visual representations. Perfect for coding interview preparation.",
            author: "Mike Rodriguez",
            date: "2024-12-12",
            readTime: "8 min read",
            category: "Algorithms",
            image: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?w=400&h=250&fit=crop",
            tags: ["Big O", "Complexity", "Algorithms"],
            views: 1923
        },
        {
            id: 3,
            title: "Arrays vs Linked Lists: When to Use Which?",
            excerpt: "Compare the two fundamental data structures, their time complexities, and real-world use cases with practical examples.",
            author: "Emma Thompson",
            date: "2024-12-10",
            readTime: "10 min read",
            category: "Data Structures",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
            tags: ["Arrays", "Linked Lists", "Data Structures"],
            views: 2156
        },
        {
            id: 4,
            title: "Binary Trees: Complete Beginner's Guide",
            excerpt: "Start your journey with binary trees. Learn traversals, operations, and common interview questions step by step.",
            author: "Alex Johnson",
            date: "2024-12-08",
            readTime: "15 min read",
            category: "Data Structures",
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
            tags: ["Binary Trees", "Tree Traversal", "Recursion"],
            views: 1834
        },
        {
            id: 5,
            title: "Graph Theory Basics: DFS and BFS Explained",
            excerpt: "Master graph traversal algorithms with animated examples and real-world applications in social networks and pathfinding.",
            author: "Lisa Wang",
            date: "2024-12-05",
            readTime: "11 min read",
            category: "Algorithms",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
            tags: ["Graphs", "DFS", "BFS", "Traversal"],
            views: 2341
        },
        {
            id: 6,
            title: "Sorting Algorithms Showdown: Which One to Choose?",
            excerpt: "Compare popular sorting algorithms, understand their trade-offs, and learn when to use each one in different scenarios.",
            author: "David Park",
            date: "2024-12-03",
            readTime: "9 min read",
            category: "Algorithms",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
            tags: ["Sorting", "Algorithms", "Performance"],
            views: 1756
        },
        {
            id: 7,
            title: "Hash Tables: The Magic Behind Fast Lookups",
            excerpt: "Understand how hash tables work, handle collisions, and implement your own hash table from scratch with Python examples.",
            author: "Rachel Green",
            date: "2024-12-01",
            readTime: "13 min read",
            category: "Data Structures",
            image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=250&fit=crop",
            tags: ["Hash Tables", "Hashing", "Data Structures"],
            views: 2089
        },
        {
            id: 8,
            title: "Top 10 Coding Interview Questions for 2024",
            excerpt: "Practice the most commonly asked coding interview questions at top tech companies, with detailed solutions and explanations.",
            author: "Jordan Smith",
            date: "2024-11-28",
            readTime: "20 min read",
            category: "Interview Prep",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
            tags: ["Interview", "Coding Questions", "Tech Jobs"],
            views: 3124
        },
        {
            id: 9,
            title: "Mathematical Foundations for Programmers",
            excerpt: "Essential math concepts every programmer should know: discrete math, probability, statistics, and their applications in coding.",
            author: "Kevin Liu",
            date: "2024-11-25",
            readTime: "14 min read",
            category: "Mathematics",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
            tags: ["Mathematics", "Discrete Math", "Probability"],
            views: 1567
        },
        {
            id: 10,
            title: "Stacks and Queues: Real-World Applications",
            excerpt: "Learn about stacks and queues through practical examples like browser history, function calls, and task scheduling.",
            author: "Anna Martinez",
            date: "2024-11-22",
            readTime: "7 min read",
            category: "Data Structures",
            image: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=400&h=250&fit=crop",
            tags: ["Stacks", "Queues", "LIFO", "FIFO"],
            views: 1432
        },
        {
            id: 11,
            title: "Recursion Made Simple: Think Like a Computer",
            excerpt: "Master recursive thinking with visual explanations, common patterns, and practice problems that build your intuition.",
            author: "Tom Wilson",
            date: "2024-11-20",
            readTime: "12 min read",
            category: "Algorithms",
            image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=400&h=250&fit=crop",
            tags: ["Recursion", "Problem Solving", "Algorithms"],
            views: 1889
        },
        {
            id: 12,
            title: "Binary Search: More Than Just Searching",
            excerpt: "Discover the power of binary search beyond simple array lookups. Learn advanced techniques and optimization problems.",
            author: "Sophie Brown",
            date: "2024-11-18",
            readTime: "10 min read",
            category: "Algorithms",
            image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop",
            tags: ["Binary Search", "Optimization", "Divide and Conquer"],
            views: 1634
        }
    ];

    const recentPosts = [
        { id: 13, title: "Greedy Algorithms: When Being Selfish Works", date: "2024-12-14" },
        { id: 14, title: "Understanding Time and Space Complexity", date: "2024-12-11" },
        { id: 15, title: "Two Pointers Technique: Double the Efficiency", date: "2024-12-07" },
        { id: 16, title: "Backtracking: Exploring All Possibilities", date: "2024-12-04" },
        { id: 17, title: "Heap Data Structure: Priority Made Easy", date: "2024-12-02" }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Data Structures': return 'bg-blue-100 text-blue-700';
            case 'Algorithms': return 'bg-green-100 text-green-700';
            case 'Mathematics': return 'bg-purple-100 text-purple-700';
            case 'Interview Prep': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Featured Post */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
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

                                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {featuredPost.title}
                                </h2>

                                <p className="text-gray-600 mb-6 text-lg">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{featuredPost.views.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
                                        <span>Read More</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
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
                            {filteredPosts.map(post => (
                                <article key={post.id} className="bg-white rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-200 overflow-hidden group">
                                    <div className="relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
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

                        {/* Stats */}
                        <div className="bg-white rounded-xl p-6 border border-purple-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Articles</span>
                                    <span className="font-bold text-gray-900">24</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Views</span>
                                    <span className="font-bold text-gray-900">47.2K</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subscribers</span>
                                    <span className="font-bold text-gray-900">1,284</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;