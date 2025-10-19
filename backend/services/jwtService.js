const jwt = require('jsonwebtoken');

export const jwtService = {
    generateToken: (payload, expiresIn = process.env.JWT_EXPIRES || '2h') => {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is required');
        }
        // Add algorithm specification to prevent algorithm confusion attacks
        return jwt.sign(payload, secret, {
            expiresIn,
            algorithm: 'HS256'
        });
    }
}