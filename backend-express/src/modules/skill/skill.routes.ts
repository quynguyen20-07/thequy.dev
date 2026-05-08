import { requireAuth, requireRole } from "@app/modules/auth/auth.middleware";
import { Router } from "express";

import { SkillController } from "./skill.controller";

const router = Router();
const ctrl = new SkillController();

// NOTE: /raw must be registered before /:id to avoid route shadowing
router.get("/raw", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.getRaw(req, res),
);
router.get("/", (req, res) => ctrl.getAll(req, res));
router.post("/", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.create(req, res),
);
router.put("/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.update(req as any, res),
);
router.delete("/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.delete(req as any, res),
);

export default router;
