import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Tiêu đề dự án không được để trống"),
  company: z.string().min(1, "Tên công ty/tổ chức là bắt buộc"),
  role: z.string().min(1, "Vai trò trong dự án là bắt buộc"),
  period: z.string().min(1, "Thời gian thực hiện là bắt buộc"),
  shortDescription: z.string().min(10, "Mô tả ngắn phải có ít nhất 10 ký tự"),
  description: z.string().min(20, "Mô tả chi tiết phải có ít nhất 20 ký tự"),
  responsibilities: z
    .array(z.string())
    .min(1, "Phải có ít nhất một trách nhiệm"),
  achievements: z.array(z.string()).min(1, "Phải có ít nhất một thành tựu"),
  tech: z.array(z.string()).min(1, "Phải có ít nhất một công nghệ"),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  featured: z.boolean().default(false),
  color: z.string().min(1, "Màu sắc là bắt buộc"),
  icon: z.string().min(1, "Icon là bắt buộc"),
  link: z
    .string()
    .url({ message: "Đường dẫn không hợp lệ" })
    .nullable()
    .optional(),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
