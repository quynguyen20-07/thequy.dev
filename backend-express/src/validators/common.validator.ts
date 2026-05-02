import { z } from "zod";

export const ExperienceSchema = z.object({
  company: z.string().min(1, "Tên công ty là bắt buộc"),
  role: z.string().min(1, "Chức danh không được để trống"),
  period: z.string().min(1, "Thời gian làm việc là bắt buộc"),
  current: z.boolean().optional(),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  tech: z.array(z.string()).min(1, "Phải có ít nhất một công nghệ sử dụng"),
});

export const SkillSchema = z.object({
  category: z.string().min(1, "Danh mục kỹ năng là bắt buộc"),
  items: z.array(z.string()).min(1, "Phải có ít nhất một kỹ năng"),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, "Họ tên không được để trống"),
  role: z.string().min(1, "Vị trí công việc là bắt buộc"),
  bio: z.string().min(20, "Giới thiệu bản thân phải có ít nhất 20 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatar: z.url({ message: "Đường dẫn ảnh đại diện không hợp lệ" }).optional(),
  resume: z.url({ message: "Đường dẫn CV không hợp lệ" }).optional(),
  socials: z
    .record(
      z.string(),
      z.url({ message: "Đường dẫn mạng xã hội không hợp lệ" }),
    )
    .optional(),
});
