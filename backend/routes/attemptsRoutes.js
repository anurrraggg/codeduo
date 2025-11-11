const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAttempt, findAttemptByAttemptId, findAttemptByUserId, findAttemptsByQuizId, updateAttempt, findAllAttempts, deleteAttempt } = require('../controllers/attemptsController');

router.post('/', auth, createAttempt);
router.get('/attempt/:attemptId', auth, findAttemptByAttemptId);
router.get('/user/:userId', auth, findAttemptByUserId);
router.get('/quiz/:quizId', auth, findAttemptsByQuizId);
router.put('/:id', auth, updateAttempt);
router.get('/', auth, findAllAttempts);
router.delete('/', auth, deleteAttempt);

module.exports = router;