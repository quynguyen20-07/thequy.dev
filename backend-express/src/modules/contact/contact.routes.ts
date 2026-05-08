import { requireAuth, requireRole } from "@app/modules/auth/auth.middleware";
import { Router } from "express";

import { ContactController } from "./contact.controller";

const router = Router();
const ctrl = new ContactController();

router.get("/methods", (req, res) => ctrl.getMethods(req, res));
router.post("/methods", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.createMethod(req, res),
);
router.put("/methods/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.updateMethod(req, res),
);
router.delete("/methods/:id", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.deleteMethod(req, res),
);

export default router;
