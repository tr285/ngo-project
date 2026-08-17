# Vercel Deployment Guide

## Prerequisites
- MongoDB Atlas account (for production database)
- Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Set these environment variables in your Vercel project settings:

### Server Environment Variables
- `NODE_ENV`: `production`
- `PORT`: `5000`
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Generate a secure random string for JWT signing
- `JWT_EXPIRES_IN`: `7d`
- `CLIENT_URL`: Your deployed Vercel domain (e.g., `https://your-app.vercel.app`)
- `ADMIN_EMAIL`: Admin email for initial setup
- `ADMIN_PASSWORD`: Admin password for initial setup

### Client Environment Variables
- `VITE_API_URL`: `/api` (This will proxy to the serverless API)

## Deployment Steps

### 1. Push to Git Repository
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Configure environment variables in the project settings
6. Click "Deploy"

### 3. Post-Deployment Setup
1. After deployment, note your Vercel domain
2. Update `CLIENT_URL` in Vercel environment variables to match your domain
3. Redeploy to apply the changes

## Architecture

- **Frontend**: React + Vite (built to static files)
- **Backend**: Express.js (deployed as serverless functions)
- **Database**: MongoDB Atlas
- **API Routes**: All `/api/*` requests route to serverless functions
- **Static Files**: All other requests serve the React app

## Local Development

### Install Dependencies
```bash
npm run install:all
```

### Run Development Servers
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

## Troubleshooting

### API Routes Not Working
- Ensure `server/api/index.js` exists and exports the Express app
- Check that server dependencies are installed
- Verify environment variables are set correctly in Vercel

### Database Connection Issues
- Verify MongoDB Atlas connection string format
- Ensure IP whitelist includes Vercel's IP ranges (or use 0.0.0.0/0)
- Check database user credentials

### Build Failures
- Ensure Node.js version is >= 18.x
- Check that all dependencies are compatible
- Review build logs in Vercel dashboard

## File Structure for Deployment

```
/
├── vercel.json          # Vercel configuration
├── package.json         # Root package.json with build scripts
├── client/              # React frontend
│   ├── package.json
│   ├── vite.config.js
│   └── src/
├── server/              # Express backend
│   ├── package.json
│   ├── api/             # Serverless entry point
│   │   └── index.js
│   └── src/
│       ├── app.js
│       └── server.js
```
