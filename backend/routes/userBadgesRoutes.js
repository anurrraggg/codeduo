const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createUserBadge, getUserBadgeByBadgeId, updateUserBadge, getAllUserBadges, deleteUserBadge } = require('../controllers/userBadgesController');

// Placeholder route - implement when controller is ready
router.post('/', auth, createUserBadge);
router.get('/userBadge/:userBadgeId', auth, getUserBadgeByBadgeId);
router.put('/', auth, updateUserBadge);
router.get('/', auth, getAllUserBadges);
router.delete('/', auth, deleteUserBadge);

module.exports = router;
