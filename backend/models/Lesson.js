const mongoose = require('mongoose')
const { v4: uuidv4, stringify } = require('uuid')

const lessonsSchema = new mongoose.Schema({
    lesson_id: {
        type: String, unique: true, default: uuidv4
    },
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    estimated_time: {
        type: Number, required: true
    },
    is_published: {
        type: Boolean, required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Lesson', lessonsSchema);