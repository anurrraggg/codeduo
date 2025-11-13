const validationService = require('../services/validationService');

const validateRequest = (requiredFields = [], optionalValidation = {}) => {
    return (req, res, next) => {
        try {
            // Check for required fields
            if (requiredFields.length > 0) {
                const validation = validationService.validateInput(req.body, requiredFields);
                if (!validation.valid) {
                    return res.status(400).json({
                        success: false,
                        message: validation.message
                    });
                }
            }

            // Additional validation rules
            if (optionalValidation.email && req.body.email) {
                if (!validationService.validateEmail(req.body.email)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid email format'
                    });
                }
            }

            if (optionalValidation.password && req.body.password) {
                if (!validationService.validatePassword(req.body.password)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
                    });
                }
            }

            // Sanitize inputs
            if (req.body.username) {
                req.body.username = req.body.username.trim();
            }
            if (req.body.email) {
                req.body.email = req.body.email.trim().toLowerCase();
            }
            if (req.body.displayName) {
                req.body.displayName = req.body.displayName.trim();
            }

            next();
        } catch (error) {
            console.error('Validation middleware error:', error);
            return res.status(500).json({
                success: false,
                message: 'Validation error'
            });
        }
    };
};

module.exports = validateRequest;
