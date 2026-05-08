import { z } from "zod";

export const SkillSchema = z.object({
  category: z.string().min(1, "Danh mục kỹ năng là bắt buộc"),
  items: z.array(z.string()).min(1, "Phải có ít nhất một kỹ năng"),
});

export type SkillInput = z.infer<typeof SkillSchema>;
