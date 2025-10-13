const express=require('express');
const router=express.Router();
const badgesController=require('../controllers/badgesController');

//get all badges
router.get('/',badgesController.getAllBadges);

//get badge by id
router.get('/:id',badgesController.getBadgeById);

//Create a badge
router.post('/',badgesController.createBadge);

//Update a badge
router.put('/:id',badgesController.updateBadge);

//Delete a badge  
router.delete('/:id',badgesController.deleteBadge);

module.exports=router;