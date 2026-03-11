const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const quizzesSchema = new mongoose.Schema({
    quiz_id: {
        type: String, unique: true, default: uuidv4
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: Number,
        default: 0,
        max: 5
    },
    difficulty: {
        type: String,
        default: 'Easy',
        enum: ['Easy', 'Medium', 'Hard']
    },
    questions: {
        type: [String],
        ref: 'Question',
        default: []
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Performance indexes
quizzesSchema.index({ lesson_id: 1 }); // For finding quizzes by lesson
quizzesSchema.index({ quiz_id: 1 }); // Already unique, but explicit index helps
quizzesSchema.index({ createdAt: -1 }); // For sorting by creation date

module.exports = mongoose.model('Quizzes',quizzesSchema);