export interface GradientOption {
  label: string;
  value: string;
  css: string;
}

export const GRADIENT_OPTIONS: GradientOption[] = [
  {
    label: "Violet",
    value: "from-violet-500 to-purple-700",
    css: "linear-gradient(to right,#8b5cf6,#7e22ce)",
  },
  {
    label: "Blue",
    value: "from-blue-500 to-cyan-600",
    css: "linear-gradient(to right,#3b82f6,#0891b2)",
  },
  {
    label: "Green",
    value: "from-emerald-500 to-teal-600",
    css: "linear-gradient(to right,#10b981,#0d9488)",
  },
  {
    label: "Orange",
    value: "from-orange-500 to-amber-600",
    css: "linear-gradient(to right,#f97316,#d97706)",
  },
  {
    label: "Rose",
    value: "from-rose-500 to-pink-600",
    css: "linear-gradient(to right,#f43f5e,#db2777)",
  },
  {
    label: "Indigo",
    value: "from-indigo-500 to-blue-600",
    css: "linear-gradient(to right,#6366f1,#2563eb)",
  },
  {
    label: "Teal",
    value: "from-teal-500 to-cyan-600",
    css: "linear-gradient(to right,#14b8a6,#0891b2)",
  },
  {
    label: "Red",
    value: "from-red-500 to-rose-600",
    css: "linear-gradient(to right,#ef4444,#e11d48)",
  },
  {
    label: "Yellow",
    value: "from-yellow-500 to-orange-500",
    css: "linear-gradient(to right,#eab308,#f97316)",
  },
  {
    label: "Pink",
    value: "from-pink-500 to-fuchsia-600",
    css: "linear-gradient(to right,#ec4899,#c026d3)",
  },
  {
    label: "Slate",
    value: "from-gray-500 to-slate-600",
    css: "linear-gradient(to right,#6b7280,#475569)",
  },
];
