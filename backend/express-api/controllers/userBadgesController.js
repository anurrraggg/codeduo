const { userBadgeService } = require('../services/userBadgeService');

// Create a new userBadge
exports.createUserBadge = async (req, res) => {
	try {
		const userBadge = await userBadgeService.createUserBadge(req.body);
		if (!userBadge) {
			return res.status(401).json({ success: false, message: 'Unable to create userBadge' });
		}
		return res.status(201).json({ success: true, userBadge });
	} catch (error) {
		return res.status(400).json({ success: false, error: 'Internal Server Error', message: error });
	}
};

// Get a userBadge by ID
exports.getUserBadgeById = async (req, res) => {
	try {
		const userBadge = await userBadgeService.findUserBadgeById(req.params.userBadgeId);
		if (!userBadge) return res.status(404).json({ success: false, message: 'UserBadge not found' });
		return res.status(201).json({ success: true, userBadge });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get a userBadge by userBadge ID
exports.getUserBadgeByBadgeId = async (req, res) => {
	try {
		const userBadge = await userBadgeService.findUserBadgeByBadgeId(req.params.id);
		if (!userBadge) return res.status(404).json({ success: false, message: 'UserBadge not found' });
		return res.status(201).json({ success: true, userBadge });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Get all userBadges
exports.getAllUserBadges = async (req, res) => {
	try {
		const userBadges = await userBadgeService.findAllUserBadges();
		if (!userBadges) return res.status(404).json({ success: false, message: 'UserBadges not found' });
		return res.status(201).json({ success: true, userBadges });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Update a userBadge by ID
exports.updateUserBadge = async (req, res) => {
	try {
		const userBadge = await userBadgeService.updateUserBadge(req.params.id, req.body, { new: true });
		if (!userBadge) return res.status(404).json({ success: false, message: 'UserBadge not found' });
		return res.status(201).json({ success: true, userBadge });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};

// Delete a userBadge by ID
exports.deleteUserBadge = async (req, res) => {
	try {
		const userBadge = await userBadgeService.deleteUserBadge(req.params.id);
		if (!userBadge) return res.status(404).json({ success: false, message: 'UserBadge not found' });
		return res.json({ success: true, message: 'UserBadge deleted successfully' });
	} catch (error) {
		return res.status(500).json({ error: 'Server error' });
	}
};
