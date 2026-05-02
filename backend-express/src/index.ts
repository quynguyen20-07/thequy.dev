import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { requireAuth, requireRole } from './auth/auth.middleware';
import { ProjectController } from './project.controller';
import { AuthController } from './auth/auth.controller';
import { CommonController } from './common.controller';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { specs } from './swagger';

const app = express();
const port = process.env.PORT || 3000;

// Senior Style: Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const projectController = new ProjectController();
const authController = new AuthController();
const commonController = new CommonController();

// Auth routes
app.post('/api/auth/login', (req: Request, res: Response) => authController.login(req, res));

// Public API routes
app.get('/api/projects', (req: Request, res: Response) => projectController.getProjects(req, res));
app.get('/api/experiences', (req: Request, res: Response) => commonController.getExperiences(req, res));
app.get('/api/skills', (req: Request, res: Response) => commonController.getSkills(req, res));
app.get('/api/profile', (req: Request, res: Response) => commonController.getProfile(req, res));

// Protected admin API routes
app.post('/api/projects', requireAuth, requireRole('admin'), (req: Request, res: Response) => projectController.createProject(req, res));

// Serve Frontend Static Files
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// Catch-all route to serve the React App (for client-side routing)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Export for Vercel
export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    const { logRoutes } = require('./utils/route-logger');
    console.log(`[Express] ${new Date().toLocaleString()}  LOG [RouterExplorer] Nest-style Server running on port ${port}`);
    logRoutes(app);
    console.log(`[Express] ${new Date().toLocaleString()}  LOG [RouterExplorer] Swagger UI available at http://localhost:${port}/api-docs`);
  });
}
