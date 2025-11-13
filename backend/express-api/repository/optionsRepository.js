const Option = require("../models/Option");

const optionRepository = {
    create: async (optionData) => {
        const option = new Option(optionData);
        return await option.save();
    },
    findById: async (id) => {
        return await Option.findById(id);
    },
    findByOptionId: async (option_id) => {
        return await Option.findOne({ option_id });
    },
    findByQuestionId: async (question_id) => {
        return await Option.find({ question_id });
    },
    findAll: async () => {
        return await Option.find();
    },
    update: async (option_id, optionData) => {
        return await Option.findOneAndUpdate({ option_id }, { $set: optionData }, { new: true });
    },
    delete: async (id) => {
        return await Option.findByIdAndDelete(id);
    }
};

module.exports = { optionRepository };