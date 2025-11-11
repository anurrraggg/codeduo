'use client';
import React, { useEffect, useState } from 'react';
import { Play, BarChart3, Trophy, User, Code, Users, Clock, Target, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDifficultyColor, leaderboard, quizCategories, recentResults } from '@/services/DashboardService';
import Image from 'next/image';
import { getUser } from '@/services/UserService';
import LoaderPage from './LoaderPage';
import PerformanceRadarChart from './PerformanceRadarChart';
import { kmeans } from 'ml-kmeans';
import useTheme from '@/hooks/useTheme';
import { toast } from 'sonner';

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('browse');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [playerType, setPlayerType] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUserAndCluster = () => {
      try {
        const data = getUser();
        if (data) {
          // Add dummy parameters directly to the user
          const updatedUser = {
            ...data,
            Accuracy: 85,
            Speed: 90,
            Consistency: 80,
            ProblemSolving: 88,
            KnowledgeBreadth: 75,
            Endurance: 82,
            Improvement_Rate: 70,
          };

          setUser(updatedUser);

          // --- Generate dummy users for clustering ---
          const dummyUsers = [];
          const k = 4; // number of clusters

          for (let i = 0; i < 20; i++) {
            dummyUsers.push([
              Math.floor(Math.random() * 50) + 50, // Accuracy 50-100
              Math.floor(Math.random() * 50) + 50, // Speed
              Math.floor(Math.random() * 50) + 50, // Consistency
              Math.floor(Math.random() * 50) + 50, // ProblemSolving
              Math.floor(Math.random() * 50) + 50, // KnowledgeBreadth
              Math.floor(Math.random() * 50) + 50, // Endurance
              Math.floor(Math.random() * 50) + 50, // Improvement_Rate
            ]);
          }

          // Add current user at the end
          const allFeatures = [
            ...dummyUsers,
            [
              updatedUser.Accuracy,
              updatedUser.Speed,
              updatedUser.Consistency,
              updatedUser.ProblemSolving,
              updatedUser.KnowledgeBreadth,
              updatedUser.Endurance,
              updatedUser.Improvement_Rate,
            ],
          ];

          // Run k-means
          const result = kmeans(allFeatures, k, { seed: 42 });

          // Current user is the last element
          const userClusterIndex = result.clusters[allFeatures.length - 1];

          const clusterNames = {
            0: 'Top Performer',
            1: 'Balanced Improver',
            2: 'Developing Learner',
            3: 'Consistent Specialist',
          };

          setPlayerType(clusterNames[userClusterIndex] || 'Analyzing...');
        } else {
          toast.error("User not found or invalid credentials.");
          router.push("/");
        }
      } catch (err) {
        console.error("Error during setup: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCluster();
  }, []);

  if (loading) {
    return <LoaderPage />;
  }

  if (!user) {
    return null;
  }

  const getClusterBadgeColor = (clusterName) => {
    switch (clusterName) {
      case 'Top Performer': return 'bg-purple-100 text-purple-700';
      case 'Consistent Specialist': return 'bg-blue-100 text-blue-700';
      case 'Balanced Improver': return 'bg-green-100 text-green-700';
      case 'Developing Learner': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const openQuiz = (id) => {
    router.push(`/quiz?id=${id}`);
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--background)] border-b border-[var(--color-border-navbar)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <Link href='/' className="flex items-center space-x-3">
              <Image className='w-40' height={10} width={180} src={isDark ? '/icons/logo2.png' : '/icons/logo.png'} alt="logo" />
            </Link>

            <button onClick={() => router.push('/profile')} className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">Welcome back, {user?.username || 'User'}!</h2>
          <p className="text-[var(--color-text-secondary)]">Ready to challenge your coding knowledge today?</p>
        </div>

        {/* Radar Chart Section */}
        <div
          className="rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow mb-8"
          style={{
            backgroundColor: "rgba(181, 183, 185, 0.1)",
            color: "var(--foreground)",
          }}
        >
          {/* 5. DISPLAY CLUSTER RESULT HERE */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">Your Skill Profile</h3>
            {playerType && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getClusterBadgeColor(
                  playerType
                )}`}
              >
                {playerType}
              </span>
            )}
          </div>
          <div className="relative h-80">
            <PerformanceRadarChart user={user} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className="rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "rgba(181, 183, 185, 0.1)",
              color: "var(--foreground)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-[var(--color-text)]">24</span>
            </div>
            <h3 className="text-[var(--color-text-secondary)] text-sm font-medium">Quizzes Completed</h3>
          </div>

          <div
            className="rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "rgba(181, 183, 185, 0.1)",
              color: "var(--foreground)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-[var(--color-text)]">87%</span>
            </div>
            <h3 className="text-[var(--color-text-secondary)] text-sm font-medium">Average Score</h3>
          </div>

          <div
            className="rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "rgba(181, 183, 185, 0.1)",
              color: "var(--foreground)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-[var(--color-text)]">#4</span>
            </div>
            <h3 className="text-[var(--color-text-secondary)] text-sm font-medium">Global Rank</h3>
          </div>

          <div
            className="rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: "rgba(181, 183, 185, 0.1)",
              color: "var(--foreground)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-[var(--color-text)]">42h</span>
            </div>
            <h3 className="text-[var(--color-text-secondary)] text-sm font-medium">Time Spent</h3>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="w-full overflow-x-auto">
          <div
            className="flex space-x-1 p-1 rounded-lg mb-8 w-fit"
            style={{
              backgroundColor: "rgba(181, 183, 185, 0.1)",
              color: "var(--foreground)",
            }}>
            {[
              { id: 'browse', label: 'Browse Quizzes', icon: <Code className="w-4 h-4" /> },
              { id: 'results', label: 'Recent Results', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer ${activeTab === tab.id
                  ? 'bg-[var(--background)] text-[var(--color-text)] shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
                  }`}
                style={{
                  color: "var(--foreground)",
                }}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>


        {/* Content based on active tab */}
        {activeTab === 'browse' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Quiz Categories</h3>
              <span className="text-sm text-[var(--color-text-secondary)]">{quizCategories.length} categories available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizCategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => openQuiz(category.id)}
                  className="rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-200 group cursor-pointer"
                  style={{
                    backgroundColor: "rgba(181, 183, 185, 0.1)",
                    color: "var(--foreground)",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
                        {category.icon}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(category.difficulty)}`}>
                        {category.difficulty}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h4>

                    <div className="flex items-center justify-between">
                      <span className="text-[var(--color-text-secondary)] text-sm">{category.quizzes} quizzes</span>
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
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Recent Results</h3>
              <button className="text-[var(--color-text-secondary)] text-sm hover:text-purple-700 font-medium">View All</button>
            </div>

            <div 
            className="rounded-xl border border-purple-100"
            style={{
              backgroundColor: "rgba(181, 183, 185, 0.1)",
              color: "var(--foreground)",
            }}>
              {recentResults.map((result, index) => (
                <div key={index} className={`p-6 ${index !== recentResults.length - 1 ? 'border-b border-purple-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-[var(--color-text)] mb-1">{result.quiz}</h4>
                      <div className="flex items-center space-x-4 text-sm text-[var(--color-text-secondary)]">
                        <span>{result.category}</span>
                        <span>{result.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {result.score}%
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)]">Score</div>
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
              <h3 className="text-xl font-semibold text-[var(--color-text)]">Global Leaderboard</h3>
              <div className="flex items-center space-x-2 text-sm text-[var(--color-text-secondary)]">
                <Users className="w-4 h-4" />
                <span>Top performers this month</span>
              </div>
            </div>

            <div 
            className="rounded-xl border border-purple-100"
            style={{
              backgroundColor: "rgba(181, 183, 185, 0.1)",
              color: "var(--foreground)",
            }}
            >
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
                      <div className={`font-semibold ${user.isUser ? 'text-purple-700' : 'text-[var(--color-text)]'}`}>
                        {user.name}
                      </div>
                      {user.isUser && <div className="text-xs text-purple-600">You</div>}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-bold ${user.isUser ? 'text-purple-700' : 'text-[var(--color-text)]'}`}>{user.score.toLocaleString()}</div>
                    <div className={`text-xs ${user.isUser ? 'text-purple-700' : 'text-[var(--color-text)]'}`}>points</div>
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