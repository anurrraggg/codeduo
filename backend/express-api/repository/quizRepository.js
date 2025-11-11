const Quiz = require("../models/Quiz");

const quizRepository = {
    create: async (quizData) => {
        const quiz = new Quiz(quizData);
        return await quiz.save();
    },
    findById: async (id) => {
        return await Quiz.findById(id);
    },
    findByQuizId: async (quiz_id) => {
        return await Quiz.findOne({ quiz_id });
    },
    findByLessonId: async (lesson_id) => {
        return await Quiz.find({ lesson_id });
    },
    findAll: async () => {
        return await Quiz.find();
    },
    update: async (quiz_id, quizData) => {
        return await Quiz.findOneAndUpdate({ quiz_id }, { $set: quizData }, { new: true });
    },
    delete: async (id) => {
        return await Quiz.findByIdAndDelete(id);
    }
};

module.exports = { quizRepository };