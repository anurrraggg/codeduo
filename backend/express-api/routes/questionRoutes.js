const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const {
	createQuestion,
	findQuestionByQuestionId,
	findQuestionsByQuizId,
	updateQuestion,
	deleteQuestion,
	findAllQuestions,
	generateAdaptiveQuestion
} = require('../controllers/questionController');
const router = express.Router();

router.post('/', auth, createQuestion);
router.post('/adaptive/generate', auth, generateAdaptiveQuestion);
router.get('/quiz/:quizId', auth, findQuestionsByQuizId);
router.get('/:questionId', auth, findQuestionByQuestionId);
router.put('/:questionId', auth, updateQuestion);
router.delete('/:questionId', auth, adminAuth, deleteQuestion);
router.get('/', auth, findAllQuestions);

module.exports = router;