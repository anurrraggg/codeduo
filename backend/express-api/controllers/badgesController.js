const { badgeService } = require('../services/badgeService');

// Create a new badge
exports.createBadge = async (req, res) => {
	try {
		const badge = await badgeService.createBadge(req.body);
		if (!badge) {
			res.status(401).json({ success: false, message: 'Unable to create badge' });
		}
		res.status(201).json({ success: true, badge });
	} catch (error) {
		res.status(400).json({ success: false, error: 'Internal Server Error', message: error });
	}
};

// Get a badge by ID
exports.getBadgeById = async (req, res) => {
	try {
		const badge = await badgeService.findBadgeById(req.params.id);
		if (!badge) return res.status(404).json({ success: false, message: 'Badge not found' });
		res.status(201).json({ success: true, badge });
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};

// Get a badge by badge ID
exports.getBadgeByBadgeId = async (req, res) => {
	try {
		const badge = await badgeService.findBadgeByBadgeId(req.params.badgeId);
		if (!badge) return res.status(404).json({ success: false, message: 'Badge not found' });
		res.status(201).json({ success: true, badge });
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};

// Get all badges
exports.getAllBadges = async (req, res) => {
	try {
		const badges = await badgeService.findAllBadges();
		if (!badges) return res.status(404).json({ success: false, message: 'Badges not found' });
		res.status(201).json({ success: true, badges });
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};

// Update a badge by ID
exports.updateBadge = async (req, res) => {
	try {
		const badge = await badgeService.updateBadge(req.params.id, req.body, { new: true });
		if (!badge) return res.status(404).json({ success: false, message: 'Badge not found' });
		res.status(201).json({ success: true, badge });
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};

// Delete a badge by ID
exports.deleteBadge = async (req, res) => {
	try {
		const badge = await badgeService.deleteBadge(req.params.id);
		if (!badge) return res.status(404).json({ success: false, message: 'Badge not found' });
		res.json({ success: true, message: 'Badge deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};