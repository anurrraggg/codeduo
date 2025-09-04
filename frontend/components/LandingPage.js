'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const LandingPage = () => {
    const router = useRouter();

    const openPage = (link) => {
        router.push(link);
    }
    return (
        <div>
            {/* Hero Section */}
            <section className="pt-20 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="mb-6">
                                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                                    🎯 Perfect for Coding Students
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Master Coding Through
                                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent block">
                                    Gamified Quizzes
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Challenge yourself with interactive MCQ quizzes on algorithms, data structures, and more.
                                Track your progress, compete with peers, and level up your coding skills.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => openPage('/dashboard')} className="bg-gradient-to-r cursor-pointer from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 6l3 3m0 0l3-3m-3 3V2m0 16v-4"></path>
                                    </svg>
                                    <span>Start Demo Quiz</span>
                                </button>
                                <button onClick={() => openPage('/about')} className="bg-white cursor-pointer text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-purple-200 hover:border-purple-300 transition-all duration-200 flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Learn More</span>
                                </button>
                            </div>
                            {/* <div className="mt-12 flex items-center space-x-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">500+</div>
                                    <div className="text-gray-600">Practice Questions</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">15+</div>
                                    <div className="text-gray-600">Topics Covered</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">100%</div>
                                    <div className="text-gray-600">Free to Use</div>
                                </div>
                            </div> */}
                        </div>
                        <div className="relative">
                            <div className="animate-float">
                                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Dynamic Programming Quiz</h3>
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">Hard</span>
                                    </div>
                                    <div className="mb-6">
                                        <div className="text-sm text-gray-600 mb-2">Progress: 7/10 questions</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                            <p className="text-gray-800 font-medium">What is the time complexity of the optimal solution for the 0/1 Knapsack problem?</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                                <input type="radio" name="answer" className="mr-3 text-purple-600" disabled />
                                                <span>O(n²)</span>
                                            </label>
                                            <label className="flex items-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300 cursor-pointer">
                                                <input type="radio" name="answer" className="mr-3 text-purple-600" defaultChecked />
                                                <span className="font-medium">O(n x W)</span>
                                            </label>
                                            <label className="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                                <input type="radio" name="answer" className="mr-3 text-purple-600" disabled />
                                                <span>O(2ⁿ)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg mt-6 font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                                        Next Question →
                                    </button>
                                </div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse-slow"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse-slow"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CodeDuo?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to master coding concepts and compete with fellow developers
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200 group">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Tracking</h3>
                            <p className="text-gray-600">Monitor your improvement with detailed analytics, score history, and personalized insights on your coding journey.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200 group">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Compete with Others</h3>
                            <p className="text-gray-600">Challenge friends and global community. Climb leaderboards and earn achievements as you master coding concepts.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200 group">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Topics</h3>
                            <p className="text-gray-600">From algorithms to system design, cover all essential coding topics with carefully curated questions and explanations.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200 group">
                            <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Feedback</h3>
                            <p className="text-gray-600">Get immediate explanations for every question. Learn from mistakes and understand concepts with detailed solutions.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200 group">
                            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Difficulty Levels</h3>
                            <p className="text-gray-600">Start with basics and gradually advance. Choose from Easy, Medium, and Hard questions tailored to your skill level.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200 group">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Free</h3>
                            <p className="text-gray-600">Access all features completely free. No hidden costs, no premium tiers. Just pure learning and competition.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 gradient-bg">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get started in minutes and begin your coding mastery journey
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Topic</h3>
                            <p className="text-gray-600">Select from 15+ coding topics including algorithms, data structures, dynamic programming, and more.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Take Interactive Quizzes</h3>
                            <p className="text-gray-600">Answer MCQ questions with instant feedback and detailed explanations to reinforce your learning.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Track & Compete</h3>
                            <p className="text-gray-600">Monitor your progress, climb leaderboards, and compete with developers worldwide to stay motivated.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
                        <p className="text-xl text-gray-600">Join thousands of students improving their coding skills</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-purple-50 p-8 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                    <span className="text-purple-700 font-semibold">AS</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900">Alex Smith</h4>
                                    <p className="text-gray-600 text-sm">Computer Science Student</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"CodeDuo helped me ace my algorithms course! The competitive element kept me motivated, and I improved my problem-solving speed significantly."</p>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                                    <span className="text-blue-700 font-semibold">MJ</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900">Maria Johnson</h4>
                                    <p className="text-gray-600 text-sm">Bootcamp Graduate</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"The progress tracking feature is amazing! I can see exactly where I need to improve. Got my dream job thanks to the interview prep quizzes."</p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-2xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                                    <span className="text-green-700 font-semibold">RK</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900">Raj Kumar</h4>
                                    <p className="text-gray-600 text-sm">Self-taught Developer</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"Perfect for self-study! The explanations are clear, and competing with others made learning fun. Highly recommend for coding beginners."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600">Everything you need to know about CodeDuo</p>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is CodeDuo really free?</h3>
                            <p className="text-gray-700">Yes! CodeDuo is completely free to use. Access all quizzes, track your progress, compete on leaderboards, and use all features without any cost.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What topics are covered?</h3>
                            <p className="text-gray-700">We cover 15+ essential coding topics including Data Structures, Algorithms, Dynamic Programming, Backtracking, Graph Algorithms, System Design, and more.</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the competition work?</h3>
                            <p className="text-gray-700">Compete with students globally through our leaderboard system. Earn points for correct answers, maintain streaks, and climb rankings based on your quiz performance.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to create an account?</h3>
                            <p className="text-gray-700">While you can try demo quizzes without an account, creating one lets you track progress, save scores, and compete on leaderboards.</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Are the questions suitable for beginners?</h3>
                            <p className="text-gray-700">Absolutely! We have questions for all skill levels - Easy, Medium, and Hard. Start with basics and gradually challenge yourself with advanced concepts.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">How often are new questions added?</h3>
                            <p className="text-gray-700">We regularly add new questions and update existing ones. Our community of developers helps ensure content stays current and relevant.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Level Up Your Coding Skills?</h2>
                    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students already mastering algorithms, data structures, and more through gamified learning.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => openPage('/dashboard')} className="bg-white cursor-pointer text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 6l3 3m0 0l3-3m-3 3V2m0 16v-4"></path>
                            </svg>
                            <span>Start Your First Quiz</span>
                        </button>
                        <button onClick={() => openPage('/about')} className="bg-transparent cursor-pointer text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            <span>Join Community</span>
                        </button>
                    </div>
                    <div className="mt-12 flex items-center justify-center space-x-8 text-purple-200">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">500+</div>
                            <div className="text-sm">Questions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">15+</div>
                            <div className="text-sm">Topics</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">$0</div>
                            <div className="text-sm">Cost</div>
                        </div>
                    </div>
                </div>
            </section>            
        </div>
    );
};

export default LandingPage;