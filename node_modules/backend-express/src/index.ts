import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { requireAuth, requireRole } from '@app/auth/auth.middleware';
import { ProjectController } from '@app/project.controller';
import { AuthController } from '@app/auth/auth.controller';
import { CommonController } from '@app/common.controller';
import { loggerMiddleware } from '@app/middlewares/logger.middleware';
import { specs } from '@app/swagger';

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
app.post('/api/auth/login', (req: any, res: any) => authController.login(req, res));

// Public API routes
app.get('/api/projects', (req: any, res: any) => projectController.getProjects(req, res));
app.get('/api/experiences', (req: any, res: any) => commonController.getExperiences(req, res));
app.get('/api/skills', (req: any, res: any) => commonController.getSkills(req, res));
app.get('/api/profile', (req: any, res: any) => commonController.getProfile(req, res));

// Protected admin API routes
app.post('/api/projects', requireAuth, requireRole('ADMIN'), (req: any, res: any) => projectController.createProject(req, res));
app.put('/api/projects/:id', requireAuth, requireRole('ADMIN'), (req: any, res: any) => projectController.updateProject(req, res));
app.delete('/api/projects/:id', requireAuth, requireRole('ADMIN'), (req: any, res: any) => projectController.deleteProject(req, res));

app.post('/api/experiences', requireAuth, requireRole('ADMIN'), (req: any, res: any) => commonController.createExperience(req, res));
app.put('/api/experiences/:id', requireAuth, requireRole('ADMIN'), (req: any, res: any) => commonController.updateExperience(req, res));
app.delete('/api/experiences/:id', requireAuth, requireRole('ADMIN'), (req: any, res: any) => commonController.deleteExperience(req, res));

app.post('/api/skills', requireAuth, requireRole('ADMIN'), (req: any, res: any) => commonController.createSkill(req, res));
app.put('/api/skills/:id', requireAuth, requireRole('ADMIN'), (req: any, res: any) => commonController.updateSkill(req, res));
app.delete('/api/skills/:id', requireAuth, requireRole('ADMIN'), (req: any, res: any) => commonController.deleteSkill(req, res));

app.put('/api/profile/:id', requireAuth, requireRole('ADMIN'), (req: any, res: any) => commonController.updateProfile(req, res));




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
