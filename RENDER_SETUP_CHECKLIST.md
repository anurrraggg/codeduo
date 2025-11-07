# Render Auto-Start Setup Checklist

## ✅ What I Fixed

1. **Added Health Check Endpoint** (`/health`)
   - Render can use this to monitor service health
   - Returns service status, database connection, and uptime

2. **Improved Error Handling**
   - Server won't crash on startup errors
   - Database connection failures won't stop the server
   - Better logging for debugging

3. **Updated render.yaml**
   - Added `healthCheckPath: /health`
   - Added `autoDeploy: true`
   - Removed PORT override (Render sets this automatically)

4. **Better Server Configuration**
   - Server listens on `0.0.0.0` (required for Render)
   - Improved startup logging
   - Graceful shutdown handlers

## 🔧 Steps to Enable Auto-Start on Render

### Step 1: Enable Auto-Deploy in Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your `codeduo-backend` service
3. Go to **Settings** tab
4. Scroll to **Auto-Deploy** section
5. Make sure **Auto-Deploy** is **enabled** ✅
6. Click **Save Changes**

### Step 2: Verify render.yaml is in Repository

- ✅ File should be at: `/render.yaml` (repository root)
- ✅ Should contain `autoDeploy: true`
- ✅ Should have `healthCheckPath: /health`

### Step 3: Push Changes to GitHub

```bash
git add .
git commit -m "Fix Render auto-start configuration"
git push
```

### Step 4: Verify Auto-Deploy Works

1. After pushing, go to Render Dashboard
2. Check **Deploys** tab
3. You should see a new deploy starting automatically
4. Wait for it to complete (usually 2-5 minutes)

## ⚠️ Important Notes

### Free Tier Behavior

**Render's free tier services automatically sleep after 15 minutes of inactivity.**

This is **normal behavior**, not a bug:
- ✅ Service **auto-starts** when you push code (if auto-deploy is enabled)
- ⚠️ Service **sleeps** after 15 minutes of no requests
- ⚠️ First request after sleep takes 10-30 seconds (cold start)
- ✅ Subsequent requests are fast

### Solutions

1. **Auto-Deploy** (Free) - Service auto-starts on code push ✅
2. **Upgrade to Paid** ($7/month) - Service stays awake 24/7
3. **External Ping** (Not recommended) - Use monitoring service to ping every 10-14 minutes

## 🧪 Test Your Setup

### Test Health Endpoint

```bash
curl https://your-service.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "database": "connected",
  "environment": "production"
}
```

### Test Auto-Deploy

1. Make a small change (e.g., add a comment)
2. Commit and push
3. Check Render Dashboard → Deploys
4. Should see automatic deploy starting

## 📋 Environment Variables Checklist

Make sure these are set in Render Dashboard → Environment:

- ✅ `MONGO_URI` - Your MongoDB connection string
- ✅ `JWT_SECRET` - Your JWT secret key
- ✅ `NODE_ENV` - Set to `production` (already in render.yaml)
- ⚠️ `PORT` - **Don't set this** - Render sets it automatically

Optional (for OAuth):
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `WEB_REDIRECT_SUCCESS`
- `WEB_REDIRECT_ERROR`

## 🐛 Troubleshooting

### Service Not Auto-Starting

1. **Check Auto-Deploy**:
   - Render Dashboard → Settings → Auto-Deploy should be **enabled**

2. **Check render.yaml**:
   - Should be in repository root
   - Should have `autoDeploy: true`

3. **Check Service Status**:
   - Service might be "Suspended"
   - Resume it in Settings

### Service Sleeping (Free Tier)

This is **normal** - free tier services sleep after 15 minutes.

**Solutions**:
- Accept the cold start delay (10-30 seconds)
- Upgrade to paid plan for 24/7 uptime

### Build Fails

1. Check Render logs for errors
2. Verify all dependencies in `package.json`
3. Check environment variables are set
4. Verify `MONGO_URI` is correct

## 📚 More Information

See `backend/RENDER_AUTO_START_GUIDE.md` for detailed information.

## ✅ Summary

- ✅ **Auto-deploy enabled** in render.yaml
- ✅ **Health check endpoint** added
- ✅ **Error handling** improved
- ✅ **Server configuration** optimized for Render
- ⚠️ **Free tier sleeps** after 15 minutes (normal behavior)
- ✅ **Service auto-starts** on code push (if auto-deploy enabled)

