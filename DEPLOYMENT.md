# 📦 Deployment Guide - Consolidated Frontend + Backend

## Architecture Overview

Both **frontend** (Vite + React) and **backend** (Express + TypeScript) are now built and served from a single Node.js process:

```
┌─────────────────────────────────────┐
│   Node.js Express Server (Port 3000) │
├─────────────────────────────────────┤
│  ✅ /api/*          → Express Routes │
│  ✅ /static/*       → Static Assets  │
│  ✅ /*              → React App      │
└─────────────────────────────────────┘
```

## Build Process

### Local Development

```bash
# Terminal 1: Frontend (Vite dev server at http://localhost:5173)
yarn dev:frontend

# Terminal 2: Backend (Express at http://localhost:3000)
yarn dev:backend
```

### Production Build

```bash
# Build both frontend and backend
yarn build

# Start the consolidated server
yarn start
```

**What happens:**

1. Frontend builds to `frontend/dist/` with optimized static files
2. Backend TypeScript compiles to `backend-express/dist/`
3. Express server starts and serves:
   - API routes from `/api`
   - Static frontend files from `frontend/dist/`
   - React client-side routing via catch-all route

## Deployment Options

### Option 1: Docker (Recommended)

```bash
# Build and push to registry
docker build -t myapp:latest .
docker push myregistry.com/myapp:latest

# Or use docker-compose for local testing
docker-compose up --build
```

**Environment variables required:**

```env
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=3000
```

### Option 2: Traditional VPS/Server

1. **Install dependencies:**

   ```bash
   yarn install --frozen-lockfile
   ```

2. **Build the application:**

   ```bash
   yarn build
   ```

3. **Set environment variables:**

   ```bash
   export DATABASE_URL="mongodb+srv://..."
   export JWT_SECRET="your-secret-key"
   export NODE_ENV="production"
   export PORT=3000
   ```

4. **Start the server:**
   ```bash
   yarn start
   ```

### Option 3: PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'quynguyen-app',
    script: './backend-express/dist/index.js',
    cwd: './',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster'
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Option 4: Vercel + Render Combo (Legacy - Not Recommended)

If you still need separate deployments:

- **Frontend**: Deploy `frontend/` to Vercel
- **Backend**: Deploy `backend-express/` to Render

But the consolidated approach above is better for cost and maintenance.

## Database Setup

Before running, ensure your MongoDB database is set up:

```bash
# From backend-express directory
cd backend-express

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed initial data
yarn migrate
```

## Server Startup Checklist

- [ ] `.env` file configured with all required variables
- [ ] MongoDB connection string is valid
- [ ] Port 3000 is accessible (or configure PORT env var)
- [ ] `frontend/dist/` exists and contains index.html
- [ ] `backend-express/dist/` exists and contains index.js

## Monitoring

### Health Check

```bash
curl http://localhost:3000/api/projects
```

### Server logs

```bash
# If using PM2
pm2 logs quynguyen-app

# If using Docker
docker logs container-name -f
```

## Troubleshooting

### "Cannot find module" errors

```bash
# Reinstall dependencies
rm -rf node_modules
yarn install
```

### Frontend not loading

- Verify `frontend/dist/index.html` exists
- Check network tab in browser DevTools for 404s
- Ensure Express static middleware is before the catch-all route

### API calls failing

- Check CORS configuration in `backend-express/src/index.ts`
- Verify API endpoints match between frontend and backend
- Check database connection string

## Performance Optimization

- **Static assets**: Served with caching headers
- **Compression**: Add `compression` middleware to Express
- **CDN**: Use a CDN for static assets in production
- **Clustering**: Use PM2 with `max` instances for multi-core utilization

## Scaling

For high-traffic applications:

1. Deploy multiple instances behind a load balancer (nginx/HAProxy)
2. Store session data in Redis
3. Use MongoDB Atlas with auto-scaling
4. Consider separating API and static file serving to different servers
