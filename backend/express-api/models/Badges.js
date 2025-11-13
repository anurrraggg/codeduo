const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const badgesSchema = new mongoose.Schema({
    badge_id: {
        type: String, unique: true, default: uuidv4
    },
    name: {
        type: String, required: true
    },
    description: {
        type: String,
        required:true
    },
    criteria: {
        type: String,
        required:true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Badges',badgesSchema);