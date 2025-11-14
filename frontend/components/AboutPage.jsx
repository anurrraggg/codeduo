'use client';
import React from 'react';
import { Target, Lightbulb, ChevronRight } from 'lucide-react';
import { features, teamMembers, values } from '@/context/AboutService';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[var(--background-textured)]">
            {/* Hero Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-6xl font-bold text-[var(--color-text)] mb-6">
                        About <span className="text-purple-600">CodeDuo</span>
                    </h2>
                    <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
                        Revolutionizing programming education through gamified, bite-sized learning experiences
                        that make coding accessible, engaging, and sustainable for everyone.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div 
                        className="rounded-2xl p-8 shadow-lg border border-purple-100"
                        style={{
                            backgroundColor: "rgba(181, 183, 185, 0.1)",
                            color: "var(--foreground)",
                        }}>
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">Our Mission</h3>
                            <p className="text-var(--color-text-secondary)] leading-relaxed">
                                To bridge the gap between complex programming concepts and accessible learning methodologies.
                                We&apos;re committed to transforming programming education from an overwhelming academic pursuit
                                into an enjoyable daily routine that respects learners&apos; time constraints and cognitive load.
                            </p>
                        </div>

                        <div className="rounded-2xl p-8 shadow-lg border border-purple-100"
                        style={{
                            backgroundColor: "rgba(181, 183, 185, 0.1)",
                            color: "var(--foreground)",
                        }}>
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Lightbulb className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">Our Vision</h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                To create a world where programming skills are accessible to individuals of all backgrounds,
                                using proven engagement mechanisms and educational psychology to build sustainable learning habits
                                that lead to long-term success in technology careers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem & Solution */}
            <section className="py-16 bg-gradient-to-r from-[var(--background)] to-[var(--background2)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-[var(--color-text)] mb-4">The Challenge We&apos;re Solving</h3>
                        <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                            Current educational platforms struggle with learner retention and engagement, creating barriers
                            that prevent many aspiring programmers from achieving their goals.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div 
                        className="rounded-2xl p-8 shadow-lg"
                        style={{
                            backgroundColor: "rgba(181, 183, 185, 0.1)",
                            color: "var(--foreground)",
                        }}>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 text-rose-400">The Problem</h4>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className='text-[var(--color-text-secondary)]'>High abandonment rates due to overwhelming content delivery</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className='text-[var(--color-text-secondary)]'>Steep learning curves that intimidate beginners</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className='text-[var(--color-text-secondary)]'>Lack of structured progression and interactive feedback</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className='text-[var(--color-text-secondary)]'>Inconsistent learning habits and decreased motivation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-2xl p-8 shadow-lg text-white"
                        style={{
                            backgroundColor: "rgba(210, 177, 235, 0.28)",
                            color: "var(--foreground)",
                        }}>
                            <h4 className="text-xl font-bold mb-4">Our Solution</h4>
                            <p className="mb-6 opacity-90">
                                CodeDuo transforms programming education using Duolingo&apos;s proven methodology,
                                breaking complex topics into engaging, bite-sized lessons with gamified elements.
                            </p>
                            <div className="flex items-center space-x-2 text-[var(--color-text-secondary)]">
                                <span>Learn more about our approach</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-[var(--color-text)] mb-4">What Makes Us Unique</h3>
                        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                            Our distinctive features set us apart from traditional coding education platforms
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index}
                            className="rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
                            style={{
                            backgroundColor: "rgba(181, 183, 185, 0.1)",
                            color: "var(--foreground)",
                        }}>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2">{feature.title}</h4>
                                <p className="text-[var(--color-text-secondary)] text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-[var(--background2)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-[var(--color-text)] mb-4">Our Core Values</h3>
                        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                            The principles that guide everything we do at CodeDuo
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-bold text-[var(--color-text)] mb-4">{value.title}</h4>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                        Meet the Innovators
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12">
                        The passionate developers and designers behind CodeDuo
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 shadow-md flex items-center justify-center text-white font-bold text-5xl">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h4 className="font-bold text-lg text-[var(--color-text)]">{member.name}</h4>
                                <p className="text-purple-600 font-medium text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Coding Journey?</h3>
                    <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of students who are already learning programming the CodeDuo way.
                        Start with our free demo quiz and experience the difference.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-purple-600 cursor-pointer px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                            Start Demo Quiz
                        </button>
                        <button className="border-2 border-white cursor-pointer text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
