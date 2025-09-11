const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, required: true, unique: true, trim: true
        },
        email: { 
            type: String, required: true, unique: true, lowercase: true, trim: true
         },
        passwordHash: { 
            type: String, required: false 
        },
        displayName: { 
            type: String, default: 'User' 
        },
        points: {
            type: Number, default: 0
        },
        avatarUrl: { type: String, default: '' },
        provider: { type: String, enum: ['local', 'google'], default: 'local' },
        googleId: { type: String, unique: true, sparse: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);