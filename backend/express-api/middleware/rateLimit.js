// Simple in-memory rate limiter
const rateLimitMap = new Map();

const rateLimit = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
    return (req, res, next) => {
        const clientId = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = now - windowMs;

        // Clean up old entries
        for (const [key, data] of rateLimitMap.entries()) {
            if (data.windowStart < windowStart) {
                rateLimitMap.delete(key);
            }
        }

        // Get or create client data
        let clientData = rateLimitMap.get(clientId);
        if (!clientData || clientData.windowStart < windowStart) {
            clientData = {
                requests: 0,
                windowStart: now
            };
            rateLimitMap.set(clientId, clientData);
        }

        // Check if limit exceeded
        if (clientData.requests >= maxRequests) {
            return res.status(429).json({
                success: false,
                message: 'Too many requests, please try again later',
                retryAfter: Math.ceil((clientData.windowStart + windowMs - now) / 1000)
            });
        }

        // Increment request count
        clientData.requests++;

        // Add rate limit headers
        res.set({
            'X-RateLimit-Limit': maxRequests,
            'X-RateLimit-Remaining': Math.max(0, maxRequests - clientData.requests),
            'X-RateLimit-Reset': new Date(clientData.windowStart + windowMs).toISOString()
        });

        next();
    };
};

module.exports = rateLimit;
