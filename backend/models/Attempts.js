const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const attempsSchema = new mongoose.Schema({

    attempts_id: {
        type: String, unique: true, default: uuidv4
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,ref:'User', required: true
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,ref:'Quizzes', required: true
    },
    score: {
        type: Number,
        required:true
    },
    time_taken: {
        type: Number,
        required:true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Attempts',attempsSchema);