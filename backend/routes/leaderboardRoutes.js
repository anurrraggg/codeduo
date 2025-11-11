const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { createLeaderboard, findLeaderboardByLeaderboardId, updateLeaderboard, deleteLeaderboard, getAllLeaderboards } = require('../controllers/leaderboardController');

router.post('/', auth, createLeaderboard);
router.get('/leaderboard/:leaderboardId', auth, findLeaderboardByLeaderboardId);
router.put('/', auth, updateLeaderboard);
router.get('/', auth, getAllLeaderboards);
router.delete('/', auth, deleteLeaderboard);

module.exports = router;












