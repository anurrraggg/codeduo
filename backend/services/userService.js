import { userRepository } from "../repository/userRepository";

export const userService = {
    createUser: async (user) => {
        return await userRepository.create(user);
    },
    findUserById: async (id) => {
        return await userRepository.findById(id);
    },
    findUserByEmailOrUsername: async (email, username) => {
        return await userRepository.findByEmailOrUsername(email, username);
    },
    findUserByQuery: async (query) => {
        return await userRepository.findByQuery(query);
    },
    updateUser: async (id, updateData) => {
        return await userRepository.update(id, updateData);
    },
    findAllUsers: async () => {
        return await userRepository.find();
    },
    deleteUser: async (id) => {
        return await userRepository.delete();
    }
};