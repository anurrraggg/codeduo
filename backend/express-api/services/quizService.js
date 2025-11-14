const { quizRepository } = require("../repository/quizRepository");

const quizService = {
    createQuiz: async (quizData) => {
        return await quizRepository.create(quizData);
    },
    findQuizById: async (id) => {
        return await quizRepository.findById(id);
    },
    findQuizByQuizId: async (quiz_id) => {
        return await quizRepository.findByQuizId(quiz_id);
    },
    findQuizByLessonId: async (lesson_id) => {
        return await quizRepository.findByLessonId(lesson_id);
    },
    findAllQuizzes: async () => {
        return await quizRepository.findAll();
    },
    updateQuiz: async (quiz_id, quizData) => {
        return await quizRepository.update(quiz_id, quizData);
    },
    deleteQuiz: async (id) => {
        return await quizRepository.delete(id);
    }
};

module.exports = { quizService };