const { lessonService } = require('../services/lessonService');

// Create a new lesson
exports.createLesson = async (req, res) => {
	try {
		const lesson = await lessonService.createLesson(req.body);
		if (!lesson) {
			return res.status(401).json({ success: false, message: 'Unable to create lesson' });
		}
		return res.status(201).json({ success: true, lesson });
	} catch (error) {
		return res.status(400).json({ success: false, error: 'Internal Server Error', message: error });
	}
};

// Get a lesson by ID
exports.getLessonById = async (req, res) => {
	try {
		const lesson = await lessonService.findLessonById(req.params.id);
		if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
		return res.status(201).json({ success: true, lesson });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get a lesson by lesson ID
exports.getLessonByLessonId = async (req, res) => {
	try {
		const lesson = await lessonService.findLessonByLessonId(req.params.lessonId);
		if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
		return res.status(201).json({ success: true, lesson });
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};

// Get all lessons
exports.getAllLessons = async (req, res) => {
	try {
		const lessons = await lessonService.findAllLessons();
		if (!lessons) return res.status(404).json({ success: false, message: 'Lessons not found' });
		return res.status(201).json({ success: true, lessons });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Update a lesson by ID
exports.updateLesson = async (req, res) => {
	try {
		const lesson = await lessonService.updateLesson(req.params.id, req.body, { new: true });
		if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
		return res.status(201).json({ success: true, lesson });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Delete a lesson by ID
exports.deleteLesson = async (req, res) => {
	try {
		const lesson = await lessonService.deleteLesson(req.params.id);
		if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
		return res.json({ success: true, message: 'Lesson deleted successfully' });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};
