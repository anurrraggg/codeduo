# Backend Deployment Guide

## Render Deployment

This backend is configured to deploy on Render and accept connections from the Vercel frontend.

### Environment Variables

Set these in your Render dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `PORT`: 5000 (or let Render set it automatically)

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (local development)
- `https://codeduo-psi.vercel.app` (production frontend)

### Build and Deploy

1. Push your code to GitHub
2. Connect your repository to Render
3. Set environment variables in Render dashboard
4. Render will automatically:
   - Install dependencies
   - Run `npm start`
   - Deploy your API

### API Endpoints

- **Base URL**: https://codeduo.onrender.com
- **Health Check**: GET /
- **Auth**: POST /api/auth/register, POST /api/auth/login
- **Quiz**: GET /api/quiz, POST /api/quiz
- **Leaderboard**: GET /api/leaderboard

## Troubleshooting

- Check Render logs for any startup errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set
- Check that CORS origins match your frontend URL
<<<<<<< HEAD
- If using Blueprint: Ensure the `render.yaml` file is in the repo root
=======
>>>>>>> da7a0a7c1647ec4779f411a7722c8ad7b8d001a9
