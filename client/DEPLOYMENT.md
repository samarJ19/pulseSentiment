# Deployment Guide - Vercel

This guide will help you deploy the PulseSentiment client application on Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Backend API deployed (e.g., on Render)
- GitHub repository with your code

## Environment Variables

Before deploying, you'll need the following environment variable:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_MODE` | Build mode (DEV/PROD) | `PROD` |
| `VITE_API_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### 1. Import Your Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select the repository containing your client code

#### 2. Configure Project Settings

Vercel will auto-detect your Vite project. Verify these settings:

- **Framework Preset**: `Vite`
- **Root Directory**: `client` (if in monorepo, otherwise leave blank)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

#### 3. Add Environment Variables

In the **Environment Variables** section:

1. Click **"Add"**
2. Add the following variables:
   - **Name**: `VITE_MODE`, **Value**: `PROD`
   - **Name**: `VITE_API_URL`, **Value**: Your backend URL (e.g., `https://pulsesentiment-server.onrender.com/api`)

3. Select environment: **Production**, **Preview**, and **Development**

#### 4. Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build your React application
   - Deploy to a production URL
3. Your app will be live at: `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy

Navigate to the client directory and run:

```bash
cd client
vercel
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Choose your account
- **Link to existing project**: No (first time)
- **Project name**: pulsesentiment (or your preferred name)
- **Directory**: `./` (current directory)
- **Override settings**: No (unless needed)

#### 4. Set Environment Variables

```bash
vercel env add VITE_MODE
# Enter: PROD

vercel env add VITE_API_URL
# Enter: https://your-backend.onrender.com/api
```

#### 5. Deploy to Production

```bash
vercel --prod
```

## Post-Deployment

### 1. Test Your Deployment

Visit your Vercel URL: `https://your-project.vercel.app`

Test critical flows:
- Homepage loads correctly
- Login/Signup works
- Protected routes redirect properly
- API calls reach your backend

### 2. Update Backend CORS

Update your backend's `CLIENT_URL` environment variable on Render:

```
CLIENT_URL=https://your-project.vercel.app
```

This ensures your API accepts requests from your Vercel deployment.

### 3. Custom Domain (Optional)

1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Vercel auto-provisions SSL certificate

## Configuration Files

### vercel.json

The `vercel.json` file configures:
- **SPA Routing**: All routes redirect to `index.html` (required for React Router)
- **Cache Headers**: Optimized caching for static assets (1 year for `/assets/*`)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Environment Variables Explained

- **VITE_MODE**: 
  - `DEV`: Uses Vite proxy (`/api` → `http://localhost:3000`)
  - `PROD`: Uses `VITE_API_URL` directly
  
- **VITE_API_URL**: Full backend API URL with `/api` path

## Automatic Deployments

Vercel automatically deploys on every push to your Git repository:

- **Production**: Pushes to `main` branch → production deployment
- **Preview**: Pushes to other branches → preview deployment

### Managing Auto-Deployments

In **Settings** → **Git**:
- Configure production branch
- Enable/disable auto-deployments
- Set ignored build step conditions

## Troubleshooting

### Build Fails

**Error**: TypeScript compilation errors

**Solution**: 
```bash
cd client
npm run build
```
Fix any TypeScript errors locally before pushing.

---

**Error**: Missing dependencies

**Solution**: Ensure all dependencies are in `package.json` dependencies (not devDependencies for production packages).

### 404 Errors on Routes

**Error**: Direct navigation to routes (e.g., `/login`) shows 404

**Solution**: Ensure `vercel.json` exists with SPA rewrite configuration.

### CORS Errors

**Error**: API requests blocked by CORS

**Solution**: 
1. Verify `CLIENT_URL` in backend matches your Vercel URL
2. Check backend CORS configuration includes your Vercel domain
3. Ensure `withCredentials: true` is set in axios config

### Environment Variables Not Working

**Error**: API calls go to wrong URL

**Solution**:
1. Verify env vars are set in Vercel dashboard
2. All Vite env vars must be prefixed with `VITE_`
3. Redeploy after adding new env vars
4. Check in deployment logs that correct values are being used

### API Calls Fail

**Error**: Network errors when calling backend

**Solution**:
1. Ensure `VITE_API_URL` includes `/api` suffix
2. Verify backend is deployed and accessible
3. Check browser console for actual error
4. Test backend health endpoint directly

## Performance Optimization

### Enable Edge Caching

Vercel automatically caches static assets. For additional performance:

1. **Enable ISR** (if applicable): Not needed for pure SPA
2. **Optimize Images**: Use Vercel's Image Optimization
3. **Analyze Bundle**: Check bundle size in Vercel dashboard

### Build Analytics

Enable build analytics in Vercel dashboard:
1. Go to **Settings** → **Analytics**
2. Enable **Web Analytics**
3. Monitor performance metrics

## Environment Management

### Production Environment

```env
VITE_MODE=PROD
VITE_API_URL=https://pulsesentiment-server.onrender.com/api
```

### Preview Environment

Same as production, or use a staging backend:

```env
VITE_MODE=PROD
VITE_API_URL=https://pulsesentiment-staging.onrender.com/api
```

### Development Environment

```env
VITE_MODE=DEV
VITE_API_URL=http://localhost:3000/api
```

## Rollback

If a deployment has issues:

1. Go to **Deployments** tab
2. Find a previous working deployment
3. Click **"···"** → **"Promote to Production"**

## Monitoring

### View Logs

1. Go to your project dashboard
2. Click on a deployment
3. View **Build Logs** or **Function Logs**

### Set Up Alerts

In **Settings** → **Notifications**:
- Failed deployments
- Performance issues
- Error rate alerts

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Custom Domains](https://vercel.com/docs/custom-domains)
- [Environment Variables](https://vercel.com/docs/environment-variables)

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. 🔄 Update backend `CLIENT_URL` with Vercel URL
4. 🔄 Test end-to-end functionality
5. 🔄 Set up custom domain (optional)
6. 🔄 Enable analytics and monitoring
