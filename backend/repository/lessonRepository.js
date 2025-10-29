import { Lesson } from "../models/Lesson";

export const lessonRepository = {
    create: async (lessonData) => {
        const lesson = new Lesson(lessonData);
        return await lesson.save();
    },
    findById: async (id) => {
        return await Lesson.findById(id);
    },
    update: async (lessonId, lessonData) => {
        return await lesson.findOneAndUpdate({ lessonId }, { $set: lessonData }, { new: true });
    },
    findAll: async () => {
        return await Lesson.find();
    },
    delete: async(id)=>{
        return await Lesson.findByIdAndDelete(id);
    }

};