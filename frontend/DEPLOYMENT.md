# Frontend Deployment Guide

## Vercel Deployment

This frontend is configured to deploy on Vercel (codeduo-psi.vercel.app) and connect to the backend on Render.

### Environment Variables

The following environment variables are automatically set in `vercel.json`:
- `VITE_API_URL`: https://codeduo.onrender.com

### Build and Deploy

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically:
   - Install dependencies
   - Run `npm run build`
   - Deploy from the `dist` folder
   - Set up environment variables

### Local Development

For local development, create a `.env.local` file:
```
VITE_API_URL=http://localhost:5000
```

### API Connection

The frontend automatically connects to:
- **Production**: https://codeduo.onrender.com/api
- **Development**: http://localhost:5000/api (if .env.local exists)

## Troubleshooting

- If API calls fail, check that the backend is running on Render
- Verify CORS is properly configured on the backend
- Check browser console for any CORS errors
