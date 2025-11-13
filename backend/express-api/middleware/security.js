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
    // Fields that should not be sanitized (e.g., passwords, tokens, emails)
    const skipSanitization = ['password', 'passwordHash', 'token', 'resetPasswordToken', 'email', 'code'];
    
    // Remove potentially dangerous characters from string inputs
    // More selective: only remove characters that are truly dangerous for XSS/SQL injection
    const sanitizeString = (str, fieldName = '') => {
        if (typeof str !== 'string') return str;
        
        // Skip sanitization for specific fields
        if (skipSanitization.includes(fieldName.toLowerCase())) {
            return str;
        }
        
        // Remove only truly dangerous characters: < > " ' % ; 
        // Keep: () & + which are needed for legitimate inputs
        return str.replaceAll(/[<>"';%]/g, '');
    };

    // Sanitize body parameters
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = sanitizeString(req.body[key], key);
            }
        }
    }

    // Sanitize query parameters
    if (req.query) {
        for (const key in req.query) {
            if (typeof req.query[key] === 'string') {
                req.query[key] = sanitizeString(req.query[key], key);
            }
        }
    }

    next();
};

module.exports = {
    securityHeaders,
    sanitizeInput
};
