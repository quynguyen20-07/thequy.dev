import { z } from "zod";

export const ContactMethodSchema = z.object({
  label: z.string().min(1, "Nhãn không được để trống"),
  value: z.string().min(1, "Giá trị không được để trống"),
  href: z.string().min(1, "Đường dẫn không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  iconType: z
    .string()
    .min(1, "Loại icon không được để trống")
    .refine(
      (v) =>
        ["email", "github", "linkedin", "phone", "twitter", "website"].includes(
          v,
        ),
      "iconType phải là: email | github | linkedin | phone | twitter | website",
    ),
  color: z.string().min(1, "Màu sắc không được để trống"),
  iconColor: z.string().min(1, "Màu icon không được để trống"),
  order: z.number().int().min(0).optional(),
});

export type ContactMethodInput = z.infer<typeof ContactMethodSchema>;
