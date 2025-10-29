const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');
const { register, login, me, updateProfile, googleAuthUrl, googleCallback, debugOAuthConfig, debugOAuth, googleCallbackDebug, testJWT } = require('../controllers/authController');

router.post('/register', validateRequest(['username', 'email', 'password'], { email: true, password: true }), asyncHandler(register));
router.post('/login', validateRequest(['emailOrUsername', 'password']), asyncHandler(login));
router.get('/me', auth, asyncHandler(me));
router.put('/me', auth, validateRequest([], { email: true }), asyncHandler(updateProfile));

// Google OAuth routes
router.get('/google', asyncHandler(googleAuthUrl));
router.get('/google/callback', asyncHandler(googleCallback));

// Debugging and diagnostics
router.get('/debug/config', asyncHandler(debugOAuthConfig));
router.get('/debug', asyncHandler(debugOAuth));
router.get('/google/callback/debug', asyncHandler(googleCallbackDebug));
router.get('/test-jwt', asyncHandler(testJWT));

module.exports = router;