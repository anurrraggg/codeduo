const { Leaderboard } = require("../models/Leaderboard");

const leaderboardRepository = {
    create: async (leaderboardData) => {
        const leaderboard = new Leaderboard(leaderboardData);
        return await leaderboard.save();
    },
    findById: async (id) => {
        return await Leaderboard.findById(id);
    },
    findByLeaderboardId: async (lb_id) => {
        return await Leaderboard.find({ lb_id });
    },
    findAll: async () => {
        return await Leaderboard.find();
    },
    update: async (lb_id, leaderboardData) => {
        return await Leaderboard.findOneAndUpdate({ lb_id }, { $set: leaderboardData }, { new: true });
    },
    delete: async (id) => {
        return await Leaderboard.findByIdAndDelete(id);
    }
};

module.exports = { leaderboardRepository };