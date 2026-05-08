import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, "Họ tên không được để trống"),
  role: z.string().min(1, "Vị trí công việc là bắt buộc"),
  bio: z.string().min(20, "Giới thiệu bản thân phải có ít nhất 20 ký tự"),
  bioParagraphs: z
    .array(z.string().min(1))
    .optional()
    .describe("Các đoạn văn bio chi tiết cho trang About"),
  statusBadge: z
    .string()
    .optional()
    .describe('Trạng thái hiển thị trên Hero, VD: "Open to opportunities"'),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatar: z.url({ message: "Đường dẫn ảnh đại diện không hợp lệ" }).optional(),
  resume: z.url({ message: "Đường dẫn CV không hợp lệ" }).optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
