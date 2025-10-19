const { Question } = require("../models/Question");

const questionsRepository = {
    create: async (questionData) => {
        const quesiton = new Question(questionData);
        return await quesiton.save();
    },
    findById: async (id) => {
        return await Question.findById(id);
    },
    findByQuizId: async (quizId) =>{
        return await Question.find({ quizId });
    },
    findByQuestionId: async (questionId) => {
        return await Question.findOne({ questionId });
    },
    update: async (questionId, questionData) => {
        return await Question.findOneAndUpdate({ questionId }, { $set: questionData }, { new: true });
    },
    findAll: async () => {
        return await Question.find();
    },
    delete: async (id) => {
        await Question.findByIdAndDelete(id);
    },
};

module.exports = questionsRepository;