# Render Auto-Start Guide

## Why Your Service Isn't Auto-Starting

Render's **free tier** services automatically **spin down after 15 minutes of inactivity**. This is expected behavior, not a bug. When a request comes in, the service automatically wakes up (this takes a few seconds).

## Solutions

### Option 1: Enable Auto-Deploy (Recommended)

1. Go to your Render Dashboard
2. Select your `codeduo-backend` service
3. Go to **Settings** tab
4. Scroll to **Auto-Deploy** section
5. Make sure **Auto-Deploy** is **enabled**
6. Save changes

Now, whenever you push to your GitHub repository, Render will automatically:
- Detect the changes
- Build and deploy your service
- Start it automatically

### Option 2: Upgrade to Paid Plan (Always On)

If you need your service to stay awake 24/7:
1. Go to Render Dashboard
2. Select your service
3. Go to **Settings** → **Change Instance Type**
4. Upgrade to **Starter** plan ($7/month)
5. Paid plans don't spin down due to inactivity

### Option 3: Use Health Check (Free Tier Workaround)

The service now includes a `/health` endpoint that Render can ping. However, **free tier services will still spin down** after 15 minutes of no requests.

To keep it awake (not recommended for production):
- Set up an external monitoring service (like UptimeRobot) to ping `/health` every 10-14 minutes
- This keeps the service awake but may violate Render's terms of service

## Current Configuration

✅ **Health Check Endpoint**: `/health`
- Returns service status, database connection, and uptime
- Render can use this for health monitoring

✅ **Auto-Deploy**: Enabled in `render.yaml`
- Service will auto-deploy on git push

✅ **Error Handling**: Improved
- Service won't crash on startup errors
- Database connection failures won't stop the server

## Troubleshooting

### Service Not Starting After Deploy

1. **Check Render Logs**:
   - Go to Render Dashboard → Your Service → Logs
   - Look for error messages

2. **Check Environment Variables**:
   - Ensure `MONGO_URI` is set
   - Ensure `JWT_SECRET` is set
   - `PORT` is automatically set by Render (don't override)

3. **Check Build Logs**:
   - Look for npm install errors
   - Verify all dependencies are installed

### Service Sleeping (Free Tier)

This is **normal behavior** for free tier:
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes 10-30 seconds to wake up
- Subsequent requests are fast

**Solution**: Upgrade to paid plan or accept the cold start delay

### Manual Start Required

If you have to manually start every time:

1. **Check Auto-Deploy**:
   - Settings → Auto-Deploy should be **enabled**

2. **Check render.yaml**:
   - File should be in repository root
   - `autoDeploy: true` should be set

3. **Check Service Status**:
   - Service might be in "Suspended" state
   - Go to Settings → Resume service

## Testing Auto-Start

1. Make a small change to your code
2. Commit and push to GitHub
3. Check Render Dashboard → Deploys
4. You should see a new deploy starting automatically
5. Wait for it to complete
6. Test your API endpoint

## Health Check Endpoint

Test the health endpoint:
```bash
curl https://your-service.onrender.com/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "database": "connected",
  "environment": "production"
}
```

## Best Practices

1. ✅ **Enable Auto-Deploy** in Render dashboard
2. ✅ **Keep render.yaml** in repository root
3. ✅ **Set all required environment variables**
4. ✅ **Monitor logs** for errors
5. ✅ **Use health check** endpoint for monitoring
6. ⚠️ **Accept cold starts** on free tier (or upgrade)

## Summary

- **Free tier services sleep** after 15 minutes - this is normal
- **Auto-deploy** ensures new code deploys automatically
- **Health check** endpoint helps with monitoring
- **Upgrade to paid** if you need 24/7 uptime

