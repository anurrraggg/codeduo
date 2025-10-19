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
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Question = mongoose.model('Questions',questionsSchema);

module.exports = Question;