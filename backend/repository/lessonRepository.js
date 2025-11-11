const Lesson = require("../models/Lesson");

const lessonRepository = {
    create: async (lessonData) => {
        const lesson = new Lesson(lessonData);
        return await lesson.save();
    },
    findById: async (id) => {
        return await Lesson.findById(id);
    },
    findByLessonId: async (lesson_id) => {
        return await Lesson.findOne({ lesson_id });
    },
    findAll: async () => {
        return await Lesson.find();
    },
    update: async (lesson_id, lessonData) => {
        return await Lesson.findOneAndUpdate({ lesson_id }, { $set: lessonData }, { new: true });
    },
    delete: async (id) => {
        return await Lesson.findByIdAndDelete(id);
    }
};

module.exports = { lessonRepository };