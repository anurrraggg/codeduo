const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const quizzesSchema = new mongoose.Schema({
    quiz_id: {
        type: String, unique: true, default: uuidv4
    },
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,ref:'Lessons', required: true
    },
    quiz_type: {
        type: String,
        required:true
    },
    time_limit: {
        type: Number,
        required:true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Quizzes',quizzesSchema);