import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

import { requireAuth, requireRole } from './auth/auth.middleware';
import { ProjectController } from './project.controller';
import { AuthController } from './auth/auth.controller';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const projectController = new ProjectController();
const authController = new AuthController();

// Auth routes
app.post('/api/auth/login', (req: Request, res: Response) => authController.login(req, res));

// Public API routes
app.get('/api/projects', (req: Request, res: Response) => projectController.getProjects(req, res));

// Protected admin API routes
app.post('/api/projects', requireAuth, requireRole('admin'), (req: Request, res: Response) => projectController.createProject(req, res));

// Serve Frontend Static Files
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// Catch-all route to serve the React App (for client-side routing)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express API & Static Server is running on port ${port}`);
});
