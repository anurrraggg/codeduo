const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { createQuestion, findQuestionByQuestionId, findQuestionsByQuizId, updateQuestion, deleteQuestion, findAllQuestions } = require('../controllers/questionController');
const router = express.Router();

router.post('/', auth, adminAuth, createQuestion);
router.get('/question/:questionId', auth, findQuestionByQuestionId);
router.get('/quiz/:quizId', auth, findQuestionsByQuizId);
router.put('/question/:questionId', auth, updateQuestion);
router.delete('/question/:questionId', auth, adminAuth, deleteQuestion);
router.get('/', auth, adminAuth, findAllQuestions);

module.exports = router;