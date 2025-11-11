const { leaderboardService } = require('../services/leaderboardService');

// Create a new leaderboard
exports.createLeaderboard = async (req, res) => {
	try {
		const leaderboard = await leaderboardService.createLeaderboard(req.body);
		if (!leaderboard) {
			return res.status(400).json({ success: false, message: 'Unable to create leaderboard' });
		}
		return res.status(201).json({ success: true, leaderboard });
	} catch (error) {
		return res.status(500).json({ success: false, error: 'Server error', message: error.message });
	}
};

// Get a leaderboard by ID
exports.findLeaderboardById = async (req, res) => {
	try {
		const leaderboard = await leaderboardService.findLeaderboardById(req.params.id);
		if (!leaderboard) {
			return res.status(404).json({ success: false, message: 'Leaderboard not found' });
		}
		return res.status(200).json({ success: true, leaderboard });
	} catch (error) {
		return res.status(500).json({ success: false, error: 'Server error', message: error.message });
	}
};

// Get a leaderboard by leaderboard ID
exports.findLeaderboardByLeaderboardId = async (req, res) => {
	try {
		const leaderboard = await leaderboardService.findLeaderboardByLeaderboardId(req.params.leaderboardId);
		if (!leaderboard) {
			return res.status(404).json({ success: false, message: 'Leaderboard not found' });
		}
		return res.status(200).json({ success: true, leaderboard });
	} catch (error) {
		return res.status(500).json({ success: false, error: 'Server error', message: error.message });
	}
};

// Get all leaderboards
exports.getAllLeaderboards = async (req, res) => {
	try {
		const leaderboards = await leaderboardService.findAllLeaderboards();
		if (!leaderboards || leaderboards.length === 0) {
			return res.status(404).json({ success: false, message: 'No leaderboards found' });
		}
		return res.status(200).json({ success: true, leaderboards });
	} catch (error) {
		return res.status(500).json({ success: false, error: 'Server error', message: error.message });
	}
};

// Update a leaderboard by ID
exports.updateLeaderboard = async (req, res) => {
	try {
		const leaderboard = await leaderboardService.updateLeaderboard(req.params.id, req.body, { new: true });
		if (!leaderboard) {
			return res.status(404).json({ success: false, message: 'Leaderboard not found' });
		}
		return res.status(200).json({ success: true, leaderboard });
	} catch (error) {
		return res.status(500).json({ success: false, error: 'Server error', message: error.message });
	}
};

// Delete a leaderboard by ID
exports.deleteLeaderboard = async (req, res) => {
	try {
		const leaderboard = await leaderboardService.deleteLeaderboard(req.params.id);
		if (!leaderboard) {
			return res.status(404).json({ success: false, message: 'Leaderboard not found' });
		}
		return res.status(200).json({ success: true, message: 'Leaderboard deleted successfully' });
	} catch (error) {
		return res.status(500).json({ success: false, error: 'Server error', message: error.message });
	}
};
