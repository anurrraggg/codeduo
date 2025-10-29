const Badge=require('../models/Badges');

//get all badges
exports.getAllBadges =async(req,res)=>{
    try{
        const badges=await Badge.find();
        res.json(badges);
    } catch(err){
        res.status(500).json({error:'Server error'});
    }
};

//