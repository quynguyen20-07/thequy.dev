import { z } from "zod";

export const ExperienceSchema = z.object({
  company: z.string().min(1, "Tên công ty là bắt buộc"),
  role: z.string().min(1, "Chức danh không được để trống"),
  startDate: z
    .union([z.date(), z.string()])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return typeof val === "string" ? new Date(val) : val;
    }),
  endDate: z
    .union([z.date(), z.string().nullable()])
    .optional()
    .transform((val) => {
      if (val === null || val === undefined || val === "") return null;
      return typeof val === "string" ? new Date(val) : val;
    }),
  current: z.boolean().optional(),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  tech: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (typeof val === "string") {
        return val
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
      return val;
    })
    .refine((arr) => arr.length > 0, "Phải có ít nhất một công nghệ sử dụng"),
});

export type ExperienceInput = z.infer<typeof ExperienceSchema>;
