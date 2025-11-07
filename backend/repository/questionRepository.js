const { Question } = require("../models/Question");

const questionRepository = {
    create: async (questionData) => {
        const question = new Question(questionData);
        return await question.save();
    },
    findById: async (id) => {
        return await Question.findById(id);
    },
    findByQuizId: async (quiz_id) => {
        return await Question.find({ quiz_id });
    },
    findByQuestionId: async (question_id) => {
        return await Question.findOne({ question_id });
    },
    update: async (question_id, questionData) => {
        return await Question.findOneAndUpdate({ question_id }, { $set: questionData }, { new: true });
    },
    findAll: async () => {
        return await Question.find();
    },
    delete: async (id) => {
        return await Question.findByIdAndDelete(id);
    },
};

module.exports = { questionRepository };