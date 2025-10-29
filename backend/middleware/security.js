const helmet = require('helmet');

// Security headers middleware using helmet
const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false
});

// Request sanitization middleware
const sanitizeInput = (req, res, next) => {
    // Remove potentially dangerous characters from string inputs
    const sanitizeString = (str) => {
        if (typeof str !== 'string') return str;
        return str.replaceAll(/[<>"'%;()&+]/g, '');
    };

    // Sanitize body parameters
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = sanitizeString(req.body[key]);
            }
        }
    }

    // Sanitize query parameters
    if (req.query) {
        for (const key in req.query) {
            if (typeof req.query[key] === 'string') {
                req.query[key] = sanitizeString(req.query[key]);
            }
        }
    }

    next();
};

module.exports = {
    securityHeaders,
    sanitizeInput
};
