import { requireAuth, requireRole } from "@app/modules/auth/auth.middleware";
import { Router } from "express";

import { SeoController } from "./seo.controller";

const router = Router();
const ctrl = new SeoController();

// NOTE: GET / and GET /:page — specific /:page handled after /
router.get("/", (req, res) => ctrl.getAll(req, res));
router.get("/:page", (req, res) => ctrl.getByPage(req, res));
router.put("/", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.upsert(req, res),
);
router.delete("/:page", requireAuth, requireRole("ADMIN"), (req, res) =>
  ctrl.deleteSeo(req, res),
);

export default router;
