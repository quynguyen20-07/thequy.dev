# Hosting Deployment Guides

This document provides step-by-step instructions for deploying the consolidated Quynguyen application on various hosting platforms.

## 🐳 Docker (All Platforms)

### Option 1: Docker Hub + Docker Swarm/Kubernetes

```bash
# Build image
docker build -t yourusername/quynguyen:latest .

# Push to Docker Hub
docker login
docker push yourusername/quynguyen:latest

# Deploy on Docker Swarm
docker service create \
  --name quynguyen \
  --port 3000:3000 \
  --env DATABASE_URL="mongodb+srv://..." \
  --env JWT_SECRET="your-secret" \
  yourusername/quynguyen:latest

# Deploy on Kubernetes
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: quynguyen
spec:
  replicas: 3
  selector:
    matchLabels:
      app: quynguyen
  template:
    metadata:
      labels:
        app: quynguyen
    spec:
      containers:
      - name: quynguyen
        image: yourusername/quynguyen:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: jwt-secret
        resources:
          limits:
            memory: "512Mi"
            cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  name: quynguyen-service
spec:
  type: LoadBalancer
  selector:
    app: quynguyen
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
EOF
```

---

## 🚀 Railway.app (Recommended - Easy)

### Step-by-Step

1. **Create Railway Project**
   - Go to https://railway.app
   - Click "Start New Project"
   - Select "Deploy from GitHub"
   - Connect your GitHub repo

2. **Configure Build & Deploy**
   - In Railway dashboard, click "Settings"
   - **Start Command:** `yarn start`
   - **Build Command:** `yarn build`
   - **Root Directory:** `.` (leave as root)

3. **Set Environment Variables**
   - Go to "Variables" tab
   - Add:
     ```
     DATABASE_URL = mongodb+srv://...
     JWT_SECRET = your-secret-key
     NODE_ENV = production
     ```

4. **Deploy**
   - Railway auto-deploys on git push
   - Your app will be live at `https://your-project.railway.app`

### Environment Setup (Optional)

```bash
# If using Railway CLI
railway login
railway link
railway variables set DATABASE_URL="mongodb+srv://..."
railway variables set JWT_SECRET="your-secret"
railway up
```

---

## 🏠 Render.com

### Step-by-Step

1. **Create New Web Service**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Name:** quynguyen
   - **Region:** Choose nearest to users
   - **Branch:** main
   - **Root Directory:** `.`
   - **Runtime:** Node
   - **Build Command:** `yarn build`
   - **Start Command:** `yarn start`

3. **Add Environment Variables**
   - Click "Environment"
   - Add:
     ```
     DATABASE_URL=mongodb+srv://...
     JWT_SECRET=your-secret-key
     NODE_ENV=production
     PORT=3000
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Render deploys automatically
   - Access at `https://quynguyen.onrender.com`

---

## ☁️ Vercel (Node Runtime)

### Step-by-Step

1. **Import Project**
   - Go to https://vercel.com/import
   - Select your GitHub repository
   - Choose "Other" for framework

2. **Configure Build Settings**
   - **Build Command:** `yarn build`
   - **Output Directory:** `backend-express/dist`
   - **Install Command:** `yarn install`

3. **Set Root Directory**
   - **Root Directory:** `.` (or leave empty)

4. **Add Environment Variables**
   - In project settings, go to "Environment Variables"
   - Add:
     ```
     DATABASE_URL=mongodb+srv://...
     JWT_SECRET=your-secret-key
     ```

5. **Deploy**
   - Click "Deploy"
   - App runs at `https://your-app.vercel.app`

**Note:** Vercel has a 12-second timeout limit for serverless functions. For longer operations, consider Railway or Render instead.

---

## 🟢 Heroku (Deprecated - Use Alternatives)

Heroku free tier is no longer available. Use Railway or Render instead.

---

## 🔧 DigitalOcean App Platform

### Step-by-Step

1. **Create New App**
   - Go to DigitalOcean Dashboard
   - Click "Create" → "Apps"
   - Connect your GitHub

2. **Configure App Spec**

   ```yaml
   name: quynguyen
   services:
     - name: backend-frontend
       github:
         repo: yourusername/quynguyen
         branch: main
       build_command: yarn build
       run_command: yarn start
       http_port: 3000
       health_check:
         http_path: /api/projects
       envs:
         - key: DATABASE_URL
           value: ${db.DATABASE_URL}
           scope: RUN_AND_BUILD_TIME
         - key: JWT_SECRET
           value: ${jwt_secret}
           scope: RUN_AND_BUILD_TIME
   databases:
     - name: mongodb
       engine: MONGODB
       version: "latest"
   ```

