export interface Project {
  id: string;
  slug: string;
  title: string;
  role: string;
  company: string;
  period: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  tech: string[];
  category: string;
  featured: boolean;
  color: string;
  icon: string;
  link?: string | null;
}

export type CreateProjectInput = Omit<Project, "id" | "slug">;
