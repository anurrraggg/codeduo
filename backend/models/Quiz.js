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

// Performance indexes
quizzesSchema.index({ lesson_id: 1 }); // For finding quizzes by lesson
quizzesSchema.index({ quiz_id: 1 }); // Already unique, but explicit index helps
quizzesSchema.index({ createdAt: -1 }); // For sorting by creation date

module.exports = mongoose.model('Quizzes',quizzesSchema);