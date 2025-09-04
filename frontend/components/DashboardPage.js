'use client';
import React, { useState } from 'react';
import { Play, Plus, BarChart3, Trophy, User, Code, Database, GitBranch, Cpu, Globe, Users, Clock, Target, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('browse');

  const quizCategories = [
    { id: 1, name: 'Dynamic Programming', icon: <Database className="w-6 h-6" />, difficulty: 'Hard', quizzes: 24, color: 'bg-purple-100 text-purple-700' },
    { id: 2, name: 'Backtracking', icon: <GitBranch className="w-6 h-6" />, difficulty: 'Medium', quizzes: 18, color: 'bg-blue-100 text-blue-700' },
    { id: 3, name: 'Data Structures', icon: <Code className="w-6 h-6" />, difficulty: 'Easy', quizzes: 32, color: 'bg-green-100 text-green-700' },
    { id: 4, name: 'Algorithms', icon: <Cpu className="w-6 h-6" />, difficulty: 'Medium', quizzes: 28, color: 'bg-yellow-100 text-yellow-700' },
    { id: 5, name: 'System Design', icon: <Globe className="w-6 h-6" />, difficulty: 'Hard', quizzes: 15, color: 'bg-red-100 text-red-700' },
    { id: 6, name: 'Graph Algorithms', icon: <GitBranch className="w-6 h-6" />, difficulty: 'Hard', quizzes: 21, color: 'bg-purple-100 text-purple-700' }
  ];

  const recentResults = [
    { quiz: 'Binary Trees Basics', score: 85, date: '2 days ago', category: 'Data Structures' },
    { quiz: 'DP on Strings', score: 92, date: '5 days ago', category: 'Dynamic Programming' },
    { quiz: 'Graph Traversal', score: 78, date: '1 week ago', category: 'Graph Algorithms' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', score: 2845, avatar: 'AC' },
    { rank: 2, name: 'Sarah Kim', score: 2720, avatar: 'SK' },
    { rank: 3, name: 'Mike Johnson', score: 2680, avatar: 'MJ' },
    { rank: 4, name: 'You', score: 2340, avatar: 'YU', isUser: true },
    { rank: 5, name: 'Emma Davis', score: 2280, avatar: 'ED' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const openQuiz = (id) => {
    router.push(`/quiz/${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white/50 border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href='/' className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                CodeDuo
              </h1>
            </Link>

            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm">
                <Plus className="w-4 h-4" />
                <span>Create Quiz</span>
              </button>

              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Developer!</h2>
          <p className="text-gray-600">Ready to challenge your coding knowledge today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">24</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Quizzes Completed</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">87%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Average Score</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">#4</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Global Rank</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">42h</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Time Spent</h3>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-purple-50 p-1 rounded-lg mb-8 w-fit">
          {[
            { id: 'browse', label: 'Browse Quizzes', icon: <Code className="w-4 h-4" /> },
            { id: 'results', label: 'Recent Results', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer ${activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
                }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'browse' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Quiz Categories</h3>
              <span className="text-sm text-gray-500">{quizCategories.length} categories available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizCategories.map(category => (
                <div key={category.id} className="bg-white rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-200 group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                        {category.icon}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(category.difficulty)}`}>
                        {category.difficulty}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h4>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">{category.quizzes} quizzes</span>
                      <button onClick={() => openQuiz(category.id)} className="bg-purple-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-purple-600">
                        <Play className="w-4 h-4" />
                        <span>Start</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Recent Results</h3>
              <button className="text-purple-600 text-sm hover:text-purple-700 font-medium">View All</button>
            </div>

            <div className="bg-white rounded-xl border border-purple-100">
              {recentResults.map((result, index) => (
                <div key={index} className={`p-6 ${index !== recentResults.length - 1 ? 'border-b border-purple-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{result.quiz}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{result.category}</span>
                        <span>{result.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {result.score}%
                      </div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Global Leaderboard</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>Top performers this month</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-purple-100">
              {leaderboard.map((user, index) => (
                <div key={index} className={`p-6 flex items-center justify-between ${index !== leaderboard.length - 1 ? 'border-b border-purple-50' : ''
                  } ${user.isUser ? 'bg-purple-50' : ''}`}>
                  <div className="flex items-center space-x-4">
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
                      {user.isUser && <div className="text-xs text-purple-600">You</div>}
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
        )}
      </div>
    </div>
  );
};

export default DashboardPage;