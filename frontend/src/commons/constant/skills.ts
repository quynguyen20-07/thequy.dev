/**
 * Skills page constants
 * Centralized config to avoid magic strings and keep the page declarative.
 */

export const SKILLS_SEO = {
  title: "Skills & Technologies · Nguyen The Quy – Quy Dev",
  description:
    "Explore Nguyen The Quy's (Quy Nguyen) complete technical skill set: Node.js, NestJS, React, TypeScript, PostgreSQL, MongoDB, Redis, Docker, AWS, and more.",
  keywords:
    "Nguyen The Quy skills, Quy Nguyen tech stack, quy dev technologies, Node.js developer skills, NestJS skills Vietnam, React TypeScript developer, fullstack developer tech stack, Docker AWS developer Vietnam",
  path: "/skills",
};

export const SKILL_CATEGORY_META: Record<
  string,
  { icon: string; gradient: string; border: string; badge: string }
> = {
  Languages: {
    icon: "💻",
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/25",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  Backend: {
    icon: "⚙️",
    gradient: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/25",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  "Backend Frameworks": {
    icon: "⚙️",
    gradient: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/25",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  Frontend: {
    icon: "🎨",
    gradient: "from-pink-500/20 to-pink-600/5",
    border: "border-pink-500/25",
    badge: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  },
  Databases: {
    icon: "🗄️",
    gradient: "from-yellow-500/20 to-yellow-600/5",
    border: "border-yellow-500/25",
    badge: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  },
  "DevOps & Cloud": {
    icon: "☁️",
    gradient: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/25",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  "Tools & Methods": {
    icon: "🔧",
    gradient: "from-green-500/20 to-green-600/5",
    border: "border-green-500/25",
    badge: "bg-green-500/10 text-green-300 border-green-500/20",
  },
};

/** Fallback meta for unknown categories */
export const DEFAULT_CATEGORY_META = {
  icon: "📦",
  gradient: "from-slate-500/20 to-slate-600/5",
  border: "border-slate-500/25",
  badge: "bg-slate-500/10 text-slate-300 border-slate-500/20",
};
