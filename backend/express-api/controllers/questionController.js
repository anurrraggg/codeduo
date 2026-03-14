const { questionService } = require("../services/questionService");

exports.createQuestion = async (req, res) => {
    const question = await questionService.createQuestion(req.body);
    if (!question) {
        return res.status(400).json({ success: false, message: "Unable to create the question." });
    }
    return res.status(200).json({ success: true, question });
};

exports.findQuestionByQuestionId = async (req, res) => {
    const { questionId } = req.params;
    if (!questionId) {
        return res.status(400).json({ success: false, message: "Please provide the questionId of question to find." });
    }
    const question = await questionService.findQuestionByQuestionId(questionId);
    if (!question) {
        return res.status(404).json({ success: false, message: "Question not found." });
    }
    return res.status(200).json({ success: true, question });
};

exports.findQuestionsByQuizId = async (req, res) => {
    const { quizId } = req.params;
    if (!quizId) {
        return res.status(400).json({ success: false, message: "Please provide the quizId of questions to find." });
    }
    const questions = await questionService.findQuestionsByQuizId(quizId);
    if (!questions) {
        return res.status(404).json({ success: false, message: "Questions of this quiz id not found." });
    }
    return res.status(200).json({ success: true, questions });
};

exports.updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const questionData = req.body;
    if (!questionId || !questionData) {
        return res.status(400).json({ success: false, message: "Please provide the questionId and questionData to update." });
    }
    const question = await questionService.updateQuestion(questionId, questionData);
    if (!question) {
        return res.status(404).json({ success: false, message: "Question not found." });
    }
    return res.status(200).json({ success: true, question });
};

exports.findAllQuestions = async (req, res) => {
    const questions = await questionService.findAllQuestions();
    if (!questions) {
        return res.status(404).json({ success: false, message: "No questions found." });
    }
    return res.status(200).json({ success: true, questions });
};

exports.deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    if (!questionId) {
        return res.status(400).json({ success: false, message: "Please provide the questionId of question to delete." });
    }
    await questionService.deleteQuestion(questionId);
    return res.status(200).json({ success: true, message: "Question deleted successfully." });
};

exports.generateAdaptiveQuestion = async (req, res, next) => {
    try {
        const {
            quiz_id,
            topic,
            previousQuestion,
            previousAnswer,
            wasCorrect,
            currentDifficulty,
            type
        } = req.body;

        if (!quiz_id) {
            return res.status(400).json({
                success: false,
                message: "Please provide quiz_id to store the generated question."
            });
        }

        if (!topic) {
            return res.status(400).json({
                success: false,
                message: "Please provide topic for adaptive generation."
            });
        }

        const question = await questionService.createAdaptiveQuestion({
            quiz_id,
            topic,
            previousQuestion,
            previousAnswer,
            wasCorrect,
            currentDifficulty,
            type
        });

        return res.status(201).json({
            success: true,
            message: "Adaptive question generated and stored successfully.",
            question
        });
    } catch (error) {
        next(error);
    }
};