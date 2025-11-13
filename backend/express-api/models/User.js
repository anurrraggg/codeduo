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
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatarUrl: { type: String, default: '' },
        provider: { type: String, enum: ['local', 'google'], default: 'local' },
        googleId: { type: String, unique: true, sparse: true },
        role: {
            type: String,
            enum: ["Top Performer", "Balanced Performer", "Developing Learner", "Consistent Specialist"],
        },
        profile: { type: Buffer }
        ,
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Performance indexes
userSchema.index({ points: -1 }); // For leaderboard queries
userSchema.index({ email: 1 }); // Already unique, but explicit index helps
userSchema.index({ username: 1 }); // Already unique, but explicit index helps
userSchema.index({ googleId: 1 }); // For OAuth lookups
userSchema.index({ resetPasswordToken: 1 }); // For password reset queries

const User = mongoose.model('User', userSchema);

module.exports = User;