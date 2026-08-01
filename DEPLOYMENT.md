# Deployment Guide

This guide provides step-by-step instructions for deploying Riya - Real Estate AI Calling Agent to production using free hosting services.

## Prerequisites

Before deploying, ensure you have:

- A free Groq API key from [console.groq.com](https://console.groq.com/keys)
- GitHub account with the project repository pushed
- Render account (free tier) - [render.com](https://render.com)
- Vercel account (free tier) - [vercel.com]

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up for a free account
3. Verify your email address

### 1.2 Connect GitHub Repository

1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Click "Connect GitHub" (if not already connected)
4. Authorize Render to access your GitHub repository
5. Select your `real-estate-ai-agent` repository

### 1.3 Configure Web Service

**Basic Settings:**
- **Name**: `riya-backend` (or your preferred name)
- **Region**: Oregon (or closest to your target audience)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Advanced Settings:**
- **Instance Type**: Free
- **Instances**: 1

### 1.4 Add Environment Variables

1. Scroll to "Environment Variables" section
2. Add the following variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `PORT`: `10000` (Render's default port)
   - `NODE_VERSION`: `18.x`

3. Click "Add Web Service"

### 1.5 Deploy and Monitor

1. Render will start the deployment process
2. Monitor the deployment logs
3. Once deployed, you'll get a URL like: `https://riya-backend.onrender.com`
4. Test the health endpoint: `https://riya-backend.onrender.com/health`

**Important**: Copy your Render backend URL for the next step.

## Step 2: Update Frontend Configuration

### 2.1 Update Backend URL in Frontend

1. Open `frontend/index.html` in your code editor
2. Find the line with `BACKEND_URL` configuration (around line 340)
3. Replace the localhost URL with your Render backend URL:

```javascript
// Before:
const BACKEND_URL = window.BACKEND_URL || 'http://localhost:3001';

// After:
const BACKEND_URL = window.BACKEND_URL || 'https://riya-backend.onrender.com';
```

4. Save the file
5. Commit and push this change to GitHub

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up for a free account
3. Verify your email address

### 3.2 Import Project

1. In Vercel dashboard, click "Add New Project"
2. Click "Import" from your Git repository
3. Select your `real-estate-ai-agent` repository

### 3.3 Configure Project

**Project Settings:**
- **Project Name**: `riya-frontend` (or your preferred name)
- **Framework Preset**: Other
- **Root Directory**: `frontend`
- **Build Command**: (leave empty for static site)
- **Output Directory**: (leave empty)

**Environment Variables:**
- You can optionally add `BACKEND_URL` as an environment variable
- However, we've already hardcoded it in the HTML file

### 3.4 Deploy

1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. Once deployed, you'll get a URL like: `https://riya-frontend.vercel.app`

## Step 4: Test End-to-End

### 4.1 Test Backend

1. Visit your Render backend URL with `/health`:
   ```
   https://riya-backend.onrender.com/health
   ```
2. You should see a JSON response:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-01-15T10:30:00.000Z"
   }
   ```

### 4.2 Test Frontend

1. Visit your Vercel frontend URL
2. Click "Start Call" button
3. Allow microphone access
4. Have a conversation with Riya
5. Click "View Captured Leads" to verify data capture

### 4.3 Verify Lead Capture

1. Complete a full conversation flow
2. Check if lead data is captured by clicking "View Captured Leads"
3. Note: On Render free tier, data is stored in `/tmp` and may be lost on redeployment

## Alternative Deployment Methods

### Option A: Railway (Alternative to Render)

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `node server.js`
5. Add environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `PORT`: `3001`
6. Deploy and note the Railway URL

### Option B: Netlify (Alternative to Vercel)

1. Create account at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Configure:
   - Build command: (leave empty)
   - Publish directory: `frontend`
5. Deploy and note the Netlify URL

### Option C: ngrok (Quick Testing)

For quick testing without full deployment:

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start ngrok
ngrok http 3001

# Use the ngrok URL as BACKEND_URL in frontend
# Open frontend/index.html in Chrome with the ngrok URL
```

## Troubleshooting

### Backend Issues

**Problem**: Backend fails to start on Render
- **Solution**: Check build logs, ensure all dependencies are in package.json
- **Solution**: Verify environment variables are set correctly

**Problem**: API timeout errors
- **Solution**: Free tier services may cold-start; first request might be slow
- **Solution**: Ensure Groq API key is valid and has credits

### Frontend Issues

**Problem**: Frontend can't connect to backend
- **Solution**: Verify BACKEND_URL is correct in frontend/index.html
- **Solution**: Check CORS is enabled in backend (it is in server.js)
- **Solution**: Test backend health endpoint directly

**Problem**: Speech recognition not working
- **Solution**: Use Chrome browser (best Web Speech API support)
- **Solution**: Ensure microphone permissions are granted
- **Solution**: Check if using HTTPS (required for microphone access)

### Data Persistence Issues

**Problem**: Leads data is lost after redeployment
- **Solution**: This is expected on Render free tier (uses /tmp storage)
- **Solution**: For production, consider using a database like PostgreSQL
- **Solution**: Implement database backup/export functionality

## Performance Optimization

### Backend

1. **Response Time**: Groq API is fast, but network latency matters
2. **Cold Starts**: Free tier services may have 30-60s cold start time
3. **Keep Alive**: Use cron jobs or uptime monitoring to reduce cold starts

### Frontend

1. **Browser Cache**: The HTML file is static and caches well
2. **CDN**: Vercel provides automatic CDN distribution
3. **Compression**: Vercel automatically compresses static assets

## Security Considerations

1. **API Keys**: Never commit `.env` files or expose API keys
2. **CORS**: Backend has CORS enabled; consider restricting origins in production
3. **Rate Limiting**: Consider implementing rate limiting for API endpoints
4. **Input Validation**: Add input validation for user messages
5. **HTTPS**: Both Render and Vercel provide automatic HTTPS

## Monitoring and Maintenance

### Backend Monitoring

- Render provides built-in logs and metrics
- Monitor response times and error rates
- Set up alerts for deployment failures

### Frontend Monitoring

- Vercel provides analytics and performance metrics
- Monitor page load times and user engagement
- Check for JavaScript errors in browser console

### Regular Maintenance

- Update dependencies regularly (`npm update`)
- Monitor Groq API usage and limits
- Test conversation flows periodically
- Review and optimize prompts as needed

## Scaling Beyond Free Tier

When you're ready to scale beyond free tiers:

### Backend Scaling

1. **Upgrade Render**: Move to paid tier for better performance
2. **Add Database**: Replace JSON storage with PostgreSQL/MongoDB
3. **Load Balancing**: Add multiple instances for high availability
4. **Caching**: Implement Redis caching for frequently accessed data

### Frontend Scaling

1. **Custom Domain**: Add custom domain for professional appearance
2. **Analytics**: Integrate Google Analytics or similar
3. **CDN**: Use dedicated CDN for global performance
4. **A/B Testing**: Implement testing for UI optimization

## Cost Estimates (Free Tier)

- **Render**: $0/month (free tier)
- **Vercel**: $0/month (free tier)
- **Groq API**: Free tier available (check current limits)
- **Total**: $0/month for basic usage

## Next Steps

After successful deployment:

1. **Test thoroughly**: Complete multiple conversation flows
2. **Monitor performance**: Watch for any issues in the first few days
3. **Gather feedback**: Test with real users if possible
4. **Iterate**: Improve prompts and UI based on feedback
5. **Document**: Keep deployment notes for future reference

## Support and Resources

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Groq Documentation**: [console.groq.com/docs](https://console.groq.com/docs)
- **Web Speech API**: [developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

**Congratulations! Your Riya AI agent is now live and ready to assist customers!** 🎉
