/**
 * Tech Stack Configuration for Hero and other pages
 * side: 'left' | 'right' determines which column badge appears in
 */

export interface TechBadgeConfig {
  icon: string;
  label: string;
  color: string;
  side: "left" | "right";
  delay: string;
}

/**
 * 8 badges: 4 left column, 4 right column
 * Matches the design with badges flanking the center card
 */
export const HERO_TECH_BADGES: TechBadgeConfig[] = [
  // Left column (top → bottom)
  {
    icon: "⚡",
    label: "NestJS",
    color: "text-accent-400",
    side: "left",
    delay: "0.1s",
  },
  {
    icon: "⚛️",
    label: "React",
    color: "text-cyan-400",
    side: "left",
    delay: "0.4s",
  },
  {
    icon: "▲",
    label: "Next.js",
    color: "text-indigo-300",
    side: "left",
    delay: "0.7s",
  },
  {
    icon: "🐘",
    label: "PostgreSQL",
    color: "text-primary-400",
    side: "left",
    delay: "1.0s",
  },

  // Right column (top → bottom)
  {
    icon: "🚀",
    label: "Express",
    color: "text-yellow-400",
    side: "right",
    delay: "0.2s",
  },
  {
    icon: "☁️",
    label: "AWS",
    color: "text-blue-400",
    side: "right",
    delay: "0.5s",
  },
  {
    icon: "🐳",
    label: "Docker",
    color: "text-sky-400",
    side: "right",
    delay: "0.8s",
  },
  {
    icon: "🍃",
    label: "MongoDB",
    color: "text-green-400",
    side: "right",
    delay: "1.1s",
  },
];
