const validationService = {
    validateInput: (data, requiredFields) => {
        const missing = requiredFields.filter(field => !data[field] || data[field].trim() === '');
        if (missing.length > 0) {
            return { valid: false, message: `Missing required fields: ${missing.join(', ')}` };
        }
        return { valid: true };
    },
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    validatePassword: (password) => {
        // Minimum 8 characters, at least one uppercase, lowercase, number, and special character
        const passwordRegex = /^[A-Za-z0-9@$!%*?&]*$/;
        return passwordRegex.test(password);
    }
};

module.exports = validationService;