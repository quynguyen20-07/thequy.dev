# Quynguyen - Portfolio & Admin Panel

A full-stack application with Express backend + React frontend, consolidated into a single deployable unit.

## 🏗️ Architecture

```
/quynguyen
├── frontend/              # React + Vite + Tailwind
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend-express/       # Node.js + Express + Prisma
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── tsconfig.json
├── package.json          # Root workspace
├── Dockerfile           # Production container
└── docker-compose.yml   # Local Docker setup
```

## 🚀 Quick Start

### Development

**Terminal 1 - Frontend:**

```bash
yarn dev:frontend
# Runs at http://localhost:5173
```

**Terminal 2 - Backend:**

```bash
yarn dev:backend
# Runs at http://localhost:3000
```

### Production Build

```bash
# Build both frontend and backend
yarn build

# Start the consolidated server
yarn start
# Server runs at http://localhost:3000 with static frontend
```

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. Configure Environment Variables

Create `.env` in `backend-express/`:

```bash
cp backend-express/.env.example backend-express/.env
```

Edit `backend-express/.env`:

```env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/dbname"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
NODE_ENV="development"
```

### 3. Initialize Database

```bash
cd backend-express

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Optional: Run migration script
yarn migrate
```

## 🔌 Available Scripts

### Development

- `yarn dev:frontend` - Start Vite dev server
- `yarn dev:backend` - Start Express with auto-reload

### Production

- `yarn build` - Build frontend + backend TypeScript
- `yarn start` - Start production server
- `yarn migrate` - Run data migration script

### Database

- `npx prisma studio` - Visual database browser
- `npx prisma db push` - Push schema changes to database

## 📦 Docker Deployment

### Local Testing

```bash
docker-compose up --build
# App runs at http://localhost:3000
```

### Production Build

```bash
docker build -t myapp:latest .
docker run -p 3000:3000 \
  -e DATABASE_URL="mongodb+srv://..." \
  -e JWT_SECRET="secret" \
  myapp:latest
```

## 📚 Project Structure

### Frontend (`/frontend`)

- **Components:** Reusable React components (Navbar, Footer, ProjectCard, etc.)
- **Pages:** Route-based pages (Home, Projects, Admin, etc.)
- **API:** Axios instance and React Query hooks
- **Styles:** Tailwind CSS with custom configuration

**Key Features:**

- Server-side rendering ready
- Mobile responsive design
- React Router v7 for navigation
- React Query for data fetching
- Helmet for SEO

### Backend (`/backend-express`)

- **Controllers:** Handle HTTP requests (ProjectController, AuthController)
- **Services:** Business logic and database operations
- **Auth:** JWT authentication + RBAC middleware
- **Middleware:** CORS, request validation, auth checks
- **Database:** Prisma ORM with MongoDB

**API Endpoints:**

- `GET /api/projects` - Get all projects (public)
- `POST /api/projects` - Create project (admin only)
- `POST /api/auth/login` - User authentication

## 🔐 Authentication

The system includes JWT-based authentication with role-based access control:

```typescript
// Protect routes with authentication
app.post(
  "/api/projects",
  requireAuth, // Verify JWT token
  requireRole("admin"), // Check user role
  handler,
);
```

## 🌐 Deployment Options

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides:

- Docker (Recommended)
- Traditional VPS
- PM2 Process Manager
- Cloud platforms (Vercel, Render, Railway, etc.)

## ⚙️ Configuration

### Frontend Build Output

- Build location: `frontend/dist/`
- Served by: Express static middleware
- Public assets: `frontend/public/`

### Backend Compilation

- Source: `backend-express/src/`
- Output: `backend-express/dist/`
- Runtime: Node.js with CommonJS modules

### Database

- ORM: Prisma
- Database: MongoDB
- Schema: `backend-express/prisma/schema.prisma`

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend-express && npm test
```

## 📖 API Documentation

### Projects

```bash
# Get all projects
GET /api/projects

# Create project (requires admin token)
POST /api/projects
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "Project description",
  "link": "https://example.com"
}
```

### Authentication

```bash
# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

## 🐛 Troubleshooting

**Frontend not loading in production:**

- Verify `frontend/dist/index.html` exists
- Check Express static middleware configuration
- Inspect browser DevTools Network tab

**API calls failing:**

- Check CORS configuration
- Verify MongoDB connection string
- Ensure JWT token is sent in Authorization header

**Database connection errors:**

- Validate MongoDB connection string format
- Check network access in MongoDB Atlas
- Verify database exists

## 📝 Environment Variables

### Backend Required

- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### Optional

- `LOG_LEVEL` - Logging level
- `CORS_ORIGIN` - CORS allowed origins

## 🚢 CI/CD Ready

The project structure supports continuous deployment:

- Single build command: `yarn build`
- Consistent environment setup
- Docker containerization ready
- Health checks included

## 📄 License

ISC

## 👤 Author

Quy Nguyen
