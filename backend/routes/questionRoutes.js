const express = require('express');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/adminAuth');
const adminAuth = require('../middleware/adminAuth');
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');
const questionController = require('../controllers/questionController');
const router = express.Router();

router.post('/', auth, authAdmin, validateRequest(['question', 'options', 'correctAnswer', 'quizId']), asyncHandler(questionController.createQuestion));
router.get('/question/:questionId', auth, asyncHandler(questionController.findQuestionByQuestionId));
router.get('/quiz/:quizId', auth, asyncHandler(questionController.findQuestionsByQuizId));
router.put('/question/:questionId', auth, validateRequest(['question', 'options', 'correctAnswer']), asyncHandler(questionController.updateQuestion));
router.delete('/question/:quesitonId', auth, adminAuth, asyncHandler(questionController.deleteQuestion));
router.get('/', auth, adminAuth, asyncHandler(questionController.findAllQuestions));

module.exports = router;