const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, me, updateProfile, googleAuthUrl, googleCallback, debugOAuthConfig, debugOAuth, googleCallbackDebug, testJWT } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.put('/me', auth, updateProfile);

// Google OAuth routes
router.get('/google', googleAuthUrl);
router.get('/google/callback', googleCallback);

// Debugging and diagnostics
router.get('/debug/config', debugOAuthConfig);
router.get('/debug', debugOAuth);
router.get('/google/callback/debug', googleCallbackDebug);
router.get('/test-jwt', testJWT);

module.exports = router;