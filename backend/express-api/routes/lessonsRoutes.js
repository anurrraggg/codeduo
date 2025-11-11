const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createLesson, getLessonByLessonId, updateLesson, getAllLessons, deleteLesson } = require('../controllers/lessonsController');

router.post('/', auth, createLesson);
router.get('/lesson/:lessonId', auth, getLessonByLessonId);
router.put('/', auth, updateLesson);
router.get('/', auth, getAllLessons);
router.delete('/', auth, deleteLesson);

module.exports = router;
