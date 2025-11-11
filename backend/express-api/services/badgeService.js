const { badgeRepository } = require("../repository/badgeRepository");

const badgeService = {
    createBadge: async (badgeData) => {
        return await badgeRepository.create(badgeData);
    },
    findBadgeById: async (id) => {
        return await badgeRepository.findById(id);
    },
    findBadgeByBadgeId: async (badge_id) => {
        return await badgeRepository.findByBadgeId(badge_id);
    },
    findAllBadges: async () => {
        return await badgeRepository.findAll();
    },
    updateBadge: async (badge_id, badgeData) => {
        return await badgeRepository.update(badge_id, badgeData);
    },
    deleteBadge: async (id) => {
        return await badgeRepository.delete(id);
    }
};

module.exports = { badgeService };