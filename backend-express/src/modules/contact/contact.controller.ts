import { handleValidationError } from "@app/utils/error-handler";
import { Request, Response } from "express";

import { ContactMethodSchema } from "./contact.validator";
import { ContactService } from "./contact.service";

const service = new ContactService();

export class ContactController {
  /**
   * @openapi
   * /api/contact/methods:
   *   get:
   *     tags: [Contact]
   *     summary: Get all contact methods
   */
  async getMethods(req: Request, res: Response) {
    try {
      const data = await service.getMethods();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/contact/methods:
   *   post:
   *     tags: [Contact]
   *     summary: Create a contact method (Admin)
   */
  async createMethod(req: Request, res: Response) {
    const result = ContactMethodSchema.safeParse(req.body);
    if (!result.success) return handleValidationError(res, result.error);
    try {
      const data = await service.createMethod(result.data);
      res.status(201).json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/contact/methods/{id}:
   *   put:
   *     tags: [Contact]
   *     summary: Update a contact method (Admin)
   */
  async updateMethod(req: Request, res: Response) {
    const result = ContactMethodSchema.partial().safeParse(req.body);
    if (!result.success) return handleValidationError(res, result.error);
    try {
      const data = await service.updateMethod(
        (req.params as { id: string }).id,
        result.data,
      );
      res.json(data);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @openapi
   * /api/contact/methods/{id}:
   *   delete:
   *     tags: [Contact]
   *     summary: Delete a contact method (Admin)
   */
  async deleteMethod(req: Request, res: Response) {
    try {
      await service.deleteMethod((req.params as { id: string }).id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
