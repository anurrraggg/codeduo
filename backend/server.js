const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

const attemptsRoutes = require('./routes/attemptsRoutes');
const authRoutes = require('./routes/authRoutes');
const badgesRoutes = require('./routes/badgesRoutes');
const leaderboardRoutes =require('./routes/leaderboardRoutes');
const lessonsRoutes = require('./routes/lessonsRoutes');
const optionsRoutes = require('./routes/optionsRoutes');
const questionsRoutes = require('./routes/questionsRoutes');
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

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envOrigins])];

app.use(cors({
    origin: function (origin, callback) {
        // Allow non-browser requests (e.g., curl, server-to-server) where origin may be undefined
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS')); 
    },
    credentials: true
}));
app.use(express.json());

// DB
connectDB();

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.get('/api/test', (req, res) => res.send('check'));

app.use('/api/attempts', attemptsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/badges',badgesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/lessons',lessonsRoutes);
app.use('/api/options',optionsRoutes);
app.use('/api/questions',questionsRoutes);
app.use('/api/quiz',quizRoutes);
app.use('/api/user-badges',userBadgesRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));