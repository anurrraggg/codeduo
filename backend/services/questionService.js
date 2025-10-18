import { questionsRepository } from "../repository/questionsRepository"

export const questionService = {
    createQuestion: async (questionData) => {
        return await questionsRepository.create(questionData);
    },
    findQuestionById: async (id) => {
        return await questionsRepository.findById(id);
    },
    findQuestionsByQuizId: async (quizId) => {
        return await questionsRepository.findByQuizId(quizId);
    },
    findQuestionByQuestionId: async (questionId) => {
        return await questionsRepository.findByQuestionId(questionId);
    },
    updateQuestion: async (questionId, questionData) => {
        return await questionsRepository.update(questionId, questionData);
    },
    findAllQuestions: async () => {
        return await questionsRepository.findAll();
    },
    deleteQuestion: async (id) => {
        await questionsRepository.delete(id);
    },
};