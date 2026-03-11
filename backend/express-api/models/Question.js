const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const questionsSchema = new mongoose.Schema({
    question_id: {
        type: String, unique: true, default: () => uuidv4()
    },
    type: {
        type: String, default: 'MCQ', enum: ['MCQ', 'TILES']
    },
    quiz_id: {
        type: String, required: true
    },
    question: {
        type: String,
        required:true,
        unique: true
    },
    options: {
        type: [String],
        required: true,
        min: 2
    },
    correctAnswer: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    explanation: {
        type: String,
        default: "No Explanation provided"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model("Question", questionsSchema);