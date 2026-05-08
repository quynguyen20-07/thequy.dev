import { requireAuth, requireRole } from "@app/modules/auth/auth.middleware";
import { Router } from "express";

import { ProfileController } from "./profile.controller";

const router = Router();
const ctrl = new ProfileController();

router.get("/", (req, res) => ctrl.get(req, res));
router.put("/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.update(req as any, res),
);

export default router;
