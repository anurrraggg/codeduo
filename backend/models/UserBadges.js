const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userBadgesSchema = new mongoose.Schema({

    user_badge_id: {
        type: String, unique: true, default: uuidv4
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,ref:'User', required: true
    },
    badge_id: {
        type: mongoose.Schema.Types.ObjectId,ref:'Badges', required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('UserBadges',userBadgesSchema);