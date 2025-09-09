const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const leaderboardSchema = new mongoose.Schema({
    lb_id: {
        type: String, unique: true, default: uuidv4
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    score: {
        type: Number, default: 0
    }

})