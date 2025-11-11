'use client';
import React, { useEffect, useState } from 'react';
import { Trophy, Users } from 'lucide-react';
import { getLeaderboard } from '@/context/DashboardService';
import LoaderPage from './LoaderPage';

const defaultAvatars = [
  'I', 'AR', 'B', 'B', 'A', 'YU', 'AJ', 'E', 'L', 'K', 'P', 'R', 'D'
];

const rankBgClass = (rank) => {
  if (rank === 1) return 'bg-yellow-300/80 text-yellow-900 shadow-lg'; // gold
  if (rank === 2) return 'bg-gray-300/80 text-gray-800 shadow-md'; // silver
  if (rank === 3) return 'bg-amber-700/80 text-amber-50 shadow'; // bronze
  return 'bg-purple-100 text-purple-700';
};

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLeaderboard().then(res => {
      let top = res.top || [];
      // Process avatars and ranks if missing
      top = top.map((u, idx) => ({
        ...u,
        rank: idx + 1,
        avatar:
          (u.displayName && u.displayName.length <= 3)
            ? u.displayName.toUpperCase()
            : u.username?.slice(0, 2).toUpperCase() || defaultAvatars[idx % defaultAvatars.length]
      }));
      setUsers(top);
      if (res.me) {
        setMe({
          ...res.me,
          avatar: (res.me.displayName && res.me.displayName.length <= 3)
            ? res.me.displayName.toUpperCase()
            : res.me.username?.slice(0,2).toUpperCase() || 'ME'
        });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/80 shadow-2xl rounded-2xl p-8 border border-purple-100/70">
        <div className="flex items-center mb-8 gap-2">
          <Trophy className="w-7 h-7 text-yellow-500" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-800 tracking-tight">Global Leaderboard</h1>
        </div>
        <div className="flex items-center gap-2 text-gray-400 mb-8">
          <Users className="w-5 h-5" />
          <span className="font-medium text-sm">Top performers this month</span>
        </div>
        {loading ? <LoaderPage /> : (
          <div className="divide-y divide-purple-100 rounded-xl overflow-hidden mt-3">
            {users.map((user, idx) => {
              let itemClass = "flex items-center justify-between px-6 py-5 transition-all";
              const isMe = (!!me && (user._id === me._id || user.username === me.username));
              if (isMe) {
                itemClass += " bg-purple-50/70 border-l-4 border-purple-400 !rounded-lg scale-105";
              } else if (idx === 0) {
                itemClass += " z-10";
              }
              return (
                <div
                  key={user.rank + user.username}
                  className={itemClass}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center font-bold text-xl rounded-full ring-2 ring-purple-200 ${rankBgClass(user.rank)}`}
                    >
                      {user.rank}
                    </div>
                    <div className={`w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-semibold text-purple-700 text-base shadow`}>{user.avatar}</div>
                    <span className={`font-semibold text-lg ${isMe ? 'text-purple-800' : 'text-gray-900'}`}>{user.displayName || user.username}{isMe && <div className="inline ml-2 text-xs text-purple-600 font-semibold">(You)</div>}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`font-bold text-lg ${isMe ? 'text-purple-700' : 'text-gray-800'}`}>{user.points?.toLocaleString() ?? user.score?.toLocaleString() ?? '-'}</span>
                    <span className="text-xs text-purple-400">points</span>
                  </div>
                </div>
              );
            })}
            {/* My info at the bottom if not in top */}
            {
              !!me && !users.find(u => u._id === me._id) && (
                <div className="flex items-center justify-between px-6 py-5 bg-purple-50/70 border-l-4 border-purple-400 !rounded-lg scale-105 mt-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center font-bold text-xl rounded-full ring-2 ring-purple-200 bg-purple-200 text-purple-700`}>{me.rank}</div>
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-semibold text-purple-700 text-base shadow">{me.avatar}</div>
                    <span className={`font-semibold text-lg text-purple-800`}>{me.displayName || me.username} <div className="inline ml-2 text-xs text-purple-600 font-semibold">(You)</div></span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-lg text-purple-700">{me.points?.toLocaleString() ?? '-'}</span>
                    <span className="text-xs text-purple-400">points</span>
                  </div>
                </div>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
}
