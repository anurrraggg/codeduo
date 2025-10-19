const { userRepository } = require("../repository/userRepository");

const userService = {
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
    findUserByGoogleId: async (googleId) => {
        return await userRepository.findByGoogleId(googleId);
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

module.exports = userService;