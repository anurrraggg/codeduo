const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const questionController = require('../controllers/questionController');
const router = express.Router();

router.post('/', auth, adminAuth, questionController.createQuestion);
router.get('/question/:questionId', auth, questionController.findQuestionByQuestionId);
router.get('/quiz/:quizId', auth, questionController.findQuestionsByQuizId);
router.put('/question/:questionId', auth, questionController.updateQuestion);
router.delete('/question/:questionId', auth, adminAuth, questionController.deleteQuestion);
router.get('/', auth, adminAuth, questionController.findAllQuestions);

module.exports = router;