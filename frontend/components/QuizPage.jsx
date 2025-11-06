import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Clock, Target, Trophy, Share2, Home, RotateCcw,
    CheckCircle, XCircle, Zap, Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getQuestionsForQuiz } from '@/services/QuizService';
import Image from 'next/image';
import Villain from './ui/Villain';
import Hero from './ui/Hero';
import LaserBeam from './ui/LaserBeam';
import LoaderPage from './LoaderPage';
import useTheme from '@/services/hooks/useTheme';
import Link from 'next/link';

const QuizPage = ({ quizId }) => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // For MCQ
    const [selectedTiles, setSelectedTiles] = useState([]); // For TILE
    const [answerSubmitted, setAnswerSubmitted] = useState(false); // Controls "Check/Continue"
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { isDark } = useTheme();
    const questions = useMemo(() => getQuestionsForQuiz(quizId), [quizId]);

    // States and refs for the laser beam animation
    const [showLaser, setShowLaser] = useState(false);
    const [laserStyle, setLaserStyle] = useState({});
    const heroRef = useRef(null);
    const villainRef = useRef(null);

    // --- AUDIO refs
    const bgmRef = useRef(null);
    const [soundReady, setSoundReady] = useState(false);

    const enableSound = () => {
        if (!soundReady) {
            bgmRef.current = new Audio('/sounds/bgm.mp3');
            bgmRef.current.loop = true;
            bgmRef.current.volume = 0.03;
            bgmRef.current.play();
            setSoundReady(true);
        }
    };

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0 && !isQuizComplete && !showResults && !answerSubmitted) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !isQuizComplete && !answerSubmitted) {
            handleCheckAnswer();
        }
    }, [timeLeft, isQuizComplete, showResults, answerSubmitted]);

    useEffect(() => {
        const loadTimer = setTimeout(() => setIsLoading(false), 1500);
        return () => {
            clearTimeout(loadTimer);
            if (bgmRef.current) {
                bgmRef.current.pause();
                bgmRef.current.currentTime = 0;
            }
        };
    }, []);

    // Effect to calculate laser position
    useEffect(() => {
        if (showLaser && heroRef.current && villainRef.current) {
            const heroRect = heroRef.current.getBoundingClientRect();
            const villainRect = villainRef.current.getBoundingClientRect();
            const startX = villainRect.left + villainRect.width / 2;
            const startY = villainRect.top + villainRect.height / 2;
            const endX = heroRect.left + heroRect.width / 2;
            const endY = heroRect.top + heroRect.height / 2;
            const distance = Math.hypot(endX - startX, endY - startY);
            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
            setLaserStyle({
                position: 'absolute',
                left: `${startX}px`,
                top: `${startY}px`,
                width: `${distance}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0% 50%',
            });
        }
    }, [showLaser]);

    // Helper to play short effects
    const playEffect = (file) => {
        if (!soundReady) return;
        const s = new Audio(file);
        s.volume = 1;
        s.play();
    };

    const handleMCQSelect = (answerIndex) => {
        if (answerSubmitted) return;
        setSelectedAnswer(answerIndex);
        setSelectedTiles([]);
    };

    const handleSelectTile = (tileText, index) => {
        if (answerSubmitted) return;
        setSelectedAnswer(null);
        setSelectedTiles([...selectedTiles, { text: tileText, index: index }]);
    };

    const handleDeselectTile = (arrayIndex) => {
        if (answerSubmitted) return;
        setSelectedTiles(selectedTiles.filter((_, i) => i !== arrayIndex));
    };

    const handleCheckAnswer = () => {
        if (answerSubmitted) return;

        const currentQ = questions[currentQuestion];
        let isCorrect = false;
        let userAnswerData = {};

        if (currentQ.type === 'MCQ') {
            isCorrect = selectedAnswer === currentQ.correctAnswer;
            userAnswerData = { selected: selectedAnswer, correct: currentQ.correctAnswer };
        } else if (currentQ.type === 'TILE') {
            const builtAnswer = selectedTiles.map(t => t.text).join(' ');
            isCorrect = builtAnswer === currentQ.correctAnswer;
            userAnswerData = { selected: builtAnswer, correct: currentQ.correctAnswer };
        } else {
            isCorrect = false;
            userAnswerData = { selected: null, correct: currentQ.correctAnswer };
        }

        setAnswerSubmitted(true);

        const newAnswer = {
            questionId: currentQ.id,
            ...userAnswerData,
            isCorrect,
            timeRemaining: timeLeft
        };
        setUserAnswers(prevAnswers => [...prevAnswers, newAnswer]);

        if (isCorrect) {
            playEffect('/sounds/correct.mp3');
            const newStreak = streak + 1;
            setStreak(newStreak);
            setMaxStreak(Math.max(maxStreak, newStreak));
            const newMultiplier = Math.min(Math.floor(newStreak / 3) + 1, 5);
            setMultiplier(newMultiplier);
            const timeBonus = Math.floor(timeLeft / 5);
            const points = (100 + timeBonus) * newMultiplier;
            setScore(score + points);
            setCorrect(true);
            setTimeout(() => setCorrect(false), 1000);
        } else {
            playEffect('/sounds/wrong.mp3');
            setStreak(0);
            setMultiplier(1);
            setShowLaser(true);
            setTimeout(() => setShowLaser(false), 1000);
        }

        // --- NEW: Auto-advance after 3 seconds ---
        setTimeout(() => {
            handleNextQuestion();
        }, 3000); // 3000ms = 3 seconds
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setSelectedTiles([]);
            setAnswerSubmitted(false);
            setTimeLeft(30);
            setCorrect(false);
            setShowLaser(false);
        } else {
            setIsQuizComplete(true);
            setTimeout(() => setShowResults(true), 1000);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setSelectedTiles([]);
        setAnswerSubmitted(false);
        setScore(0);
        setTimeLeft(30);
        setIsQuizComplete(false);
        setUserAnswers([]);
        setStreak(0);
        setMaxStreak(0);
        setMultiplier(1);
        setShowResults(false);
        if (bgmRef.current) bgmRef.current.currentTime = 0;
    };

    const getScoreGrade = () => {
        const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
        const percentage = (correctAnswers / questions.length) * 100;
        if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50' };
        if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
        if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
        if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
        return { grade: 'D', color: 'text-red-600', bg: 'bg-red-50' };
    };

    const openPage = (link) => router.push(link);

    const shareScore = () => {
        const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
        const percentage = Math.round((correctAnswers / questions.length) * 100);
        const text = `🎯 Just scored ${percentage}% on CodeDuo's DSA quiz! Max streak: ${maxStreak} 🔥`;
        if (navigator.share) {
            navigator.share({ title: 'CodeDuo Quiz Results', text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text);
            alert('Score copied to clipboard!');
        }
    };

    if (isLoading) return <LoaderPage />;

    if (!soundReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
                <div className="text-center p-6 md:p-8 bg-white/10 rounded-2xl shadow-xl border border-purple-100/20 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                        Data Structures & Algorithms Quiz
                    </h1>
                    <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
                        Test your knowledge of essential DSA concepts. Answer quickly and accurately to earn points and climb the leaderboard!
                    </p>
                    <button
                        onClick={enableSound}
                        className="px-8 py-4 bg-purple-600 text-white rounded-xl text-lg font-semibold cursor-pointer hover:bg-purple-700 transition">
                        Start Quiz
                    </button>
                </div>
            </div>
        );
    }

    if (showResults) {
        const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
        const percentage = Math.round((correctAnswers / questions.length) * 100);
        const scoreGrade = getScoreGrade();

        return (
            <div className="min-h-screen bg-[var(--background)] py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <Link href="/" className="cursor-pointer">
                                <Image
                                    className="w-15"
                                    height={180}
                                    width={180}
                                    src="/images/mascot-smug.png"
                                    alt="logo"
                                />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-[var(--color-text-secondary)]">Quiz Complete!</h1>
                                <p className="text-[var(--color-text)]">Data Structures & Algorithms</p>
                            </div>
                        </div>
                    </div>

                    {/* Results Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-12 text-center">
                            <div className={`inline-flex items-center justify-center w-20 h-20 ${scoreGrade.bg} rounded-full mb-4`}>
                                <span className={`text-3xl font-bold ${scoreGrade.color}`}>{scoreGrade.grade}</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">{percentage}%</h2>
                            <p className="text-purple-100 text-lg">
                                {correctAnswers} out of {questions.length} questions correct
                            </p>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center p-4 bg-purple-50 rounded-xl">
                                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-900">{score.toLocaleString()}</div>
                                    <div className="text-gray-600 text-sm">Total Points</div>
                                </div>

                                <div className="text-center p-4 bg-orange-50 rounded-xl">
                                    <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-900">{maxStreak}</div>
                                    <div className="text-gray-600 text-sm">Max Streak</div>
                                </div>

                                <div className="text-center p-4 bg-blue-50 rounded-xl">
                                    <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-900">#24</div>
                                    <div className="text-gray-600 text-sm">Your Rank</div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={shareScore}
                                    className="bg-gradient-to-r cursor-pointer from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                    <span>Share Score</span>
                                </button>

                                <button
                                    onClick={restartQuiz}
                                    className="bg-white text-purple-600 cursor-pointer px-6 py-3 rounded-lg font-semibold border-2 border-purple-200 hover:border-purple-300 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    <span>Try Again</span>
                                </button>

                                <button
                                    onClick={() => openPage('/dashboard')}
                                    className="bg-gray-100 cursor-pointer text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <Home className="w-5 h-5" />
                                    <span>Dashboard</span>
                                </button>
                            </div>
                        </div>

                        {/* Leaderboard */}
                        <div className="bg-white rounded-xl border border-purple-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                                Global Leaderboard
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { rank: 1, name: 'Sarah Chen', score: 18420, streak: 15, avatar: 'SC' },
                                    { rank: 2, name: 'Mike Rodriguez', score: 17850, streak: 12, avatar: 'MR' },
                                    { rank: 3, name: 'Emma Thompson', score: 17200, streak: 10, avatar: 'ET' },
                                    { rank: 24, name: 'You', score: score, streak: maxStreak, avatar: 'YU', isUser: true },
                                    { rank: 25, name: 'Alex Johnson', score: score - 150, streak: maxStreak - 1, avatar: 'AJ' }
                                ].map((user, index) => (
                                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${user.isUser ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'}`}>
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                user.rank === 2 ? 'bg-gray-100 text-gray-700' :
                                                    user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                                        user.isUser ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {user.rank}
                                            </div>
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-purple-600">{user.avatar}</span>
                                            </div>
                                            <div>
                                                <div className={`font-semibold ${user.isUser ? 'text-purple-700' : 'text-gray-800'}`}>
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500">Streak: {user.streak}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-800">{user.score.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">points</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isQuizComplete) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">Quiz Complete!</h2>
                    <p className="text-[var(--color-text)]">Calculating your results...</p>
                </div>
            </div>
        );
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentQ = questions[currentQuestion];
    const isCurrentAnswerCorrect = userAnswers.find(a => a.questionId === currentQ.id)?.isCorrect;

    return (
        <div className="relative flex flex-col md:flex-row justify-center items-end min-h-screen bg-[var(--background)] overflow-hidden z-10">
            {showLaser && <LaserBeam style={laserStyle} />}

            <div className="flex-1 hidden w-full lg:flex flex-col justify-center items-center">
                <div className="relative left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none z-0">
                    <div className="w-56 h-56 rounded-full bg-purple-300 opacity-45 blur-3xl"></div>
                </div>
                <div ref={heroRef} className="relative mb-2 z-10">
                    <Hero status={showLaser ? 'lost' : correct ? 'won' : 'none'} />
                </div>
                <div className="relative z-10">
                    <Image src='/sprites/pillar-sprite.png' height={400} width={100} alt='pillar' className="block" />
                </div>
            </div>

            {/* --- RESPONSIVE: Removed max-h-screen, changed padding, added w-full --- */}
            <div className="flex-5 w-full max-w-4xl mx-auto px-4 md:px-6 py-8 z-0 flex flex-col justify-center items-center">
                {/* Progress Bar */}
                <div className="mb-8 z-10 w-full">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[var(--color-text-secondary)]">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm text-[var(--color-text-secondary)]">{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200/20 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Timer and Streak */}
                <div className="flex justify-between items-center mb-8 z-10 w-full">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${timeLeft <= 10 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold text-lg">{timeLeft}s</span>
                        </div>
                        {streak > 0 && (
                            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                <Zap className="w-5 h-5" />
                                <span className="font-semibold">{streak} Streak!</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white/20 rounded-2xl shadow-xl border border-purple-100 p-6 md:p-8 mb-4 z-10 w-full">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-[var(--color-text)] leading-relaxed">
                            {currentQ.question}
                        </h2>
                    </div>

                    {/* --- CONDITIONAL ANSWER UI --- */}

                    {/* --- 1. MCQ UI (RESPONSIVE: grid-cols-1 md:grid-cols-2) --- */}
                    {currentQ.type === 'MCQ' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQ.options.map((option, index) => {
                                let buttonClass = "w-full min-h-[80px] p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium flex items-center";

                                if (!answerSubmitted) {
                                    buttonClass += (selectedAnswer === index)
                                        ? " border-purple-500 bg-purple-100/50 text-[var(--color-text)]"
                                        : " border-gray-200 hover:border-purple-300 text-[var(--color-text)] hover:bg-purple-50/20 cursor-pointer";
                                } else {
                                    if (index === currentQ.correctAnswer) {
                                        buttonClass += " border-green-500 bg-green-50 text-green-800";
                                    } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                                        buttonClass += " border-red-500 bg-red-50 text-red-800";
                                    } else {
                                        buttonClass += " border-gray-200 bg-gray-50 text-gray-500 opacity-60";
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleMCQSelect(index)}
                                        disabled={answerSubmitted}
                                        className={buttonClass}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-sm font-bold ${!answerSubmitted
                                                        ? (selectedAnswer === index ? 'border-purple-500' : 'border-gray-300')
                                                        : index === currentQ.correctAnswer
                                                            ? "border-green-500 bg-green-500 text-white"
                                                            : index === selectedAnswer
                                                                ? "border-red-500 bg-red-500 text-white"
                                                                : "border-gray-300"
                                                    }`}
                                            >
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span>{option}</span>
                                            {answerSubmitted && index === currentQ.correctAnswer && (
                                                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                                            )}
                                            {answerSubmitted && index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer && (
                                                <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* --- 2. TILE UI (Already responsive) --- */}
                    {currentQ.type === 'TILE' && (
                        <div className="flex flex-col">
                            {/* Selected Tiles Area */}
                            <div className="flex flex-wrap gap-2 p-4 min-h-[80px] w-full border-b-2 border-purple-100/50 rounded-t-lg bg-black/10">
                                {selectedTiles.map((tile, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDeselectTile(index)}
                                        disabled={answerSubmitted}
                                        className="px-4 py-3 bg-purple-100 border-2 border-purple-300 rounded-lg font-bold text-purple-800 cursor-pointer disabled:cursor-not-allowed"
                                    >
                                        {tile.text}
                                    </button>
                                ))}
                            </div>

                            {/* Tile Options Bank */}
                            <div className="flex flex-wrap items-center justify-center gap-2 p-4 pt-8">
                                {currentQ.tileOptions.map((tile, index) => {
                                    const isSelected = selectedTiles.some(t => t.index === index);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectTile(tile, index)}
                                            disabled={isSelected || answerSubmitted}
                                            className="px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-lg font-bold text-gray-800
                                                hover:border-purple-300
                                                disabled:opacity-20 disabled:cursor-not-allowed"
                                        >
                                            {tile}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {answerSubmitted && (
                    <div className={`z-10 w-full p-4 rounded-lg ${isCurrentAnswerCorrect
                            ? 'bg-green-100/20 border border-green-500'
                            : 'bg-red-100/20 border border-red-500'
                        }`}>
                        <h3 className={`font-bold ${isCurrentAnswerCorrect ? 'text-green-300' : 'text-red-300'
                            }`}>
                            {isCurrentAnswerCorrect ? 'Correct!' : 'Incorrect'}
                        </h3>
                        <p className="text-white/90 mt-2">{currentQ.explanation}</p>
                        {!isCurrentAnswerCorrect && currentQ.type === 'MCQ' && (
                            <p className="text-white/70 mt-1 text-sm">
                                Correct Answer: {currentQ.options[currentQ.correctAnswer]}
                            </p>
                        )}
                        {!isCurrentAnswerCorrect && currentQ.type === 'TILE' && (
                            <p className="text-white/70 mt-1 text-sm">
                                Correct Answer: {currentQ.correctAnswer}
                            </p>
                        )}
                    </div>
                )}

                <div className="z-10 w-full"> {/* min-h prevents layout jump */}
                    {!answerSubmitted ? (
                        <button
                            onClick={handleCheckAnswer}
                            disabled={(currentQ.type === 'MCQ' ? selectedAnswer === null : selectedTiles.length === 0) && timeLeft > 0}
                            className="w-full py-4 bg-purple-600 text-white rounded-xl text-lg font-semibold cursor-pointer hover:bg-purple-700 transition disabled:bg-gray-400/50 disabled:cursor-not-allowed"
                        >
                            <Check className="w-6 h-6 inline-block mr-2" />
                            {timeLeft === 0 ? "Time's Up!" : "Check"}
                        </button>
                    ) : (
                        // Empty space while auto-advancing
                        null
                    )}
                </div>

            </div>

            <div className="flex-1 hidden lg:flex flex-col justify-center items-center z-[-20]">
                <div className="relative left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none z-0">
                    <div className="w-56 h-56 rounded-full bg-rose-300 opacity-45 blur-3xl"></div>
                </div>
                <div ref={villainRef} className="z-10">
                    <Villain laser={showLaser} />
                </div>
                <div className="z-10">
                    <Image src='/sprites/pillar-sprite.png' height={400} width={100} alt='pillar' className="block" />
                </div>
            </div>
        </div>
    );
};

export default QuizPage;