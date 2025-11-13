const { optionRepository } = require("../repository/optionsRepository");

const optionService = {
    createOption: async (optionData) => {
        return await optionRepository.create(optionData);
    },
    findOptionById: async (id) => {
        return await optionRepository.findById(id);
    },
    findOptionByOptionId: async (option_id) => {
        return await optionRepository.findByOptionId(option_id);
    },
    findOptionByQuestionId: async (question_id) => {
        return await optionRepository.findByQuestionId(question_id);
    },
    findAllOptions: async () => {
        return await optionRepository.findAll();
    },
    updateOption: async (option_id, optionData) => {
        return await optionRepository.update(option_id, optionData);
    },
    deleteOption: async (id) => {
        return await optionRepository.delete(id);
    }
};

module.exports = { optionService };