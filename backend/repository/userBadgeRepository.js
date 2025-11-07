const { UserBadge } = require("../models/UserBadge");

const userBadgeRepository = {
    create: async(userBadgeData)=>{
        const userBadge=new UserBadge(userBadgeData);
        return await userBadge.save();
    },
    findById: async(id)=>{
        return await UserBadge.findById(id);
    },
    findByBadgeId: async(badge_id)=>{
        return await UserBadge.findOne({badge_id});
    },
    findAll: async()=>{
        return await UserBadge.find();
    },
    update: async(user_badge_id,badgeData)=>{
        return await UserBadge.findOneAndUpdate({ user_badge_id }, { $set: badgeData }, { new: true });
    },
    delete: async(id)=>{
        return await UserBadge.findByIdAndDelete(id);
    }
};

module.exports = { userBadgeRepository };