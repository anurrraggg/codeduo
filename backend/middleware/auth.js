const jwt = require('jsonwebtoken');

const authMiddleware = function (req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'No token provided' 
        });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is required');
        }
        
        const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
        
        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ 
                success: false,
                message: 'Token expired' 
            });
        }
        
        req.user = decoded;
        next();
} catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token' 
    });
}
};

module.exports = authMiddleware;