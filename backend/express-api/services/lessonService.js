const { lessonRepository } = require("../repository/lessonRepository");

const lessonService = {
    createLesson: async (lessonData) => {
        return await lessonRepository.create(lessonData);
    },
    findLessonById: async (id) => {
        return await lessonRepository.findById(id);
    },
    findLessonByLessonId: async (lesson_id) => {
        return await lessonRepository.findByLessonId(lesson_id);
    },
    findAllLessons: async () => {
        return await lessonRepository.findAll();
    },
    updateLesson: async (lesson_id, lessonData) => {
        return await lessonRepository.update(lesson_id, lessonData);
    },
    deleteLesson: async (id) => {
        return await lessonRepository.delete(id);
    }
};

module.exports = { lessonService };