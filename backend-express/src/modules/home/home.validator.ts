import { z } from "zod";

export const HomeStatSchema = z.object({
  value: z.string().min(1, "Giá trị không được để trống"),
  label: z.string().min(1, "Nhãn không được để trống"),
  order: z.number().int().min(0).optional(),
});

export type HomeStatInput = z.infer<typeof HomeStatSchema>;
