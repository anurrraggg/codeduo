import User from "../models/User";

export const userRepository = {
    create: async (user) => {
        const newUser = new User(user);
        return await newUser.save();
    },
    findById: async (id) => {
        return await User.findById(id);
    },
    findByEmailOrUsername: async (email, username) => {
        return await User.findOne({ $or: [{ email }, { username }] });
    },
    findByQuery: async (query) => {
        return await User.findOne({ query });
    },
    update: async (id, updateData) => {
        return await User.findByIdAndUpdate({ id }, { $set: updateData }, { new: true, runValidators: true, select: '-passwordHash' });
    },
    findAll: async () => {
        return await User.find();
    },
    delete: async (id) => {
        await User.findByIdAndDelete(id);
    }
};