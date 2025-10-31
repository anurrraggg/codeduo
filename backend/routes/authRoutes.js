const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const validateRequest = require('../middleware/validateRequest');
const { register, login, me, updateProfile, uploadAvatar, googleAuthUrl, googleCallback, debugOAuthConfig, debugOAuth, googleCallbackDebug, testJWT, forgotPassword, resetPassword } = require('../controllers/authController');
const multer = require('multer');
const path = require('node:path');
const fs = require('node:fs');

// Multer storage for avatars
const avatarsDir = path.join(__dirname, '..', 'uploads', 'avatars');
if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarsDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) || '.png';
        const name = `${req.user.id}-${Date.now()}${ext}`;
        cb(null, name);
    }
});
const upload = multer({ storage });

router.post('/register', validateRequest(['username', 'email', 'password'], { email: true, password: true }), asyncHandler(register));
router.post('/login', validateRequest(['emailOrUsername', 'password']), asyncHandler(login));
router.get('/me', auth, asyncHandler(me));
router.put('/me', auth, validateRequest([], { email: true }), asyncHandler(updateProfile));
router.put('/me/avatar', auth, upload.single('avatar'), asyncHandler(uploadAvatar));

// Google OAuth routes
router.get('/google', asyncHandler(googleAuthUrl));
router.get('/google/callback', asyncHandler(googleCallback));

// Debugging and diagnostics
router.get('/debug/config', asyncHandler(debugOAuthConfig));
router.get('/debug', asyncHandler(debugOAuth));
router.get('/google/callback/debug', asyncHandler(googleCallbackDebug));
router.get('/test-jwt', asyncHandler(testJWT));

// Password reset
router.post('/forgot-password', validateRequest(['email'], { email: true }), asyncHandler(forgotPassword));
router.post('/reset-password', validateRequest(['token', 'password'], { password: true }), asyncHandler(resetPassword));

module.exports = router;