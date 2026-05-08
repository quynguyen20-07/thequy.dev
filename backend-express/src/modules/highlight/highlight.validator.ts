import { z } from "zod";

export const HighlightSchema = z.object({
  icon: z.string().min(1, "Biểu tượng không được để trống"),
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  color: z
    .string()
    .regex(/^text-\w+-\d+$/, "Màu sắc phải là class Tailwind hợp lệ"),
  order: z.number().int().min(0).optional(),
});

export type HighlightInput = z.infer<typeof HighlightSchema>;
