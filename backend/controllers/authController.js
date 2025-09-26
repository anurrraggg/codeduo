const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is required');
    }
    // Add algorithm specification to prevent algorithm confusion attacks
    return jwt.sign(payload, secret, { 
        expiresIn: process.env.JWT_EXPIRES || '2h',
        algorithm: 'HS256'
    });
};

const validateInput = (data, requiredFields) => {
    const missing = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    if (missing.length > 0) {
        return { valid: false, message: `Missing required fields: ${missing.join(', ')}` };
    }
    return { valid: true };
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // Minimum 8 characters, at least one uppercase, lowercase, number, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Input validation
        const validation = validateInput(req.body, ['username', 'email', 'password']);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        // Sanitize inputs
        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim().toLowerCase();

        // Validate email format
        if (!validateEmail(sanitizedEmail)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password strength
        if (!validatePassword(password)) {
            return res.status(400).json({ 
                message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' 
            });
        }

        // Check for existing user
        const exists = await User.findOne({ 
            $or: [{ email: sanitizedEmail }, { username: sanitizedUsername }] 
        });
        if (exists) {
            return res.status(409).json({ message: 'Username or email already in use' });
        }

        // Hash password with higher cost factor
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        const user = await User.create({ 
            username: sanitizedUsername, 
            email: sanitizedEmail, 
            passwordHash, 
            displayName: sanitizedUsername 
        });

        const token = generateToken({ 
            id: user._id, 
            username: user.username,
            type: 'access'
        });
        
        res.status(201).json({
            token,
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email, 
                displayName: user.displayName 
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        
        // Input validation
        const validation = validateInput(req.body, ['emailOrUsername', 'password']);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        const trimmedInput = emailOrUsername.trim();
        const lowercasedInput = trimmedInput.toLowerCase();

        // Helper to safely build a case-insensitive exact-match regex for username
        const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Find user by email (lowercased exact) OR username (case-insensitive exact)
        const query = validateEmail(lowercasedInput)
            ? { email: lowercasedInput }
            : { username: { $regex: `^${escapeRegex(trimmedInput)}$`, $options: 'i' } };

        const user = await User.findOne(query);
        
        // Use timing-safe comparison to prevent timing attacks
        const isValidUser = user !== null;
        const isValidPassword = isValidUser ? 
            await bcrypt.compare(password, user.passwordHash) : 
            await bcrypt.compare(password, '$2b$12$dummy.hash.to.prevent.timing.attacks');

        if (!isValidUser || !isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ 
            id: user._id, 
            username: user.username,
            type: 'access'
        });
        
        res.json({
            token,
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email, 
                displayName: user.displayName 
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.me = async (req, res) => {
    try {
        // Validate token type
        if (!req.user || req.user.type !== 'access') {
            return res.status(401).json({ message: 'Invalid token type' });
        }

        // If JWT contains an id, attempt DB fetch (local auth users)
        if (req.user.id) {
            const user = await User.findById(req.user.id).select('-passwordHash');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json({ user });
        }

        // Otherwise, treat JWT as stateless Google profile token
        if (req.user.provider === 'google') {
            const { username, email, displayName, avatarUrl } = req.user;
            return res.json({ 
                user: { 
                    id: undefined, 
                    username, 
                    email, 
                    displayName, 
                    avatarUrl 
                } 
            });
        }

        return res.status(401).json({ message: 'Invalid token' });
    } catch (err) {
        console.error('Me endpoint error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        // Check if user is authenticated and not a Google OAuth user
        if (!req.user || !req.user.id || req.user.provider === 'google') {
            return res.status(403).json({ message: 'Profile updates not allowed for this user type' });
        }

        const { displayName, avatarUrl } = req.body;
        
        // Sanitize inputs
        const updateData = {};
        if (displayName !== undefined) {
            updateData.displayName = displayName.trim();
        }
        if (avatarUrl !== undefined) {
            // Basic URL validation
            if (avatarUrl && !avatarUrl.match(/^https?:\/\/.+/)) {
                return res.status(400).json({ message: 'Invalid avatar URL format' });
            }
            updateData.avatarUrl = avatarUrl;
        }

        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { new: true, runValidators: true, select: '-passwordHash' }
        );
        
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ user: updated });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Google OAuth
exports.googleAuthUrl = (req, res) => {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;
        
        if (!clientId || !redirectUri) {
            return res.status(500).json({ 
                message: 'Google OAuth not configured',
                missing: {
                    clientId: !clientId,
                    redirectUri: !redirectUri
                }
            });
        }

        console.log('🔗 Generating auth URL with:');
        console.log('  Client ID:', clientId);
        console.log('  Redirect URI:', redirectUri);

        const scope = encodeURIComponent('openid email profile');
        const state = req.query.state ? encodeURIComponent(req.query.state) : '';

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
        res.json({ url });
    } catch (err) {
        console.error('Auth URL generation error:', err);
        res.status(500).json({ message: 'Failed to create Google auth URL', error: err.message });
    }
};


// Replace your googleCallback function with this corrected version
exports.googleCallback = async (req, res) => {
    try {
        console.log('📝 Callback received with query:', req.query);
        
        const { code, error } = req.query;
        
        if (error) {
            console.log('❌ Google OAuth error:', error);
            const webRedirect = process.env.WEB_REDIRECT_ERROR || 'http://localhost:3000/login';
            return res.redirect(`${webRedirect}?error=google_error_${error}`);
        }
        
        if (!code) {
            console.log('❌ Missing authorization code');
            return res.status(400).json({ message: 'Missing authorization code' });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;

        console.log('🔧 Config check:');
        console.log('  Server running on: localhost:5000');
        console.log('  Redirect URI:', redirectUri);
        console.log('  Client ID:', clientId?.substring(0, 20) + '...');

        if (!clientId || !clientSecret || !redirectUri) {
            throw new Error('Google OAuth configuration missing');
        }

        console.log('🔄 Exchanging code for tokens...');
        
        // FIXED: Send data in request body, not as URL params
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', 
            // Send as form data in the body
            new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                timeout: 10000
            }
        );

        console.log('✅ Token exchange successful');
        console.log('📄 Token response keys:', Object.keys(tokenRes.data));

        const { id_token } = tokenRes.data || {};
        if (!id_token) {
            console.log('❌ Missing ID token in response');
            throw new Error('Failed to exchange authorization code - no ID token');
        }

        console.log('🔍 Decoding ID token...');
        
        const tokenParts = id_token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid ID token format');
        }

        const googlePayload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
        console.log('👤 Google user info:', {
            sub: googlePayload.sub,
            email: googlePayload.email,
            name: googlePayload.name,
            picture: googlePayload.picture ? '✅' : '❌'
        });

        const { sub: googleId, email, name, picture } = googlePayload;

        if (!googleId || !email) {
            throw new Error('Missing required profile information');
        }

        console.log('✅ All validations passed');

        // Create JWT
        const baseUsername = email.split('@')[0];
        const tokenPayload = {
            provider: 'google',
            username: baseUsername,
            email,
            displayName: name || baseUsername,
            avatarUrl: picture || '',
            type: 'access'
        };
        
        const token = generateToken(tokenPayload);
        console.log('✅ JWT created successfully');

        const webRedirect = process.env.WEB_REDIRECT_SUCCESS || 'http://localhost:3000/dashboard';
        const redirectUrl = `${webRedirect}?token=${encodeURIComponent(token)}`;
        
        console.log('🚀 Redirecting to:', webRedirect);
        return res.redirect(302, redirectUrl);

    } catch (err) {
        console.error('💥 Google OAuth error:', err.message);
        if (err.response) {
            console.error('  Status:', err.response.status);
            console.error('  Data:', err.response.data);
        }
        
        const webRedirect = process.env.WEB_REDIRECT_ERROR || 'http://localhost:3000/login';
        const redirectUrl = `${webRedirect}?error=google_oauth_failed&details=${encodeURIComponent(err.message)}`;
        return res.redirect(302, redirectUrl);
    }
};

exports.debugOAuthConfig = (req, res) => {
    const config = {
        serverPort: process.env.PORT || '5000',
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
        expectedRedirectUri: `http://localhost:${process.env.PORT || '5000'}/api/auth/google/callback`,
        clientSecretExists: !!process.env.GOOGLE_CLIENT_SECRET,
        jwtSecretExists: !!process.env.JWT_SECRET
    };
    
    console.log('🔧 Current OAuth Configuration:');
    console.log(JSON.stringify(config, null, 2));
    
    res.json(config);
};

// Add this debug endpoint to test your OAuth configuration
exports.debugOAuth = (req, res) => {
    const config = {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing',
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing',
        GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || '❌ Missing',
        JWT_SECRET: process.env.JWT_SECRET ? '✅ Set' : '❌ Missing',
        WEB_REDIRECT_SUCCESS: process.env.WEB_REDIRECT_SUCCESS || 'http://localhost:3000/dashboard',
        WEB_REDIRECT_ERROR: process.env.WEB_REDIRECT_ERROR || 'http://localhost:3000/login'
    };
    
    console.log('OAuth Configuration:', config);
    res.json(config);
};

// Enhanced error handling for Google callback
exports.googleCallbackDebug = async (req, res) => {
    try {
        console.log('🎯 === GOOGLE OAUTH CALLBACK DEBUG ===');
        console.log('📝 Full request URL:', req.url);
        console.log('📝 Query params:', JSON.stringify(req.query, null, 2));
        console.log('📝 Headers:', JSON.stringify(req.headers, null, 2));
        
        const { code, error, state } = req.query;
        
        if (error) {
            console.log('❌ Google sent error:', error);
            const webRedirect = process.env.WEB_REDIRECT_ERROR || 'http://localhost:3000/login';
            return res.redirect(`${webRedirect}?error=google_error_${error}`);
        }
        
        if (!code) {
            console.log('❌ Missing authorization code');
            return res.status(400).json({ message: 'Missing authorization code' });
        }

        // Log all environment variables (without secrets)
        console.log('🔧 Environment Configuration:');
        console.log('  GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
        console.log('  GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI);
        console.log('  GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET);
        console.log('  Server running on port:', process.env.PORT || '5000');

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI;

        if (!clientId || !clientSecret || !redirectUri) {
            throw new Error(`Missing config - ClientID: ${!!clientId}, Secret: ${!!clientSecret}, RedirectURI: ${!!redirectUri}`);
        }

        console.log('🔄 Making token exchange request...');
        console.log('  Code (first 20 chars):', code.substring(0, 20) + '...');
        console.log('  Client ID:', clientId);
        console.log('  Redirect URI:', redirectUri);

        // Create the exact request body
        const tokenRequestBody = new URLSearchParams({
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        });

        console.log('📤 Token request body:', tokenRequestBody.toString());

        // Make the token exchange request
        const tokenRes = await axios({
            method: 'POST',
            url: 'https://oauth2.googleapis.com/token',
            data: tokenRequestBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            timeout: 15000
        });

        console.log('✅ Token exchange successful!');
        console.log('📄 Response status:', tokenRes.status);
        console.log('📄 Response headers:', tokenRes.headers);
        console.log('📄 Response data keys:', Object.keys(tokenRes.data));

        const { id_token, access_token } = tokenRes.data || {};
        if (!id_token) {
            console.log('❌ Missing ID token in response');
            console.log('📄 Full response:', tokenRes.data);
            throw new Error('Failed to get ID token from Google');
        }

        // Decode the ID token
        const tokenParts = id_token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid ID token format');
        }

        const header = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString());
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

        console.log('🔍 ID Token Header:', header);
        console.log('👤 ID Token Payload:', {
            iss: payload.iss,
            aud: payload.aud,
            sub: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            exp: new Date(payload.exp * 1000).toISOString(),
            iat: new Date(payload.iat * 1000).toISOString()
        });

        // Validate the token
        if (payload.aud !== clientId) {
            console.log('❌ Audience mismatch!');
            console.log('  Expected:', clientId);
            console.log('  Actual:', payload.aud);
            throw new Error('Token audience mismatch');
        }

        if (payload.iss !== 'https://accounts.google.com') {
            console.log('❌ Issuer mismatch!');
            console.log('  Expected: https://accounts.google.com');
            console.log('  Actual:', payload.iss);
            throw new Error('Token issuer mismatch');
        }

        const { sub: googleId, email, name, picture } = payload;

        if (!googleId || !email) {
            throw new Error('Missing required user information');
        }

        console.log('✅ All token validations passed!');

        // Create JWT
        const baseUsername = email.split('@')[0];
        const jwtPayload = {
            provider: 'google',
            username: baseUsername,
            email,
            displayName: name || baseUsername,
            avatarUrl: picture || '',
            type: 'access'
        };
        
        console.log('🎫 Creating JWT with payload:', jwtPayload);
        const token = generateToken(jwtPayload);
        console.log('✅ JWT created successfully');

        const webRedirect = process.env.WEB_REDIRECT_SUCCESS || 'http://localhost:3000/dashboard';
        const redirectUrl = `${webRedirect}?token=${encodeURIComponent(token)}`;
        
        console.log('🚀 Redirecting to:', redirectUrl);
        console.log('🎉 === OAUTH SUCCESS ===');
        
        return res.redirect(302, redirectUrl);

    } catch (err) {
        console.error('💥 === OAUTH ERROR ===');
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
        
        if (err.response) {
            console.error('HTTP Status:', err.response.status);
            console.error('Response headers:', err.response.headers);
            console.error('Response data:', err.response.data);
            
            // Special handling for 401 errors
            if (err.response.status === 401 && err.response.data?.error === 'invalid_client') {
                console.error('🚨 INVALID_CLIENT ERROR - This is almost always a redirect URI mismatch!');
                console.error('Check these things in Google Cloud Console:');
                console.error('1. Client ID matches exactly:', process.env.GOOGLE_CLIENT_ID);
                console.error('2. Client Secret is correct');
                console.error('3. Redirect URI is EXACTLY:', process.env.GOOGLE_REDIRECT_URI);
                console.error('4. Application type is "Web application"');
                console.error('5. No extra spaces or characters in redirect URI');
            }
        }
        
        const webRedirect = process.env.WEB_REDIRECT_ERROR || 'http://localhost:3000/login';
        const redirectUrl = `${webRedirect}?error=google_oauth_failed&details=${encodeURIComponent(err.message)}`;
        return res.redirect(302, redirectUrl);
    }
};

// Test your JWT generation
exports.testJWT = (req, res) => {
    try {
        const testPayload = {
            provider: 'google',
            username: 'testuser',
            email: 'test@example.com',
            displayName: 'Test User',
            avatarUrl: '',
            type: 'access'
        };
        
        const token = generateToken(testPayload);
        console.log('✅ JWT generation test successful');
        res.json({ success: true, token, payload: testPayload });
    } catch (err) {
        console.error('❌ JWT generation failed:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};