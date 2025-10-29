const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
        const decoded = jwt.verify(token, secret);

        // Check if user has admin privileges
        if (decoded.role === 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        req.user = decoded; // e.g. { id, username, role, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
