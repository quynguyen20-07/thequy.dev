import { requireAuth, requireRole } from "@app/modules/auth/auth.middleware";
import { Router } from "express";

import { HomeController } from "./home.controller";

const router = Router();
const ctrl = new HomeController();

router.get("/stats", (req, res) => ctrl.getStats(req, res));
router.post("/stats", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.createStat(req, res),
);
router.put("/stats/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.updateStat(req, res),
);
router.delete("/stats/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.deleteStat(req, res),
);

export default router;
