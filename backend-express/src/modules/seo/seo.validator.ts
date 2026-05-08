import { z } from "zod";

const VALID_PAGES = ["home", "about", "contact", "projects"] as const;

export const PageSeoSchema = z.object({
  page: z.enum(VALID_PAGES, {
    message: "page phải là: home | about | contact | projects",
  }),
  title: z.string().min(10, "Tiêu đề SEO phải có ít nhất 10 ký tự"),
  description: z.string().min(20, "Mô tả SEO phải có ít nhất 20 ký tự"),
  keywords: z.string().min(5, "Keywords không được để trống"),
  path: z.string().startsWith("/", "Path phải bắt đầu bằng /"),
});

export type PageSeoInput = z.infer<typeof PageSeoSchema>;
