# Backend Deployment Guide

## Render Deployment

This backend is configured to deploy on Render and accept connections from the Vercel frontend.

### Automatic Deployment Setup

The project includes a `render.yaml` file in the root directory that enables automatic deployment.

**To set up automatic deployment on Render:**

1. Go to your Render dashboard
2. Click "New +" → "Blueprint" or "Web Service"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. If using Web Service (manual setup):
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: (leave empty or set to root)
6. Enable "Auto-Deploy" in your Render service settings

### Environment Variables

Set these in your Render dashboard (Settings → Environment):

**Required:**
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A random secret string (e.g., use `openssl rand -base64 32`)

**Optional (for Google OAuth):**
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
- `GOOGLE_REDIRECT_URI`: `https://your-backend.onrender.com/api/auth/google/callback`
- `WEB_REDIRECT_SUCCESS`: Your frontend success redirect URL
- `WEB_REDIRECT_ERROR`: Your frontend error redirect URL

**Frontend URLs (for CORS):**
- `FRONTEND_BASE_URL`: `https://your-frontend.vercel.app`
- `FRONTEND_BASE_URL_2`: Additional frontend URL (optional)
- `FRONTEND_ORIGINS`: Comma-separated list of allowed origins

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (local development)
- `http://localhost:3000` (local Next.js)
- `https://codeduo-psi.vercel.app` (production frontend)
- Any URLs specified in `FRONTEND_BASE_URL` environment variables

### Build and Deploy

1. Push your code to GitHub (with the `render.yaml` file)
2. Render will automatically:
   - Detect new commits
   - Run the build command
   - Install dependencies
   - Run `npm start`
   - Deploy your API

**Note:** If auto-deploy isn't working:
- Check that "Auto-Deploy" is enabled in Render settings
- Verify the `render.yaml` file is in the repository root
- Check Render logs for deployment errors

### API Endpoints

- **Base URL**: https://your-backend.onrender.com
- **Health Check**: GET /
- **Auth**: 
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me (protected)
  - PUT /api/auth/me (protected)

### Troubleshooting

- **Manual deployment required**: Enable "Auto-Deploy" in your Render service settings
- Check Render logs for any startup errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set
- Check that CORS origins match your frontend URL
- If using Blueprint: Ensure the `render.yaml` file is in the repo root