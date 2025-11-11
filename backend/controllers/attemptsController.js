const { attemptService } = require("../services/attemptService");

exports.createAttempt = async (req, res) => {
    try {
        const attempt = await attemptService.createAttempt(req.body);
        if (!attempt) {
            return res.status(400).json({ success: false, message: "Unable to create the attempt." });
        }
        return res.status(200).json({ success: true, attempt });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error', messsage: error });
    }
};

exports.findAttemptByAttemptId = async (req, res) => {
    try {
        const { attemptId } = req.params;
        if (!attemptId) {
            return res.status(400).json({ success: false, message: "Please provide the attemptId of attempt to find." });
        }
        const attempt = await attemptService.findAttemptByAttemptId(attemptId);
        if (!attempt) {
            return res.status(404).json({ success: false, message: "Attempt not found." });
        }
        return res.status(200).json({ success: true, attempt });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error', messsage: error });
    }
};

exports.findAttemptByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ success: false, message: "Please provide the userId of attempt to find." });
        }
        const attempt = await attemptService.findAttemptByAttemptId(userId);
        if (!attempt) {
            return res.status(404).json({ success: false, message: "Attempt not found." });
        }
        return res.status(200).json({ success: true, attempt });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error', messsage: error });
    }
};

exports.findAttemptsByQuizId = async (req, res) => {
    try {
        const { quizId } = req.params;
        if (!quizId) {
            return res.status(400).json({ success: false, message: "Please provide the quizId of attempts to find." });
        }
        const attempts = await attemptService.findAttemptsByQuizId(quizId);
        if (!attempts) {
            return res.status(404).json({ success: false, message: "Attempts not found." });
        }
        return res.status(200).json({ success: true, attempts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error', messsage: error });
    }
};

exports.updateAttempt = async (req, res) => {
    try {
        const { id } = req.params;
        const attemptData = req.body;
        if (!id || !attemptData) {
            return res.status(400).json({ success: false, message: "Please provide the id and attemptData to update." });
        }
        const attempt = await attemptService.updateAttempt(id, attemptData);
        if (!attempt) {
            return res.status(404).json({ success: false, message: "Attempt not found." });
        }
        return res.status(200).json({ success: true, attempt });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error', messsage: error });
    }
};

exports.findAllAttempts = async (req, res) => {
    try {
        const attempts = await attemptService.findAllAttempts();
        if (!attempts) {
            return res.status(404).json({ success: false, message: "No attempts found." });
        }
        return res.status(200).json({ success: true, attempts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error', messsage: error });
    }
};

exports.deleteAttempt = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide the id of attempt to delete." });
        }
        await attemptService.deleteAttempt(id);
        return res.status(200).json({ success: true, message: "Attempt deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error', messsage: error });
    }
};