const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Placeholder route - implement when controller is ready
router.get('/', auth, (req, res) => {
    res.json({ message: 'Lessons endpoint - to be implemented' });
});

module.exports = router;
