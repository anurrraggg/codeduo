const jwt = require('jsonwebtoken');
const axios = require('axios');
const authService = require('../services/authService');

const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES || '2h') => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is required');
    }
    // Add algorithm specification to prevent algorithm confusion attacks
    return jwt.sign(payload, secret, {
        expiresIn,
        algorithm: 'HS256'
    });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        const response = await authService.register({ username, email, password, isAdmin });
        if(!response.success) {
            res.status(response.status).json({ message: response.message });
        }
        res.status(201).json({ token: response.token, user: response.user });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        const response = await authService.login({ emailOrUsername, password });
        if(!response.success) {
            res.status(response.status).json({ message: response.message })
        }
        res.status(200).json({ token: response.token, user: response.user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error: '+err });
    }
};

exports.me = async (req, res) => {
    try {
        const response = await authService.me(req.user);
        
        if(!response.success) {
            return res.status(response.status).json({ message: response.message});
        }

        return res.status(200).json({ user: response.user });
    } catch (err) {
        console.error('Me endpoint error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { user, displayName, avatarUrl } = req.body;

        const response = await authService.updateProfile(user, displayName, avatarUrl);
        if(!response.success) {
            return res.status(response.status).json({ message: response.message});
        }
        res.status(200).json({ user: response.user });
    } catch (err) {
        console.error('Profile update error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Google OAuth
exports.googleAuthUrl = async (req, res) => {
    try {
        const response = authService.googleAuthUrl(req.query);
        
        return res.status(200).json({ url: response.url });
    } catch (err) {
        console.error('Auth URL generation error:', err);
        return res.status(500).json({ message: 'Failed to create Google auth URL', error: err });
    }
};

// Replace your googleCallback function with this corrected version
exports.googleCallback = async (req, res) => {
    try {
        const { code, error } = req.query;

        const response = await authService.googleCallback(res.query, code, error);

        if(!response.success && response.redirect) {
            return res.status(response.status).redirect(response.redirect);
        } else if(!response.success) {
            return res.status(response.status).json({ message: response.message });
        }

        return res.status(302).redirect(response.redirect);
    } catch (err) {
        console.error('💥 Google OAuth error:', err.message);
        const webRedirect =
            process.env.WEB_REDIRECT_ERROR ||
            (process.env.FRONTEND_BASE_URL ? `${process.env.FRONTEND_BASE_URL}/login` : 'http://localhost:3000/login');
        return res.redirect(`${webRedirect}?error=google_oauth_failed&details=${encodeURIComponent(err.message)}`);
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