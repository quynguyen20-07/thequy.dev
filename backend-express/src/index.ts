import "dotenv/config";

import experienceRoutes from "@app/modules/experience/experience.routes";
import highlightRoutes from "@app/modules/highlight/highlight.routes";
import educationRoutes from "@app/modules/education/education.routes";
import { loggerMiddleware } from "@app/middlewares/logger.middleware";
import projectRoutes from "@app/modules/project/project.routes";
import profileRoutes from "@app/modules/profile/profile.routes";
import contactRoutes from "@app/modules/contact/contact.routes";
import skillRoutes from "@app/modules/skill/skill.routes";
import homeRoutes from "@app/modules/home/home.routes";
// Module routes
import authRoutes from "@app/modules/auth/auth.routes";
import express, { Request, Response } from "express";
import seoRoutes from "@app/modules/seo/seo.routes";
import swaggerUi from "swagger-ui-express";
import { specs } from "@app/swagger";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Module routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/highlights", highlightRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/seo", seoRoutes);

// Serve Frontend Static Files
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(frontendDistPath));

// Catch-all route to serve the React App (for client-side routing)
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Export for Vercel
export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    const { logRoutes } = require("./utils/route-logger");
    console.log(
      `[Express] ${new Date().toLocaleString()}  LOG [RouterExplorer] Server running on port ${port}`,
    );
    logRoutes(app);
    console.log(
      `[Express] ${new Date().toLocaleString()}  LOG [RouterExplorer] Swagger UI available at http://localhost:${port}/api-docs`,
    );
  });
}
