import { Code, Cpu, Database, GitBranch, Globe } from "lucide-react";
import { LEADERBOARD_URL } from "../constants/urls";
import { apiFetch } from "../api/client";

export const quizCategories = [
    { id: 1, name: 'Dynamic Programming', icon: <Database className="w-6 h-6" />, difficulty: 'Hard', quizzes: 24, color: 'bg-purple-100 text-purple-700' },
    { id: 2, name: 'Backtracking', icon: <GitBranch className="w-6 h-6" />, difficulty: 'Medium', quizzes: 18, color: 'bg-blue-100 text-blue-700' },
    { id: 3, name: 'Data Structures', icon: <Code className="w-6 h-6" />, difficulty: 'Easy', quizzes: 32, color: 'bg-green-100 text-green-700' },
    { id: 4, name: 'Algorithms', icon: <Cpu className="w-6 h-6" />, difficulty: 'Medium', quizzes: 28, color: 'bg-yellow-100 text-yellow-700' },
    { id: 5, name: 'System Design', icon: <Globe className="w-6 h-6" />, difficulty: 'Hard', quizzes: 15, color: 'bg-red-100 text-red-700' },
    { id: 6, name: 'Graph Algorithms', icon: <GitBranch className="w-6 h-6" />, difficulty: 'Hard', quizzes: 21, color: 'bg-purple-100 text-purple-700' }
];

export const recentResults = [
    { quiz: 'Binary Trees Basics', score: 85, date: '2 days ago', category: 'Data Structures' },
    { quiz: 'DP on Strings', score: 92, date: '5 days ago', category: 'Dynamic Programming' },
    { quiz: 'Graph Traversal', score: 78, date: '1 week ago', category: 'Graph Algorithms' }
];

export const leaderboard = [
    { rank: 1, name: 'Alex Chen', score: 2845, avatar: 'AC' },
    { rank: 2, name: 'Sarah Kim', score: 2720, avatar: 'SK' },
    { rank: 3, name: 'Mike Johnson', score: 2680, avatar: 'MJ' },
    { rank: 4, name: 'You', score: 2340, avatar: 'YU', isUser: true },
    { rank: 5, name: 'Emma Davis', score: 2280, avatar: 'ED' }
];

export async function getLeaderboard() {
  try {
    return await apiFetch(LEADERBOARD_URL, { method: 'GET' });
  } catch (e) {
    return { top: [], me: null };
  }
}

export const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy': return 'text-green-600 bg-green-50';
        case 'Medium': return 'text-yellow-600 bg-yellow-50';
        case 'Hard': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
    }
};