const { Badge } = require("../models/Badge");

const badgeRepository = {
    create: async(badgeData)=>{
        const badge=new Badge(badgeData);
        return await badge.save();
    },
    findById: async(id)=>{
        return await Badge.findById(id);
    },
    findByBadgeId: async(badge_id)=>{
        return await Badge.findOne({badge_id});
    },
    findAll: async()=>{
        return await Badge.find();
    },
    update: async(badge_id,badgeData)=>{
        return await Badge.findOneAndUpdate({ badge_id }, { $set: badgeData }, { new: true });
    },
    delete: async(id)=>{
        return await Badge.findByIdAndDelete(id);
    }
};

module.exports = { badgeRepository };