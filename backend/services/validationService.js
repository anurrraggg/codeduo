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
        return typeof password === 'string';
    }
};

module.exports = validationService;