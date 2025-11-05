const {Attempt} =require("../models/Attempt");

export const attemptRepository={
    create:async(attemptData)=>{
        const attempt=new Attempt(attemptData);
        return await attempt.save();
    },
    findById: async(id)=>{
        return await Attempt.findById(id);
    },
    findByUserId:async(user_id)=>{
        return await Attempt.find({user_id});
    },
    findByQuizId:async(quiz_id)=>{
        return await Attempt.find({quiz_id});
    },
    findAll: async () => {
        return await Attempt.find();
    },
    update: async (attemp_id, attemptData) => {
        return await Attempt.findOneAndUpdate({ attemp_id }, { $set: attemptData }, { new: true });
    },
    delete: async (id) => {
        return await Attempt.findByIdAndDelete(id);
    }

}