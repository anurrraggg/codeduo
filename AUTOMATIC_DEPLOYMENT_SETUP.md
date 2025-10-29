# Automatic Deployment Setup for Render

## Problem
Having to manually deploy your backend on Render after every git push.

## Solution
Set up automatic deployment using Render's Blueprint or enable Auto-Deploy feature.

---

## Method 1: Using Blueprint (Recommended - Easiest)

This method uses the `render.yaml` configuration file we just created.

### Steps:

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in to your account

2. **Create a Blueprint**
   - Click "New +" button
   - Select "Blueprint"
   - Connect your GitHub repository
   - Select the repository containing the `render.yaml` file

3. **Review Configuration**
   - Render will automatically detect the `render.yaml` file
   - Review the settings
   - Click "Apply"

4. **Set Environment Variables**
   - In your newly created service, go to "Settings"
   - Scroll to "Environment Variables"
   - Add the following variables:

   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/codeduo
   JWT_SECRET=your-secure-random-secret-here
   FRONTEND_BASE_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - The service will start deploying automatically
   - Wait for the deployment to complete

6. **Enable Auto-Deploy** (if not already enabled)
   - Go to your service in Render
   - Go to Settings
   - Make sure "Auto-Deploy" is enabled
   - Set it to deploy on pushes to `main` branch (or your default branch)

---

## Method 2: Using Web Service (Manual Setup)

If you prefer to configure everything manually:

### Steps:

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in to your account

2. **Create a Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure the Service**
   - **Name**: codeduo-backend (or any name you prefer)
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Region**: Choose the closest to your MongoDB (e.g., Oregon, US)
   - **Branch**: main (or your default branch)

4. **Enable Auto-Deploy**
   - Under "Environment", find "Auto-Deploy"
   - Make sure it's set to "Yes"
   - This will automatically deploy on every push to the branch

5. **Set Environment Variables**
   - Scroll down to "Environment Variables"
   - Click "Add Environment Variable"
   - Add each variable as follows:

   **Required Variables:**
   - Key: `MONGO_URI`, Value: Your MongoDB connection string
   - Key: `JWT_SECRET`, Value: A secure random string
   - Key: `NODE_ENV`, Value: `production`

   **Optional (for OAuth):**
   - Key: `GOOGLE_CLIENT_ID`, Value: Your Google Client ID
   - Key: `GOOGLE_CLIENT_SECRET`, Value: Your Google Client Secret
   - Key: `GOOGLE_REDIRECT_URI`, Value: `https://your-service-name.onrender.com/api/auth/google/callback`
   - Key: `FRONTEND_BASE_URL`, Value: Your frontend URL
   - Key: `WEB_REDIRECT_SUCCESS`, Value: Your frontend success redirect
   - Key: `WEB_REDIRECT_ERROR`, Value: Your frontend error redirect

6. **Save Changes**
   - Click "Create Web Service"
   - The deployment will start automatically

---

## Verify Auto-Deploy is Working

After setup, test the automatic deployment:

1. **Make a small change** to your backend code
   - For example, update a comment or console.log message
   
2. **Commit and push** to your repository:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```

3. **Check Render Dashboard**
   - Go to your service in Render
   - You should see a new deployment starting automatically
   - Wait for it to complete (usually takes 2-3 minutes)

4. **Verify the changes are live**
   - Check your API endpoint
   - Your changes should be reflected

---

## Troubleshooting

### Issue: Still having to manually deploy

**Solution:** Check these settings:
1. Go to your service settings in Render
2. Under "Build & Deploy"
3. Make sure "Auto-Deploy" is set to "Yes"
4. Verify the branch is correct (usually `main` or `master`)

### Issue: Build fails

**Solution:** Check the logs:
1. Go to your service in Render
2. Click "Logs" tab
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - MongoDB connection issues
   - Node version incompatibility

### Issue: Changes not reflecting

**Solution:**
1. Make sure you pushed to the correct branch
2. Wait for the deployment to complete (check the "Events" tab)
3. Clear your browser cache if testing endpoints

---

## After Setup

Once automatic deployment is working:

✅ **Every time you push to your repository**, Render will automatically:
- Detect the changes
- Run the build command
- Install dependencies
- Start the server
- Deploy the new version

You'll never need to manually deploy again!

---

## Quick Reference

**Build Command**: `cd backend && npm install`
**Start Command**: `cd backend && npm start`
**Service Type**: Web Service
**Runtime**: Node
**Branch**: main (or your default branch)

**Important Environment Variables:**
- `MONGO_URI` (Required)
- `JWT_SECRET` (Required)
- `FRONTEND_BASE_URL` (Recommended)
- `GOOGLE_CLIENT_ID` (Optional, for OAuth)
- `GOOGLE_CLIENT_SECRET` (Optional, for OAuth)

---

## Need Help?

If you're still experiencing issues:
1. Check Render documentation: https://render.com/docs
2. Review the deployment logs in Render dashboard
3. Verify your `render.yaml` file is in the repository root
4. Ensure all environment variables are set correctly
