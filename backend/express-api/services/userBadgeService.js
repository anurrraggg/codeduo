const { userBadgeRepository } = require("../repository/userBadgeRepository");

const userBadgeService = {
    createUserBadge: async (userBadgeData) => {
        return await userBadgeRepository.create(userBadgeData);
    },
    findUserBadgeById: async (id) => {
        return await UserBadge.findById(id);
    },
    findUserBadgeByBadgeId: async (badge_id) => {
        return await UserBadge.findByBadgeId(badge_id);
    },
    findAllUserBadges: async () => {
        return await UserBadge.findAll();
    },
    updateUserBadge: async (user_badge_id, badgeData) => {
        return await UserBadge.update(user_badge_id, badgeData);
    },
    deleteUserBadge: async (id) => {
        return await UserBadge.delete(id);
    }
};

module.exports = { userBadgeService };