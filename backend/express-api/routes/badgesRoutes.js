const express=require('express');
const router=express.Router();
const { createBadge, findBadgeByBadgeId, updateBadge, findAllBadges, deleteBadge } = require('../controllers/badgesController');

router.post('/', auth, createBadge);
router.get('/badge/:badgeId', auth, findBadgeByBadgeId);
router.put('/', auth, updateBadge);
router.get('/', auth, findAllBadges);
router.delete('/', auth, deleteBadge);

module.exports=router;