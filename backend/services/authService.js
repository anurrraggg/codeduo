const jwtService = require("./jwtService");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const userService = require("./userService");
const validationService = require("./validationService");

const crypto = require('crypto');

const authService = {
    register: async (body) => {
        const { username, email, password, isAdmin } = body;
        const validation = validationService.validateInput(body, ['username', 'email', 'password']);
        if (!validation.valid) {
            return { success: false, status: 400, message: validation.message };
        }

        // Sanitize inputs
        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim().toLowerCase();

        // Validate email format
        if (!validationService.validateEmail(sanitizedEmail)) {
            return { success: false, status: 400, message: 'Invalid email format' };
        }

        // Validate password strength
        if (!validationService.validatePassword(password)) {
            return { success: false, status: 400, message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' };
        }

        // Check for existing user
        const exists = await userService.findUserByEmailOrUsername(sanitizedEmail, sanitizedUsername);
        if (exists) {
            return { success: false, status: 409, message: 'Username or email already in use' };
        }

        // Hash password with higher cost factor
        const saltRounds = Number.parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = await userService.createUser({
            username: sanitizedUsername,
            email: sanitizedEmail,
            passwordHash,
            ...(isAdmin !== undefined && { isAdmin }),
            displayName: sanitizedUsername
        });

        const token = jwtService.generateToken({
            id: user._id,
            username: user.username,
            role: user.isAdmin ? 'admin' : 'user',
            type: 'access'
        }, '90d');

        return {
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                displayName: user.displayName
            }
        };
    },
    forgotPassword: async ({ email }) => {
        if (!email || typeof email !== 'string') {
            return { success: false, status: 400, message: 'Email is required' };
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await userService.findUserByQuery({ email: normalizedEmail });

        // Always return success to avoid account enumeration
        if (!user) {
            return { success: true, token: undefined };
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

        await userService.updateUser(user._id, {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: expiresAt,
        });

        // In production, send email with link containing rawToken
        return { success: true, token: rawToken };
    },
    resetPassword: async ({ token, password }) => {
        if (!token || !password) {
            return { success: false, status: 400, message: 'Token and password are required' };
        }

        if (typeof password !== 'string' || password.length < 8) {
            return { success: false, status: 400, message: 'Password must be at least 8 characters' };
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const now = new Date();
        const user = await userService.findUserByQuery({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: now },
        });

        if (!user) {
            return { success: false, status: 400, message: 'Invalid or expired token' };
        }

        const passwordHash = await bcrypt.hash(password, 12);
        await userService.updateUser(user._id, {
            passwordHash,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
        });

        return { success: true };
    },
    login: async (body) => {
        const { emailOrUsername, password } = body;
        // Input validation
        const validation = validationService.validateInput(body, ['emailOrUsername', 'password']);
        if (!validation.valid) {
            return { success: false, status: 400, message: validation.message };
        }

        const trimmedInput = emailOrUsername.trim();
        const lowercasedInput = trimmedInput.toLowerCase();

        // Helper to safely build a case-insensitive exact-match regex for username
        const escapeRegex = (value) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, (match) => `\\${match}`);

        // Find user by email (lowercased exact) OR username (case-insensitive exact)
        const query = validationService.validateEmail(lowercasedInput)
            ? { email: lowercasedInput }
            : { username: { $regex: `^${escapeRegex(trimmedInput)}$`, $options: 'i' } };

        const user = await userService.findUserByQuery(query);

        // Use timing-safe comparison to prevent timing attacks
        const isValidUser = user !== null;
        const isValidPassword = isValidUser ?
            await bcrypt.compare(password, user.passwordHash) :
            await bcrypt.compare(password, '$2b$12$dummy.hash.to.prevent.timing.attacks');

        if (!isValidUser || !isValidPassword) {
            return { success: false, status: 401, message: 'Invalid credentials' };
        }

        const token = jwtService.generateToken({
            id: user._id,
            username: user.username,
            role: user.isAdmin ? 'admin' : 'user',
            type: 'access'
        }, '90d');

        return {
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                displayName: user.displayName
            }
        };
    },
    me: async (user) => {
        if (!user || user.type !== 'access') {
            return { success: false, status: 401, message: 'Invalid token type' };
        }

        if (user.id) {
            const getUser = await userService.findUserById(user.id);
            if (!getUser) return { success: false, status: 404, message: 'User not found' };
            return { success: true, user: getUser };
        }

        // Fallback: unlikely needed if Google users are saved in DB
        return { success: false, status: 401, message: 'Invalid token or user not found' };
    },
    updateProfile: async (user, displayName, avatarUrl) => {
        // Check if user is authenticated and not a Google OAuth user
        if (!user?.id || user?.provider === 'google') {
            return { success: false, status: 403, message: 'Profile updates not allowed for this user type' };
        }

        // Sanitize inputs
        const updateData = {};
        if (displayName !== undefined) {
            updateData.displayName = displayName.trim();
        }
        if (avatarUrl !== undefined) {
            // Basic URL validation
            if (avatarUrl && !avatarUrl.match(/^https?:\/\/.+/)) {
                return { success: false, status: 400, message: 'Invalid avatar URL format' };
            }
            updateData.avatarUrl = avatarUrl;
        }

        const updated = await userService.updateUser(user.id, updateData);

        if (!updated) {
            return { success: false, status: 404, message: 'User not found' };
        }

        return { success: true, user: updated };
    },
    googleAuthUrl: async (query) => {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;

        if (!clientId || !redirectUri) {
            const missing = [];
            if (clientId === undefined) missing.push('clientId');
            if (redirectUri === undefined) missing.push('redirectUri');
            throw new Error(`Google OAuth not configured. Missing: ${missing.join(', ')}`);
        }

        console.log('🔗 Generating auth URL with:');
        console.log('  Client ID:', clientId);
        console.log('  Redirect URI:', redirectUri);

        const scope = encodeURIComponent('openid email profile');
        const state = query.state ? encodeURIComponent(query.state) : '';

        // Use exact redirect URI that matches Google Console
        const url =
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code` +
            `&client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${scope}` +
            `&access_type=offline` +
            `&prompt=consent` +
            (state ? `&state=${state}` : '');

        console.log('🚀 Generated auth URL:', url);
        return { success: true, url };
    },
    googleCallback: async (query, code, error) => {
        console.log('📝 Callback received with query:', query);

        if (error) {
            console.log('❌ Google OAuth error:', error);
            const webRedirect = process.env.WEB_REDIRECT_ERROR || 'http://localhost:3000/login';
            return { success: false, status: 303, redirect: `${webRedirect}?error=google_error_${error}`};
        }
        if (!code) return { success: false, status: 400, message: 'Missing authorization code' };

        const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
            throw new Error('Google OAuth configuration missing');
        }

        console.log('🔄 Exchanging code for tokens...');

        // FIXED: Send data in request body, not as URL params
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token',
            // Send as form data in the body
            new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        console.log('✅ Token exchange successful');
        console.log('📄 Token response keys:', Object.keys(tokenRes.data));

        const { id_token } = tokenRes.data;
        if (!id_token) throw new Error('Failed to exchange code: no ID token');

        // Decode Google ID token
        const googlePayload = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
        const { sub: googleId, email, name, picture } = googlePayload;
        if (!googleId || !email) throw new Error('Missing required Google profile info');

        // Check if user already exists
        let user = await userService.findUserByGoogleId(googleId);
        if (!user) {
            // Create new user
            const baseUsername = email.split('@')[0];
            user = await userService.createUser({
                username: baseUsername,
                email,
                displayName: name || baseUsername,
                avatarUrl: picture || '',
                provider: 'google',
                googleId
            });
            console.log('✅ New Google user saved:', user._id);
        }

        // Create JWT with user ID
        const token = jwtService.generateToken({ id: user._id.toString(), type: 'access' });

        const webRedirect =
            process.env.WEB_REDIRECT_SUCCESS ||
            (process.env.FRONTEND_BASE_URL ? `${process.env.FRONTEND_BASE_URL}/oauth/callback` : 'http://localhost:3000/oauth/callback');
        return { success: true, redirect: `${webRedirect}?token=${encodeURIComponent(token)}`};
    },
};

module.exports = authService;