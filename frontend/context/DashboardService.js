import { Code, Cpu, Database, GitBranch, Globe } from "lucide-react";
import { LEADERBOARD_URL, QUIZ_URL } from "../constants/urls";
import { apiFetch } from "../api/client";

export const getIcons = {
    0: <Code className="w-6 h-6" />,
    1: <Cpu className="w-6 h-6" />,
    2: <Database className="w-6 h-6" />,
    3: <GitBranch className="w-6 h-6" />,
    4: <Globe className="w-6 h-6" />
}

export const getColors = {
    'Easy': 'text-green-600 bg-green-50',
    'Medium': 'text-yellow-600 bg-yellow-50',
    'Hard': 'text-red-600 bg-red-50'
}

export const quizCategories = [
    { id: 1, name: 'Dynamic Programming', icon: 0, difficulty: 'Hard', questions: []},
    { id: 2, name: 'Backtracking', icon: 3, difficulty: 'Medium', questions: []},
    { id: 3, name: 'Data Structures', icon: 0, difficulty: 'Easy', questions: [] },
    { id: 4, name: 'Algorithms', icon: 1, difficulty: 'Medium', questions: [] },
    { id: 5, name: 'System Design', icon: 4, difficulty: 'Hard', questions: [] },
    { id: 6, name: 'Graph Algorithms', icon: 3, difficulty: 'Hard', questions: [] }
];

import { getAuthHeaders } from "./UserService";

export async function getQuizzes() {
    try {
        const response = await fetch(QUIZ_URL, {
            method: "GET",
            headers: {
                ...getAuthHeaders()
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch quizzes");
        }

        const data = await response.json();
        return data.quizzes;

    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return [];
    }
}

export const recentResults = [
    { quiz: 'Binary Trees Basics', score: 85, date: '2 days ago', category: 'Data Structures' },
    { quiz: 'DP on Strings', score: 92, date: '5 days ago', category: 'Dynamic Programming' },
    { quiz: 'Graph Traversal', score: 78, date: '1 week ago', category: 'Graph Algorithms' }
];

export const leaderboard = [
    { rank: 1, name: 'Ishan', score: 2845, avatar: 'I' },
    { rank: 2, name: 'Ayush Raj', score: 2720, avatar: 'AR' },
    { rank: 3, name: 'Bhoomika', score: 2680, avatar: 'B' },
    { rank: 4, name: 'YOU', score: 2340, avatar: 'B', isUser: true },
    { rank: 5, name: 'Anurag', score: 2280, avatar: 'ED' }
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