# Pre-Deployment Checklist

Before deploying to Vercel, ensure you have completed the following:

## Code Preparation

- [x] Created `vercel.json` for SPA routing
- [x] Added `vercel.json` cache headers for assets
- [x] Created `.env.example` with required variables
- [x] Updated `.gitignore` for Vercel
- [ ] Verified all routes work with React Router
- [ ] Tested build locally

## Environment Variables Ready

- [ ] `VITE_MODE` - Set to `PROD`
- [ ] `VITE_API_URL` - Backend API URL (must include `/api`)

## Backend Integration

- [ ] Backend is deployed and accessible
- [ ] Backend health endpoint returns 200 OK
- [ ] Backend CORS is configured for production URL
- [ ] Backend `CLIENT_URL` will be updated after frontend deployment

## Testing

- [ ] `npm install` completes without errors
- [ ] `npm run build` compiles successfully
- [ ] `npm run preview` runs the production build locally
- [ ] All pages load correctly in preview
- [ ] Login/Signup flows work
- [ ] Protected routes require authentication
- [ ] API calls reach backend successfully
- [ ] No console errors

## Vercel Configuration

- [ ] Created Vercel account
- [ ] Connected GitHub repository
- [ ] Selected correct root directory (if monorepo)
- [ ] Framework preset: `Vite`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] All environment variables added
- [ ] Enabled auto-deploy from main branch

## Post-Deployment

- [ ] Deployment completed successfully
- [ ] Build logs show no errors
- [ ] Homepage loads: `https://your-project.vercel.app`
- [ ] All routes accessible (no 404s)
- [ ] Updated backend `CLIENT_URL` with Vercel URL
- [ ] Tested login from production
- [ ] Tested signup from production
- [ ] Tested protected routes from production
- [ ] CORS working correctly
- [ ] No console errors in production

## Optional Enhancements

- [ ] Set up custom domain
- [ ] Enable Vercel Analytics
- [ ] Configure preview deployments
- [ ] Set up deployment notifications
- [ ] Add OG meta tags for social sharing
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Set up monitoring/error tracking

## Common Issues Checklist

### If Routes Return 404:
- [ ] `vercel.json` exists in root
- [ ] Rewrites configuration is correct
- [ ] Rebuild and redeploy

### If API Calls Fail:
- [ ] `VITE_API_URL` includes `/api` suffix
- [ ] Backend `CLIENT_URL` matches Vercel URL
- [ ] Backend CORS allows Vercel domain
- [ ] Check browser Network tab for actual errors

### If Build Fails:
- [ ] Run `npm run build` locally
- [ ] Fix all TypeScript errors
- [ ] Ensure all imports are correct
- [ ] Check for missing dependencies

### If Environment Variables Don't Work:
- [ ] Variables are prefixed with `VITE_`
- [ ] Variables are set in Vercel dashboard
- [ ] Redeployed after adding variables
- [ ] Not using process.env directly (use import.meta.env)

## Pre-Deploy Test Commands

Run these locally before deploying:

```bash
# Install dependencies
npm install

# Check for TypeScript errors
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173 and test all features
```

## Quick Deploy Commands

### First Deployment:
```bash
cd client
vercel
```

### Production Deployment:
```bash
vercel --prod
```

### Check Deployment Status:
```bash
vercel ls
```

### View Logs:
```bash
vercel logs [deployment-url]
```
