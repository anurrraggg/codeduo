const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
// Load fallback env file if present (backend/env)
dotenv.config({ path: path.resolve(__dirname, 'env') });
const app = express();

// Middleware
app.use(cors(
    {
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://codeduo-psi.vercel.app',
            'https://codeduojs.vercel.app'
        ],
        credentials: true
    }
));
app.use(express.json());

// DB
connectDB();

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.get('/api/test', (req, res) => res.send('check'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));