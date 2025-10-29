const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error for debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
    });

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { message, statusCode: 404 };
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field} already exists`;
        error = { message, statusCode: 409 };
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = { message, statusCode: 400 };
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = { message, statusCode: 401 };
    }

    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = { message, statusCode: 401 };
    }

    // Axios errors (for external API calls)
    if (err.isAxiosError) {
        if (err.response) {
            // Server responded with error status
            error = {
                message: 'External service error',
                statusCode: err.response.status || 500
            };
        } else if (err.request) {
            // Request was made but no response received
            error = {
                message: 'External service unavailable',
                statusCode: 503
            };
        } else {
            // Something else happened
            error = {
                message: 'External service error',
                statusCode: 500
            };
        }
    }

    // Default to 500 server error
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    // Don't expose internal errors in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    const response = {
        success: false,
        message: isDevelopment ? message : 'Something went wrong',
        ...(isDevelopment && { stack: err.stack })
    };

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
