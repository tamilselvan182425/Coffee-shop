# 🚀 Deployment Guide

Deploying your MERN stack application.

## 🌐 Backend (Render)
1. Push your code to a GitHub repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Connect your repository.
4. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables from your `.env` file (especially `MONGODB_URI` and `JWT_SECRET`).

## 🎨 Frontend (Vercel)
1. Go to [Vercel](https://vercel.com).
2. Create a new project and import your GitHub repository.
3. Settings:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

> **Note**: Remember to update the `baseURL` in `client/src/api/axios.js` to point to your live Render URL before deploying the frontend.
