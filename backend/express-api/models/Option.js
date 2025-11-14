const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const optionsSchema = new mongoose.Schema({
    option_id: {
        type: String, unique: true, default: uuidv4
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,ref:'Questions', required: true
    },
    option_text: {
        type: String,
        required:true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Options',optionsSchema);