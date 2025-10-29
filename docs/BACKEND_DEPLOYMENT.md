# Backend Deployment Guide

## Render Deployment

This backend is configured to deploy on Render and accept connections from the Vercel frontend.

### Automatic Deployment Setup

The project includes a `render.yaml` file in the root directory that enables automatic deployment.

If using Web Service (manual setup):
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`

### Environment Variables

Required:
- MONGO_URI
- JWT_SECRET

Optional (Google OAuth):
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REDIRECT_URI
- WEB_REDIRECT_SUCCESS
- WEB_REDIRECT_ERROR

CORS:
- FRONTEND_BASE_URL (and variants)

### CORS Configuration

Allowed origins include localhost and your production Vercel URL.

### Build and Deploy

1. Push code to GitHub (with `render.yaml`)
2. Render detects commits and deploys automatically if Auto-Deploy is enabled

### Troubleshooting

- Ensure Auto-Deploy is enabled
- Check `render.yaml` location
- Verify MongoDB connection string and env vars
- Match CORS origins with your frontend URL
