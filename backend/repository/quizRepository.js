import { Question } from "../models/Question";
import {Quiz} from "../models/Quiz";

export const quizRepository={
    create: async(quizData)=>{
        const quiz=new Quiz(quizData);
        return await quiz.save();
    },
    findById: async(id)=>{
        return await Quiz.findById(id);
    },
    findByLessonId: async(lessonId)=>{
        return await Quiz.find({lessonId});
    },
    findAll: async()=>{
        return await Quiz.find();
    },
    update: async(quizId,quizData)=>{
        return await Quiz.findOneAndUpdate({quizId},{$set:quizData},{new:true});
    },
    delete: async(id)=>{
        return await Question.findByIdAndDelete(id);
    }
};