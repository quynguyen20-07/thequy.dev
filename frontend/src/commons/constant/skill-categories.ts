/**
 * Skills section configuration for Home page
 * Centralized data for skill categories
 */

export interface SkillCategory {
  label: string;
  icon: string;
  color: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    icon: "💻",
    color: "text-blue-400",
  },
  {
    label: "Backend",
    icon: "⚙️",
    color: "text-purple-400",
  },
  {
    label: "Frontend",
    icon: "🎨",
    color: "text-pink-400",
  },
  {
    label: "Databases",
    icon: "🗄️",
    color: "text-yellow-400",
  },
  {
    label: "DevOps & Cloud",
    icon: "☁️",
    color: "text-cyan-400",
  },
  {
    label: "Tools & Methods",
    icon: "🔧",
    color: "text-green-400",
  },
];
