'use client';
import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, Repeat, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

const quizData = {
    topic: "Dynamic Programming",
    questions: [
        {
            question: "What is the time complexity of the optimal solution for the 0/1 Knapsack problem?",
            options: ["O(n²)", "O(n x W)", "O(2ⁿ)", "O(log n)"],
            correctAnswer: "O(n x W)",
        },
        {
            question: "Which of the following is a classic example of a problem solved using Dynamic Programming?",
            options: ["Binary Search", "Quicksort", "Fibonacci Sequence", "Depth-First Search"],
            correctAnswer: "Fibonacci Sequence",
        },
        {
            question: "The 'memoization' technique in DP is a form of:",
            options: ["Recursion", "Caching", "Iteration", "Greedy Approach"],
            correctAnswer: "Caching",
        },
    ],
};

const QuizPage = ({ quizId }) => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const { questions } = quizData;
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (option) => {
        if (selectedAnswer) return; // Prevent changing answer

        setSelectedAnswer(option);
        const correct = option === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore(prevScore => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
        } else {
            setShowResults(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setScore(0);
        setShowResults(false);
    };

    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    const openPage = (link) => {
        router.push(link);
    }

    // Render the Results Screen
    if (showResults) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
                <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-2xl p-8 md:p-12 text-center animate-float">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">Quiz Complete!</h2>
                    <p className="text-gray-600 text-lg mb-6">You've finished the {quizData.topic} quiz.</p>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
                        <p className="text-xl text-gray-700">Your Final Score</p>
                        <p className="text-6xl font-bold text-purple-700 my-2">
                            {score} <span className="text-3xl text-gray-500">/ {questions.length}</span>
                        </p>
                        <p className="text-lg font-medium text-gray-600">
                            ({((score / questions.length) * 100).toFixed(2)}%)
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleRestartQuiz}
                            className="w-full flex items-center justify-center py-3 px-6 border-2 border-purple-200 rounded-lg text-purple-600 font-semibold hover:bg-purple-100 transition-all"
                        >
                            <Repeat className="w-5 h-5 mr-2" />
                            Retry Quiz
                        </button>
                        <button
                            onClick={() => openPage('/dashboard')}
                            className="w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
                        >
                            <LayoutDashboard className="w-5 h-5 mr-2" />
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Render the Quiz
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-2xl p-8 animate-float">
                {/* Header and Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-purple-800">{quizData.topic}</h2>
                        <p className="text-gray-600 font-medium">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </div>
                    <div className="w-full bg-purple-100 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 text-center">{currentQuestion.question}</h3>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === option;
                        let optionClass = "bg-white border-gray-200 hover:bg-purple-50";

                        if (isSelected) {
                            optionClass = isCorrect ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400";
                        } else if (selectedAnswer && option === currentQuestion.correctAnswer) {
                            optionClass = "bg-green-100 border-green-400"; // Show correct answer after selection
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={!!selectedAnswer}
                                className={`w-full h-25 text-left p-4 rounded-lg border-2 font-medium transition-all duration-300 flex items-center justify-between ${optionClass} ${selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <span>{option}</span>
                                {isSelected && (isCorrect ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-red-600" />)}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                {selectedAnswer && (
                    <div className="mt-8 text-right">
                        <button
                            onClick={handleNextQuestion}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 cursor-pointer text-white py-3 px-8 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md flex items-center ml-auto"
                        >
                            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;