import { z } from "zod";

export const EducationSchema = z.object({
  degree: z.string().min(1, "Bằng cấp không được để trống"),
  institution: z.string().min(1, "Tên trường không được để trống"),
  period: z.string().min(1, "Thời kỳ học tập là bắt buộc"),
  note: z.string().min(10, "Ghi chú phải có ít nhất 10 ký tự"),
  order: z.number().int().min(0).optional(),
});

export type EducationInput = z.infer<typeof EducationSchema>;
