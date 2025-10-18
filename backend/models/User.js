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
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

export default User = mongoose.model('User', userSchema);