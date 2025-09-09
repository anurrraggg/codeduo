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
            type: String, required: true
        },
        displayName: {
            type: String, default: 'User'
        },
        points: {
            type: Number, default: 0
        },
        role:{
            type:String,
            enum:["Top Performer","Balanced Performer","Developing Learner","Consistent Specialist"],
        },
        profile: { type: Buffer }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

module.exports = mongoose.model('User', userSchema);