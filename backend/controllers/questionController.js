const { questionService } = require("../services/questionService");

const questionController = {
    createQuestion: async (req, res) => {
        try {
            const question = await questionService.createQuestion(req.body);
            if(!question) {
                return res.status(400).json({ success: false, message: "Unable to create the question." });
            }
            return res.status(200).json({ success: true, question });
        } catch (err) {
            return res.status(500).json({ success: false, message: "Internal server error. ", error: err });
        }
    },
    findQuestionByQuestionId: async (req, res) => {
        try {
            const { questionId } = req.params;
            if(!questionId) {
                return res.status(402).json({ success: false, message: "Please give the questionId of question to find." });
            }
            const question = await questionService.findQuestionByQuestionId(questionId);
            if(!question) {
                return res.status(400).json({ success: false, message: "Unable to find the question." });
            }
            return res.status(200).json({ success: true, question });
        } catch (err) {
            return res.status(500).json({ success: false, message: "Internal server error. ", error: err });
        }
    },
    findQuestionsByQuizId: async (req,res) => {
        try {
            const { quizId } = req.params;
            if(!quizId) {
                return res.status(402).json({ success: false, message: "Please give the quizId of question to find." });
            }
            const questions = await questionService.findQuestionsByQuizId(quizId);
            if(!questions) {
                return res.status(400).json({ success: false, message: "Unable to find the questions." });
            }
            return res.status(200).json({ success: true, questions });
        } catch (err) {
            return res.status(500).json({ success: false, message: "Internal server error. ", error: err });
        }
    },
    updateQuestion: async (req, res) => {
        try {
            const { questionId } = req.params;
            const questionData = req.body;
            if(!questionId || !questionData) {
                return res.status(402).json({ success: false, message: "Please give the questionId and quesitonData of question to find." });
            }
            const question = await questionService.updateQuestion(questionId, questionData);
            if(!question) {
                return res.status(400).json({ success: false, message: "Unable to find the question." });
            }
            return res.status(200).json({ success: true, question });
        } catch (err) {
            return res.status(500).json({ success: false, message: "Internal server error. ", error: err });
        }
    },
    findAllQuestions: async (req, res) => {
        try {
            const questions = await questionService.findAllQuestions();
            if(!questions) {
                return res.status(400).json({ success: false, message: "Unable to find the questions." });
            }
            return res.status(200).json({ success: true, questions });
        } catch (err) {
            return res.status(500).json({ success: false, message: "Internal server error. ", error: err });
        }
    },
    deleteQuestion: async (req, res) => {
        try {
            const { questionId } = req.params;
            if(!questionId) {
                return res.status(402).json({ success: false, message: "Please give the questionId of question to find." });
            }
            await questionService.deleteQuestion(questionId);
            return res.status(200).json({ success: true, message: "Question deleted successfully." });
        } catch (err) {
            return res.status(500).json({ success: false, message: "Internal server error. ", error: err });
        }
    }
};

module.exports = questionController;