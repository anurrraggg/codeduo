const { quizService } = require('../services/quizService');

// Create a new quiz
exports.createQuiz = async (req, res) => {
	try {
		const quiz = await quizService.createQuiz(req.body);
		if (!quiz) {
			return res.status(401).json({ success: false, message: 'Unable to create quiz' });
		}
		return res.status(201).json({ success: true, quiz });
	} catch (error) {
		return res.status(400).json({ success: false, error: 'Internal Server Error', message: error });
	}
};

// Get a quiz by ID
exports.getQuizById = async (req, res) => {
	try {
		const quiz = await quizService.findQuizById(req.params.quizId);
		if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
		return res.status(201).json({ success: true, quiz });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get a quiz by quiz ID
exports.getQuizByQuizId = async (req, res) => {
	try {
		const quiz = await quizService.findQuizByQuizId(req.params.id);
		if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
		return res.status(201).json({ success: true, quiz });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get a quiz by quiz ID
exports.getQuizByLessonId = async (req, res) => {
	try {
		const quiz = await quizService.findQuizByLessonId(req.params.quizId);
		if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
		return res.status(201).json({ success: true, quiz });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get all quizs
exports.getAllQuizzes = async (req, res) => {
	try {
		const quizs = await quizService.findAllQuizzes();
		if (!quizs) return res.status(404).json({ success: false, message: 'Quizs not found' });
		return res.status(201).json({ success: true, quizs });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
	try {
		const quiz = await quizService.updateQuiz(req.params.id, req.body, { new: true });
		if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
		return res.status(201).json({ success: true, quiz });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
	try {
		const quiz = await quizService.deleteQuiz(req.params.id);
		if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });
		return res.json({ success: true, message: 'Quiz deleted successfully' });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};
