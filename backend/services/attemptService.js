const { attemptRepository } = require("../repository/attemptRepository");

const attemptService = {
    createAttempt: async (attemptData) => {
        return await attemptRepository.create(attemptData);
    },
    findAttemptById: async (id) => {
        return await attemptRepository.findById(id);
    },
    findAttemptByAttemptId: async (attempt_id) => {
        return await attemptRepository.findByAppointmentId({ attempt_id });
    },
    findAttemptByUserId: async (user_id) => {
        return await attemptRepository.findByUserId(user_id);
    },
    findAttemptByQuizId: async (quiz_id) => {
        return await attemptRepository.findByQuizId(quiz_id);
    },
    findAllAttempts: async () => {
        return await attemptRepository.findAll();
    },
    updateAttempt: async (attemp_id, attemptData) => {
        return await attemptRepository.update(attemp_id, attemptData, { new: true });
    },
    deleteAttempt: async (id) => {
        return await attemptRepository.delete(id);
    }
};

module.exports = { attemptService };