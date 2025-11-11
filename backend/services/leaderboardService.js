const { leaderboardRepository } = require("../repository/leaderboardRepository");

const leaderboardService = {
    createLeaderboard: async (leaderboardData) => {
        return await leaderboardRepository.create(leaderboardData);
    },
    findLeaderboardById: async (id) => {
        return await leaderboardRepository.findById(id);
    },
    findLeaderboardByLeaderboardId: async (lb_id) => {
        return await leaderboardRepository.find(lb_id);
    },
    findAllLeaderboards: async () => {
        try {
            const limit = Math.min(parseInt(req.query.limit || '50', 10), 100);
            let top = await User.find({}, { username: 1, displayName: 1, points: 1 })
                .sort({ points: -1, _id: 1 })
                .limit(limit)
                .lean();

            // Ensure specific names are present in the leaderboard view
            const wanted = [
                { username: 'ishan', displayName: 'Ishan' },
                { username: 'ayush', displayName: 'Ayush' },
                { username: 'bhoomika', displayName: 'Bhoomika' },
            ];

            const existingUsernames = new Set(top.map(u => (u.username || '').toLowerCase()));
            for (const w of wanted) {
                if (!existingUsernames.has(w.username)) {
                    top.push({ username: w.username, displayName: w.displayName, points: 0 });
                }
            }

            // Re-sort including the injected entries and cap to limit
            top = top.sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, limit);

            const me = await User.findById(req.user.id, { username: 1, displayName: 1, points: 1 }).lean();
            const rank = await User.countDocuments({ points: { $gt: me?.points || 0 } }) + 1;
            res.json({ top, me: { ...me, rank } });
        } catch (err) {
            res.status(500).json({ message: 'Failed to load leaderboard' });
        }
    },
    updateLeaderboard: async (lb_id, leaderboardData) => {
        return await leaderboardRepository.update(lb_id, leaderboardData);
    },
    deleteLeaderboard: async (id) => {
        return await leaderboardRepository.delete(id);
    }
};

module.exports = { leaderboardService };