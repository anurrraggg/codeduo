# Frontend API Configuration

## Issue: Can't Login or Signup

The frontend is currently pointing to `http://localhost:5000` which won't work in production.

## Solution: Set Production API URL

You need to tell your frontend where your production backend is located.

### For Vercel Deployment:

1. **Go to your Vercel Dashboard**
   - Visit https://vercel.com
   - Click on your project

2. **Go to Settings → Environment Variables**

3. **Add these environment variables:**
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://codeduo.onrender.com
   
   Name: NEXT_PUBLIC_BACKEND_URI
   Value: https://codeduo.onrender.com
   ```

4. **Redeploy your frontend**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## For Local Development:

Create a `.env.local` file in the `frontend/` directory:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URI=http://localhost:5000
```

---

## Test the Configuration

After setting environment variables, test if the frontend can reach the backend:

```bash
# From browser console, try:
fetch('https://codeduo.onrender.com/api/test')
  .then(r => r.text())
  .then(console.log)
```

Expected output: `"check"`

---

## Common Issues

### Issue 1: Frontend still connecting to localhost
**Solution:** 
- Make sure you added the environment variables
- Make sure you redeployed on Vercel
- Clear browser cache

### Issue 2: CORS errors
**Solution:** 
- Make sure your backend has the frontend URL in `FRONTEND_BASE_URL`
- Check Render dashboard → Settings → Environment → Add frontend URL

### Issue 3: 404 errors on auth endpoints
**Solution:**
- Verify the backend URL is correct
- Check Render logs to see if backend is running
- Test backend directly: `curl https://codeduo.onrender.com/api/test`

---

## Quick Checklist

- [ ] Set `NEXT_PUBLIC_API_URL` in Vercel environment variables
- [ ] Set `NEXT_PUBLIC_BACKEND_URI` in Vercel environment variables  
- [ ] Redeploy frontend on Vercel
- [ ] Test backend is accessible: `https://codeduo.onrender.com`
- [ ] Test frontend can reach backend (check browser network tab)


