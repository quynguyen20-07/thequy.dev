import { requireAuth, requireRole } from "@app/modules/auth/auth.middleware";
import { Router } from "express";

import { ProjectController } from "./project.controller";

const router = Router();
const ctrl = new ProjectController();

router.get("/", (req, res) => ctrl.getProjects(req, res));
router.post("/", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.createProject(req, res),
);
router.put("/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.updateProject(req as any, res),
);
router.delete("/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.deleteProject(req as any, res),
);

export default router;
