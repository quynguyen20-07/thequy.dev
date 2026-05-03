/**
 * Tech Stack Configuration for Hero and other pages
 * Centralized source of truth for technology badges
 * Single place to add/remove/reorder tech items
 */

export interface TechBadgeConfig {
  icon: string;
  label: string;
  color: string; // Tailwind color class
  borderColor: string; // Tailwind border color
  delay: string; // Animation delay in seconds
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "mid-left"
    | "mid-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

/**
 * Tech badges displayed in hero section
 * Order matters for visual balance and animation sequencing
 */
export const HERO_TECH_BADGES: TechBadgeConfig[] = [
  // Top Zone: spread across top
  //   {
  //     icon: "💻",
  //     label: "TypeScript",
  //     color: "text-green-400",
  //     borderColor: "border-green-500/30",
  //     delay: "0.1s",
  //     position: "top-center",
  //   },
  {
    icon: "⚡",
    label: "NestJS",
    color: "text-accent-400",
    borderColor: "border-accent-500/30",
    delay: "0.3s",
    position: "top-left",
  },
  {
    icon: "🚀",
    label: "Express",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    delay: "0.5s",
    position: "top-right",
  },

  // Middle Zone: left and right
  {
    icon: "⚛️",
    label: "React",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    delay: "0.7s",
    position: "mid-left",
  },
  {
    icon: "☁️",
    label: "AWS",
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    delay: "0.9s",
    position: "mid-right",
  },

  // Bottom Zone: spread across bottom
  //   {
  //     icon: "▲",
  //     label: "Next.js",
  //     color: "text-indigo-400",
  //     borderColor: "border-indigo-500/30",
  //     delay: "1.1s",
  //     position: "bottom-center",
  //   },
  {
    icon: "🐘",
    label: "PostgreSQL",
    color: "text-primary-400",
    borderColor: "border-primary-500/30",
    delay: "1.3s",
    position: "bottom-left",
  },
  {
    icon: "🐳",
    label: "Docker",
    color: "text-sky-400",
    borderColor: "border-sky-500/30",
    delay: "1.5s",
    position: "bottom-right",
  },
];

/**
 * Positions relative to w-80 (320px) card anchor
 * Top/bottom badges hover above/below card edge
 * Side badges extend OUTSIDE card left/right, protruding past the border
 * Asymmetric vertical positions create natural non-uniform look
 */
export const POSITION_MAP: Record<TechBadgeConfig["position"], string> = {
  // Above card — varied heights for asymmetry
  "top-left": "-top-4 left-3",
  "top-center": "-top-5 left-1/2 -translate-x-1/2",
  "top-right": "-top-3 right-2",

  // Sides — badges protrude OUTSIDE card, slight border overlap only
  // -left-24 (-96px): badge ~108px wide → 12px overlaps card left border
  "mid-left": "top-20 -left-24",
  // Asymmetric vertical to break uniform look
  "mid-right": "top-32 -right-24",

  // Below card — varied heights for asymmetry
  "bottom-left": "-bottom-4 left-4",
  "bottom-center": "-bottom-5 left-1/2 -translate-x-1/2",
  "bottom-right": "-bottom-3 right-1",
};
