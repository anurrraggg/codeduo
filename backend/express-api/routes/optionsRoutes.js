const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createOption, getOptionByOptionId, updateOption, getAllOptions, deleteOption, getOptionByQuestionId } = require('../controllers/optionsController');

router.post('/', auth, createOption);
router.get('/option/:optionId', auth, getOptionByOptionId);
router.get('/question/:questionId', auth, getOptionByQuestionId);
router.put('/', auth, updateOption);
router.get('/', auth, getAllOptions);
router.delete('/', auth, deleteOption);

module.exports = router;
