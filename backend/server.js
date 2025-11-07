const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('node:path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const rateLimit = require('./middleware/rateLimit');
const { securityHeaders, sanitizeInput } = require('./middleware/security');

const attemptsRoutes = require('./routes/attemptsRoutes');
const authRoutes = require('./routes/authRoutes');
const badgesRoutes = require('./routes/badgesRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const lessonsRoutes = require('./routes/lessonsRoutes');
const optionsRoutes = require('./routes/optionsRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userBadgesRoutes = require('./routes/userBadgesRoutes');


dotenv.config();
// Load fallback env file if present (backend/env)
dotenv.config({ path: path.resolve(__dirname, 'env') });
const app = express();



// Middleware
const defaultAllowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://codeduo-psi.vercel.app',
    'https://codeduojs.vercel.app'
];

const envOrigins = [];
if (process.env.FRONTEND_BASE_URL) envOrigins.push(process.env.FRONTEND_BASE_URL);
if (process.env.FRONTEND_BASE_URL_2) envOrigins.push(process.env.FRONTEND_BASE_URL_2);
if (process.env.FRONTEND_ORIGINS) {
    envOrigins.push(
        ...process.env.FRONTEND_ORIGINS
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
    );
}

const allowedOrigins = new Set([...defaultAllowedOrigins, ...envOrigins]);

app.use(cors({
    origin: function (origin, callback) {
        // Allow non-browser requests (e.g., curl, server-to-server) where origin may be undefined
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS')); 
    },
    credentials: true
}));

// Rate limiting
app.use(rateLimit(15 * 60 * 1000, 100)); // 100 requests per 15 minutes

// Security middleware
app.use(securityHeaders);
app.use(sanitizeInput);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static serving for uploaded files (e.g., avatars)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB - Connect asynchronously (server will start even if DB takes time)
connectDB().catch(err => {
    console.error('Database connection error:', err.message);
    // Server will still start, but DB operations will fail
});

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.get('/api/test', (req, res) => res.send('check'));

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/badges', badgesRoutes);
app.use('/api/attempts', attemptsRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/options', optionsRoutes);
app.use('/api/user-badges', userBadgesRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
    } else {
        console.error('❌ Server error:', error);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