3. **Deploy**
   - DigitalOcean will deploy automatically
   - Access at `https://quynguyen.ondigitalocean.app`

---

## 🖥️ Traditional VPS (AWS EC2, Linode, Vultr)

### Prerequisites

- VPS running Ubuntu 20.04 LTS or later
- SSH access to the server
- Domain name (optional but recommended)

### Step-by-Step

1. **Connect to Server**

   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js & Yarn**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g yarn
   ```

3. **Install MongoDB (Optional - If not using MongoDB Atlas)**

   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   ```

4. **Setup Application**

   ```bash
   cd /opt
   sudo git clone https://github.com/yourusername/quynguyen.git
   cd quynguyen
   sudo chown -R $USER:$USER .
   ```

5. **Install & Build**

   ```bash
   yarn install
   yarn build
   ```

6. **Configure Environment**

   ```bash
   cp backend-express/.env.example backend-express/.env
   nano backend-express/.env  # Edit with your values
   ```

7. **Install PM2 (Process Manager)**

   ```bash
   sudo npm install -g pm2
   pm2 start yarn --name "quynguyen" -- start
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx Reverse Proxy**

   ```bash
   sudo apt-get install -y nginx
   ```

   Create `/etc/nginx/sites-available/quynguyen`:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       client_max_body_size 10M;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Enable site:

   ```bash
   sudo ln -s /etc/nginx/sites-available/quynguyen /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Setup SSL with Let's Encrypt**

   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

10. **Enable Auto-Renewal**

    ```bash
    sudo systemctl enable certbot.timer
    sudo systemctl start certbot.timer
    ```

11. **Monitor Application**

    ```bash
    # Check PM2 status
    pm2 list

    # View logs
    pm2 logs quynguyen

    # Monitor in real-time
    pm2 monit
    ```

---

## 📊 Monitoring & Logging

### PM2 Monitoring

```bash
# Real-time dashboard
pm2 monit

# Save logs
pm2 logs quynguyen > app.log

# Setup email alerts
pm2 set pm2-auto-pull on
```

### Docker Logging

```bash
# View logs
docker logs container-name -f

# Save logs to file
docker logs container-name > app.log 2>&1
```

### Health Checks

```bash
# Check application health
curl http://your-domain.com/api/projects

# Monitor with uptime monitoring service
# - Uptime Robot (free)
# - New Relic
# - DataDog
```

---

## 🔄 CI/CD Pipeline Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "yarn"

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build
        run: yarn build

      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway link --projectId ${{ secrets.RAILWAY_PROJECT_ID }}
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Configure GitHub Secrets

1. Go to Repository Settings → Secrets
2. Add:
   - `RAILWAY_TOKEN`
   - `RAILWAY_PROJECT_ID`
   - `DATABASE_URL`
   - `JWT_SECRET`

---

## 🆘 Troubleshooting

### Application Won't Start

```bash
# Check for errors
yarn build
yarn start

# Check logs
pm2 logs app-name
docker logs container-name
```

### Static Files Not Loading

- Verify `frontend/dist/index.html` exists
- Check Express static middleware is configured
- Ensure path is correct in `backend-express/src/index.ts`

### Database Connection Issues

- Verify MongoDB connection string format
- Check IP whitelist in MongoDB Atlas
- Test connection: `mongosh "your-connection-string"`

### Memory Issues

- Increase server RAM
- Enable swap on Linux: `sudo fallocate -l 1G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`
- Monitor with `free -h` or PM2 monit

---

## 📝 Backup & Recovery

### Database Backup

```bash
# MongoDB backup
mongodump --uri="mongodb+srv://..." --out=./backup

# MongoDB restore
mongorestore ./backup

# Automated backup to S3
# Use MongoDB Atlas automated backups feature
```

### Application Backup

```bash
# Git backup
git push --all
git push --tags

# File backup
tar -czf quynguyen-backup-$(date +%Y%m%d).tar.gz /opt/quynguyen
```

---

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] Frontend builds successfully
- [ ] Backend compiles without errors
- [ ] Static files in correct location
- [ ] Health checks passing
- [ ] SSL/HTTPS enabled
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] Domain DNS configured
- [ ] Error logging configured
- [ ] Performance tested

---

## 🆘 Support

For issues or questions:

1. Check logs: `pm2 logs` or `docker logs`
2. Verify environment variables
3. Test database connection
4. Check network/firewall settings
5. Review documentation above
