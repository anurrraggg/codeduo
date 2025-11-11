const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const questionsSchema = new mongoose.Schema({

    question_id: {
        type: String, unique: true, default: uuidv4
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,ref:'Quizzes', required: true
    },
    question_text: {
        type: String,
        required:true
    },
    question_type: {
        type: String,
        required:true
    },
    options: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Options',
        default: []
    },
    correctOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Options'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Performance indexes
questionsSchema.index({ quiz_id: 1 }); // For finding questions by quiz
questionsSchema.index({ question_id: 1 }); // Already unique, but explicit index helps

module.exports = mongoose.model("Question", questionsSchema);