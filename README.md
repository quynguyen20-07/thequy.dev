# 🚀 Nguyen The Quy - Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-00d4aa?style=for-the-badge&logo=vercel&logoColor=white)](https://www.nguyen-the-quy.website)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A modern, full-stack portfolio website with an integrated admin panel for content management. Built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [💻 Usage](#-usage)
- [🏗️ Project Structure](#️-project-structure)
- [📚 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

## ✨ Features

### 🌟 Portfolio Showcase

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI**: Clean, professional interface with smooth animations
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **SEO Optimized**: Meta tags, structured data, and performance optimizations

### 🔧 Admin Panel

- **Content Management**: Full CRUD operations for all portfolio sections
- **Authentication**: Secure login system for content administrators
- **Real-time Updates**: Changes reflect immediately on the live site
- **Intuitive Interface**: User-friendly forms with validation and error handling

### 📊 Portfolio Sections

- **About**: Personal introduction and background
- **Experience**: Work history with detailed descriptions
- **Education**: Academic background and certifications
- **Projects**: Showcase of development projects with links
- **Skills**: Technical skills and proficiency levels
- **Contact**: Contact information and social links
- **Highlights**: Key achievements and milestones

## 🛠️ Tech Stack

### Frontend

| Technology                                                                                                                      | Version | Purpose       |
| ------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------- |
| ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)                         | 18.2.0  | UI Framework  |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-007ACC?style=flat-square&logo=typescript&logoColor=white)           | 5.0.2   | Type Safety   |
| ![Vite](https://img.shields.io/badge/Vite-4.3.9-646CFF?style=flat-square&logo=vite&logoColor=white)                             | 4.3.9   | Build Tool    |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)     | 3.3.0   | Styling       |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-4.29.0-FF4154?style=flat-square&logo=react-query&logoColor=white) | 4.29.0  | Data Fetching |

### Backend

| Technology                                                                                                            | Version | Purpose       |
| --------------------------------------------------------------------------------------------------------------------- | ------- | ------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-18.16.0-43853D?style=flat-square&logo=node.js&logoColor=white)        | 18.16.0 | Runtime       |
| ![Express.js](https://img.shields.io/badge/Express.js-4.18.2-404D59?style=flat-square&logo=express&logoColor=white)   | 4.18.2  | Web Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-007ACC?style=flat-square&logo=typescript&logoColor=white) | 5.0.2   | Type Safety   |
| ![Prisma](https://img.shields.io/badge/Prisma-4.16.2-3982CE?style=flat-square&logo=Prisma&logoColor=white)            | 4.16.2  | ORM           |
| ![MongoDB](https://img.shields.io/badge/MongoDB-6.0-4EA94B?style=flat-square&logo=mongodb&logoColor=white)            | 6.0     | Database      |

### Development Tools

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality
- **Docker**: Containerization
- **Swagger**: API documentation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18.16.0 or higher)
- **Yarn** (v1.22.0 or higher)
- **MongoDB** (local or cloud instance)
- **Git** (for version control)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/nguyen-the-quy-portfolio.git
   cd nguyen-the-quy-portfolio
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment Setup**

   Create `.env` files in both `backend-express/` and root directories:

   **backend-express/.env:**

   ```env
   DATABASE_URL="mongodb://localhost:27017/portfolio"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   NODE_ENV=development
   ```

   **.env** (root):

   ```env
   # Add any global environment variables here
   ```

4. **Database Setup**

   ```bash
   cd backend-express
   yarn prisma generate
   yarn prisma db push
   yarn seed  # Optional: seed with sample data
   ```

5. **Build the project**
   ```bash
   yarn build
   ```

## 💻 Usage

### Development Mode

**Start both frontend and backend:**

```bash
yarn dev
```

This will start:

- Frontend at `http://localhost:5173`
- Backend at `http://localhost:3000`
- Hot reload enabled for both

**Start individually:**

```bash
# Frontend only
cd frontend && yarn dev

# Backend only
cd backend-express && yarn dev
```

### Production Mode

```bash
# Build and start production server
yarn start
```

The application will be available at `http://localhost:3000`

### Admin Panel Access

1. Navigate to the admin login page
2. Use your admin credentials
3. Manage portfolio content through the intuitive interface

## 🏗️ Project Structure

```
nguyen-the-quy-portfolio/
├── 📁 frontend/                 # React Frontend
│   ├── 📁 public/              # Static assets
│   ├── 📁 src/
│   │   ├── 📁 admin/           # Admin panel components
│   │   ├── 📁 api/             # API hooks and services
│   │   ├── 📁 commons/         # Shared utilities
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 data/            # Static data
│   │   ├── 📁 pages/           # Page components
│   │   └── 📄 main.tsx         # Application entry point
│   ├── 📄 package.json
│   ├── 📄 tailwind.config.js
│   └── 📄 vite.config.ts
├── 📁 backend-express/          # Express Backend
│   ├── 📁 prisma/               # Database schema
│   ├── 📁 src/
│   │   ├── 📁 modules/          # Feature modules
│   │   │   ├── 📁 auth/         # Authentication
│   │   │   ├── 📁 experience/   # Work experience
│   │   │   ├── 📁 education/    # Education
│   │   │   ├── 📁 projects/     # Projects
│   │   │   ├── 📁 skills/       # Skills
│   │   │   └── 📁 ...           # Other modules
│   │   ├── 📁 middlewares/      # Express middlewares
│   │   ├── 📁 utils/            # Utility functions
│   │   └── 📄 index.ts          # Server entry point
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
├── 📁 scripts/                  # Build and deployment scripts
├── 📄 package.json             # Root workspace config
├── 📄 docker-compose.yml       # Docker setup
├── 📄 Dockerfile              # Production container
└── 📄 README.md               # This file
```

## 📚 API Documentation

The API documentation is automatically generated using Swagger UI.

**Access API Docs:**

- **Development**: `http://localhost:3000/api-docs`
- **Production**: `https://www.nguyen-the-quy.website/api-docs`

### Key Endpoints

| Method   | Endpoint              | Description              |
| -------- | --------------------- | ------------------------ |
| `GET`    | `/api/experience`     | Get all work experiences |
| `POST`   | `/api/experience`     | Create new experience    |
| `PUT`    | `/api/experience/:id` | Update experience        |
| `DELETE` | `/api/experience/:id` | Delete experience        |
| `GET`    | `/api/projects`       | Get all projects         |
| `POST`   | `/api/projects`       | Create new project       |
| `PUT`    | `/api/projects/:id`   | Update project           |
| `DELETE` | `/api/projects/:id`   | Delete project           |
| `POST`   | `/api/auth/login`     | Admin authentication     |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes linting and formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Nguyen The Quy**

- **Website**: [https://www.nguyen-the-quy.website](https://www.nguyen-the-quy.website)
- **Email**: [contact@nguyen-the-quy.website](mailto:contact@nguyen-the-quy.website)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)

---

<div align="center">

**Made with ❤️ by Nguyen The Quy**

⭐ Star this repo if you found it helpful!

[⬆️ Back to Top](#-nguyen-the-quy---portfolio-website)

</div>

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
