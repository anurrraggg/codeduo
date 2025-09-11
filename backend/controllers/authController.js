const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRES || '2h' });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }


        const exists = await User.findOne({ $or: [{ email }, { username }] });
        if (exists) {
            return res.status(409).json({ message: 'Username or email already in use' });
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        const user = await User.create({ username, email, passwordHash, displayName: username });

        const token = generateToken({ id: user._id, username: user.username });
        res.status(201).json({
            token,
            user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: 'emailOrUsername and password are required' });
        }


        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const valid = bcrypt.compareSync(password, user.passwordHash);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken({ id: user._id, username: user.username });
        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { displayName, avatarUrl } = req.body;
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { displayName, avatarUrl } },
            { new: true, runValidators: true, select: '-passwordHash' }
        );
        res.json({ user: updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Google OAuth
exports.googleAuthUrl = (req, res) => {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;
        const scope = encodeURIComponent('openid email profile');
        const state = encodeURIComponent(req.query.state || '');

        const url =
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${scope}` +
            `&access_type=offline` +
            `&prompt=consent` +
            (state ? `&state=${state}` : '');

        res.json({ url });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create Google auth URL', error: err.message });
    }
};

exports.googleCallback = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) return res.status(400).json({ message: 'Missing code' });

        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            }
        });

        const { id_token } = tokenRes.data || {};
        if (!id_token) return res.status(401).json({ message: 'Failed to exchange code' });

        // Decode Google ID token to extract user info (without verifying since Google signs it; we trust via token endpoint)
        const googlePayload = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
        const { sub: googleId, email, name, picture } = googlePayload;

        if (!googleId || !email) {
            return res.status(400).json({ message: 'Missing Google profile information' });
        }

        let user = await User.findOne({ $or: [{ googleId }, { email }] });

        if (!user) {
            // Create a username from email local-part; ensure uniqueness
            const baseUsername = email.split('@')[0];
            let uniqueUsername = baseUsername;
            let counter = 1;
            while (await User.findOne({ username: uniqueUsername })) {
                uniqueUsername = `${baseUsername}${counter++}`;
            }

            user = await User.create({
                username: uniqueUsername,
                email,
                displayName: name || uniqueUsername,
                avatarUrl: picture || '',
                provider: 'google',
                googleId
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            user.provider = 'google';
            if (!user.avatarUrl && picture) user.avatarUrl = picture;
            if (!user.displayName && name) user.displayName = name;
            await user.save();
        }

        const token = generateToken({ id: user._id, username: user.username });

        const webRedirect = process.env.WEB_REDIRECT_SUCCESS || 'http://localhost:3000/dashboard';
        const redirectUrl = `${webRedirect}?token=${encodeURIComponent(token)}`;
        return res.redirect(302, redirectUrl);
    } catch (err) {
        const webRedirect = process.env.WEB_REDIRECT_ERROR || 'http://localhost:3000/login';
        const redirectUrl = `${webRedirect}?error=${encodeURIComponent('google_oauth_failed')}`;
        try {
            return res.redirect(302, redirectUrl);
        } catch (_) {
            return res.status(500).json({ message: 'Google OAuth failed', error: err.message });
        }
    }
};