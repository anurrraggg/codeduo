# Fix Login and Signup Issues

## Problem
- ❌ Can't login through Google
- ❌ Can't signup

## Root Causes Found & Fixed

### 1. ✅ Fixed: Google Auth URL Controller
**Issue:** Controller was passing undefined variables to service
**Fixed:** Now correctly passes `req.query` to service

### 2. ✅ Fixed: Google Callback Controller  
**Issue:** Was using `res.query` instead of `req.query`
**Fixed:** Now correctly uses `req.query`

### 3. ⚠️ Frontend API URL Issue
**Issue:** Frontend may be pointing to localhost instead of production backend
**Solution:** See configuration steps below

---

## Steps to Fix Everything

### Step 1: Configure Frontend to Point to Production Backend

The frontend needs to know where your production backend is. 

#### For Vercel (Production):

1. Go to https://vercel.com
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NEXT_PUBLIC_API_URL = https://codeduo.onrender.com
NEXT_PUBLIC_BACKEND_URI = https://codeduo.onrender.com
```

5. **Save** the variables
6. **Redeploy** your frontend:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

#### For Local Development:

Create a file `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URI=http://localhost:5000
```

Then restart your dev server.

---

### Step 2: Deploy Fixed Backend

The backend code has been fixed. Now deploy it:

```bash
# Commit the changes
git add backend/controllers/authController.js
git commit -m "Fix login and signup issues"
git push origin main
```

**If auto-deploy is enabled on Render**, it will automatically deploy.

**If not**, go to Render dashboard and manually deploy.

---

### Step 3: Configure Environment Variables on Render

Make sure these are set in your Render backend:

**Required:**
```
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
```

**For Google OAuth (optional):**
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=https://codeduo.onrender.com/api/auth/google/callback
WEB_REDIRECT_SUCCESS=https://your-frontend.vercel.app/oauth/callback
WEB_REDIRECT_ERROR=https://your-frontend.vercel.app/login
FRONTEND_BASE_URL=https://your-frontend.vercel.app
```

---

### Step 4: Test the Backend

Test that the backend is working:

```bash
# Test health check
curl https://codeduo.onrender.com

# Test registration endpoint (should return error without auth, but not crash)
curl -X POST https://codeduo.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{}'

# Should return validation error, not 500 error
```

---

### Step 5: Test Signup

Try signing up with a test user:

1. Go to your frontend URL (on Vercel)
2. Click "Sign Up"
3. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test123!@#` (min 8 chars, uppercase, lowercase, number, special char)
4. Click "Create Account"

**Expected:** Should create account and redirect to dashboard

**If Error:** Check browser console and network tab for details

---

### Step 6: Test Login

1. Go to login page
2. Enter your credentials
3. Click "Sign In"

**Expected:** Should log you in and redirect to dashboard

---

### Step 7: Test Google Login (Optional)

If you've configured Google OAuth:

1. Go to login page
2. Click "Continue with Google"
3. Sign in with Google

**Expected:** Should redirect to Google, then back to your app

---

## Troubleshooting

### Issue: "Network Error" or "Failed to fetch"
**Cause:** Frontend can't reach backend
**Solution:**
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running at https://codeduo.onrender.com
- Check CORS settings in backend

### Issue: "Invalid email or password"
**Cause:** User doesn't exist or wrong password
**Solution:**
- Make sure you registered first
- Check the password meets requirements
- Check database for user existence

### Issue: "Username or email already in use"
**Cause:** Trying to register with existing credentials
**Solution:**
- Use different username/email
- Or use login instead of signup

### Issue: Google OAuth doesn't work
**Cause:** Google OAuth not configured
**Solution:**
- Set up Google OAuth in Google Cloud Console
- Add environment variables to Render
- Configure redirect URIs correctly

### Issue: 500 Internal Server Error
**Cause:** Backend error (should be fixed now)
**Solution:**
- Check Render logs for details
- Verify environment variables are set
- Make sure MongoDB is connected

---

## Summary of Fixes Applied

✅ Fixed `googleAuthUrl` controller - now correctly passes query parameters
✅ Fixed `googleCallback` controller - now uses `req.query` instead of `res.query`
✅ Fixed variable destructuring in authService
✅ Fixed return statements to prevent multiple responses
✅ Fixed MongoDB query syntax in repositories
✅ Updated documentation with configuration steps

---

## Next Steps After Fix

1. ✅ Set environment variables in Vercel
2. ✅ Redeploy frontend
3. ✅ Verify backend is deployed with fixes
4. ✅ Test signup
5. ✅ Test login
6. ✅ (Optional) Configure and test Google OAuth

---

## Need More Help?

Check these files for more details:
- `FRONTEND_API_CONFIG.md` - Frontend configuration
- `AUTOMATIC_DEPLOYMENT_SETUP.md` - Auto-deployment setup
- `DEPLOYMENT_STATUS.md` - Current deployment status


