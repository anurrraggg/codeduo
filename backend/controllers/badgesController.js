const Badge = require('../models/Badges');

// Get all badges
exports.getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a badge by ID
exports.getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    res.json(badge);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new badge
exports.createBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Update a badge by ID
exports.updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    res.json(badge);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a badge by ID
exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    res.json({ message: 'Badge deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
