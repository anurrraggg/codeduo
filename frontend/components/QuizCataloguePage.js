import React, { useState } from 'react';
import { Search, Filter, Clock, Users, Trophy, Star, Code, Database, Cpu, Network, Brain, Zap, ChevronRight, BookOpen, Target } from 'lucide-react';
import { quizzes } from '@/services/QuizService';
import { useRouter } from 'next/navigation';

export default function QuizCataloguePage({ quizCategoryId }) {
    const router = useRouter();

    const openQuiz = (id) => {
        router.push(`/quiz/${id}`);
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'text-green-600 bg-green-50 border-green-200';
            case 'Intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Advanced': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">

                    {/* Quiz Grid */}
                    <div className="flex-1">
                        {quizzes.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">No quizzes found</h3>
                                <p className="text-gray-600">Try adjusting your search or filters to find more quizzes.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 cursor-pointer">
                                {quizzes.map((quiz, index) => (
                                    <div
                                        onClick={() => openQuiz(quiz.id)} 
                                        key={index}
                                        className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                                    >
                                        <button onClick={() => openQuiz(quiz.id)} className="flex items-start justify-between mb-4 cursor-pointer">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-purple-700 transition-colors">
                                                        {quiz.title}
                                                    </h3>
                                                    {quiz.isNew && (
                                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                                            New
                                                        </span>
                                                    )}
                                                    {quiz.isPopular && (
                                                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                                                            Popular
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[var(--color-text-secondary)] text-sm mb-3 line-clamp-2">
                                                    {quiz.description}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                        </button>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {quiz.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Quiz Info */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{quiz.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BookOpen className="w-4 h-4" />
                                                    <span>{quiz.questions} questions</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    <span>{quiz.participants.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-medium text-[var(--color-text-secondary)]">{quiz.rating}</span>
                                            </div>
                                        </div>

                                        {/* Bottom Row */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-[var(--color-text-secondary)]">{quiz.category}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(quiz.difficulty)}`}>
                                                    {quiz.difficulty}
                                                </span>
                                            </div>
                                            <button onClick={() => openQuiz(quiz.id)} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                                                Start Quiz
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}