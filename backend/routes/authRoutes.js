  const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');
  const { register, login, me, updateProfile, googleAuthUrl, googleCallback } = require('../controllers/authController');

  router.post('/register', register);
  router.post('/login', login);
  router.get('/me', auth, me);
  router.put('/me', auth, updateProfile);

  // Google OAuth routes
  router.get('/google', googleAuthUrl);
  router.get('/google/callback', googleCallback);

  module.exports = router;