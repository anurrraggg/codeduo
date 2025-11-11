const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const leaderboardSchema = new mongoose.Schema({
    lb_id: {
        type: String, unique: true, default: uuidv4
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true
    },
    score: {
        type: Number, default: 0
    },
    rank :{
        type:Number,required:true
    },
    timeframe:{
        type:[Number],
        required:true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Leaderboard',leaderboardSchema);