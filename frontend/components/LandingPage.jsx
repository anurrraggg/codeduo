'use client';
import { getUser } from '@/context/UserService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoaderPage from './LoaderPage';
import { testimonials } from '@/context/TestimonialService';

const LandingPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const cards = [
        {
            title: "Progress Tracking",
            description:
                "Monitor your improvement with detailed analytics, score history, and personalized insights on your coding journey.",
            iconColor: "purple",
            iconPath:
                "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z",
        },
        {
            title: "Compete with Others",
            description:
                "Challenge friends and global community. Climb leaderboards and earn achievements as you master coding concepts.",
            iconColor: "blue",
            iconPath:
                "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        },
        {
            title: "Comprehensive Topics",
            description:
                "From algorithms to system design, cover all essential coding topics with carefully curated questions and explanations.",
            iconColor: "green",
            iconPath:
                "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        },
        {
            title: "Instant Feedback",
            description:
                "Get immediate explanations for every question. Learn from mistakes and understand concepts with detailed solutions.",
            iconColor: "yellow",
            iconPath:
                "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            title: "Multiple Difficulty Levels",
            description:
                "Start with basics and gradually advance. Choose from Easy, Medium, and Hard questions tailored to your skill level.",
            iconColor: "red",
            iconPath:
                "M13 10V3L4 14h7v7l9-11h-7z",
        },
        {
            title: "100% Free",
            description:
                "Access all features completely free. No hidden costs, no premium tiers. Just pure learning and competition.",
            iconColor: "purple",
            iconPath:
                "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ];

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
    }, []);

    if (loading) {
        return <LoaderPage />;
    }

    const openPage = (link) => {
        router.push(link);
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <div>
            <section className="pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                                Master Coding Through
                                <span className="bg-gradient-to-r from-[var(--color-text-hero2)] to-[var(--color-text-hero3)] bg-clip-text text-transparent block">
                                    Gamified Quizzes
                                </span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-xl text-[var(--foreground)] mb-8 leading-relaxed">
                                Challenge yourself with interactive MCQ quizzes on algorithms, data structures, and more. Track your progress, compete with peers, and level up your coding skills.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => openPage('/quiz/0')} className="bg-gradient-to-r cursor-pointer from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                                    <span>Start Demo Quiz</span>
                                </button>
                                <button onClick={() => openPage('/about')} className="bg-white cursor-pointer text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-purple-200 hover:border-purple-300 transition-all duration-200 flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Learn More</span>
                                </button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="relative flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 1,
                                    ease: "easeOut"
                                }
                            }}
                        >
                            {/* Mascot Jumping in Place */}
                            <motion.img
                                src="/images/mascot3.png"
                                alt="Animated Purple Robot"
                                className="w-90 h-auto cursor-pointer hover:scale-[1.2] transition-all duration-200"
                                animate={{
                                    y: [0, -40, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Background shapes stay anima</div>ted */}
                            <motion.div
                                className="absolute -top-6 right-16 -z-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute bottom-18 left-5 -z-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute -bottom-8 left-10 -z-10 w-32 h-32 bg-gradient-to-r from-[var(--color-text-heroObj)] to-[var(--color-text-heroObj2)] rounded-full opacity-10"
                                animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute bottom-8 right-20 -z-10 w-32 h-32 bg-gradient-to-r from-[var(--color-text-heroObj)] to-[var(--color-text-heroObj2)] rounded-full opacity-10"
                                animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.35, 0.1] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>


                    </div>
                </div>
            </section>

            <motion.section id="features" className="py-20 bg-[var(--background)]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">Why Choose CodeDuo?</h2>
                        <p className="text-xl text-[var(--foreground)] max-w-3xl mx-auto">Everything you need to master coding concepts and compete with fellow developers</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl border backdrop-blur-lg shadow-lg transition-all duration-200 group"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)", // glass effect
                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                    color: "var(--foreground)",
                                }}
                            >
                                <div
                                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors`}
                                    style={{
                                        backgroundColor: `rgba(var(--${card.iconColor}-500-rgb), 0.2)`,
                                    }}
                                >
                                    <svg
                                        className={`w-8 h-8 text-[var(--${card.iconColor}-500)]`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={card.iconPath}
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--foreground)" }}>
                                    {card.title}
                                </h3>
                                <p style={{ color: "var(--foreground)" }}>{card.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section id="how-it-works" className="py-20 gradient-bg" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">How It Works</h2>
                        <p className="text-xl text-[var(--foreground)] max-w-3xl mx-auto">Get started in minutes and begin your coding mastery journey</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Choose Your Topic</h3>
                            <p className="text-[var(--foreground)]">Select from 15+ coding topics including algorithms, data structures, dynamic programming, and more.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Take Interactive Quizzes</h3>
                            <p className="text-[var(--foreground)]">Answer MCQ questions with instant feedback and detailed explanations to reinforce your learning.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Track & Compete</h3>
                            <p className="text-[var(--foreground)]">Monitor your progress, climb leaderboards, and compete with developers worldwide to stay motivated.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.section className="py-20 bg-[var(--background)]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">What Students Say</h2>
                        <p className="text-xl text-[var(--foreground)]">Join thousands of students improving their coding skills</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testi, index) => {
                            // Map the Tailwind color names to CSS variable RGB for background
                            const bgColor = `rgba(var(--${testi.color}-500-rgb), 0.1)`; // light translucent bg
                            const textColor = `var(--${testi.color}-500)`; // text color

                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="p-8 rounded-2xl"
                                    style={{
                                        backgroundColor: bgColor,
                                        color: "var(--foreground)",
                                    }}
                                >
                                    <div className="flex items-center mb-4">
                                        <div
                                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                                            style={{ color: textColor }}
                                        >
                                            <span className="font-semibold">{testi.profile}</span>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-[var(--foreground)]">{testi.name}</h4>
                                            <p className="text-[var(--foreground)] text-sm">{testi.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-[var(--foreground)] italic">&ldquo;{testi.review}&rdquo;</p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </motion.section>

            <motion.section id="faq" className="py-20 bg-[var(--background)]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-[var(--foreground)]">Everything you need to know about CodeDuo</p>
                    </motion.div>
                    <div className="space-y-6">
                        <motion.div
                            variants={fadeInUp}
                            className="rounded-xl p-6 border backdrop-blur-lg transition-all duration-200"
                            style={{
                                backgroundColor: "rgba(168, 85, 247, 0.1)", // purple-500 with glass effect
                                borderColor: "rgba(168, 85, 247, 0.3)",
                                color: "var(--foreground)",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2">Is CodeDuo really free?</h3>
                            <p>
                                Yes! CodeDuo is completely free to use. Access all quizzes, track your
                                progress, compete on leaderboards, and use all features without any cost.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="rounded-xl p-6 border backdrop-blur-lg transition-all duration-200"
                            style={{
                                backgroundColor: "rgba(181, 183, 185, 0.1)", // gray-200 glass effect
                                borderColor: "rgba(124, 126, 129, 0.3)",
                                color: "var(--foreground)",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2">What topics are covered?</h3>
                            <p>
                                We cover 15+ essential coding topics including Data Structures, Algorithms,
                                Dynamic Programming, Backtracking, Graph Algorithms, System Design, and more.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="rounded-xl p-6 border backdrop-blur-lg transition-all duration-200"
                            style={{
                                backgroundColor: "rgba(168, 85, 247, 0.1)", // purple-500 glass effect
                                borderColor: "rgba(168, 85, 247, 0.3)",
                                color: "var(--foreground)",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2">How does the competition work?</h3>
                            <p>
                                Compete with students globally through our leaderboard system. Earn points for
                                correct answers, maintain streaks, and climb rankings based on your quiz
                                performance.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="rounded-xl p-6 border backdrop-blur-lg transition-all duration-200"
                            style={{
                                backgroundColor: "rgba(181, 183, 185, 0.1)", // gray-200 glass effect
                                borderColor: "rgba(124, 126, 129, 0.3)",
                                color: "var(--foreground)",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2">Do I need to create an account?</h3>
                            <p>
                                While you can try demo quizzes without an account, creating one lets you
                                track progress, save scores, and compete on leaderboards.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </motion.section>

            <motion.section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-4">Ready to Level Up Your Coding Skills?</motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Join thousands of students already mastering algorithms, data structures, and more through gamified learning.</motion.p>
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={user ? '/dashboard' : '/login'} className="bg-white cursor-pointer text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
                            <span>Start Your First Quiz</span>
                        </Link>
                        <button onClick={() => openPage('/about')} className="bg-transparent cursor-pointer text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            <span>Join Community</span>
                        </button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default LandingPage;