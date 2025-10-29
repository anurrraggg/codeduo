const { questionsRepository } = require("../repository/questionsRepository")

const questionService = {
    createQuestion: async (questionData) => {
        return await questionRepository.create(questionData);
    },
    findQuestionById: async (id) => {
        return await questionRepository.findById(id);
    },
    findQuestionsByQuizId: async (quizId) => {
        return await questionRepository.findByQuizId(quizId);
    },
    findQuestionByQuestionId: async (questionId) => {
        return await questionRepository.findByQuestionId(questionId);
    },
    updateQuestion: async (questionId, questionData) => {
        return await questionRepository.update(questionId, questionData);
    },
    findAllQuestions: async () => {
        return await questionRepository.findAll();
    },
    deleteQuestion: async (id) => {
        await questionsRepository.delete(id);
    },
};

module.exports = questionService;