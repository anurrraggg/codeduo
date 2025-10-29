# Frontend API Configuration

## Issue: Can't Login or Signup

The frontend is currently pointing to http://localhost:5000 which won't work in production.

## Solution: Set Production API URL

You need to tell your frontend where your production backend is located.

### For Vercel Deployment:

1. Go to your Vercel Dashboard
2. Settings -> Environment Variables
3. Add these environment variables:
```
NEXT_PUBLIC_API_URL=https://codeduo.onrender.com
NEXT_PUBLIC_BACKEND_URI=https://codeduo.onrender.com
```
4. Redeploy your frontend

## For Local Development:

Create a .env.local file in the frontend/ directory:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URI=http://localhost:5000
```

## Test the Configuration

After setting environment variables, test if the frontend can reach the backend:

```bash
# From browser console, try:
fetch('https://codeduo.onrender.com/api/test')
  .then(r => r.text())
  .then(console.log)
```

Expected output: "check"

## Common Issues

- Frontend still connecting to localhost: ensure env vars set and redeploy
- CORS errors: ensure backend FRONTEND_BASE_URL is correct
- 404 on auth endpoints: verify backend URL and service status

## Quick Checklist

- [ ] Set NEXT_PUBLIC_API_URL
- [ ] Set NEXT_PUBLIC_BACKEND_URI
- [ ] Redeploy frontend on Vercel
- [ ] Test backend is accessible: https://codeduo.onrender.com
- [ ] Verify network calls in browser devtools
