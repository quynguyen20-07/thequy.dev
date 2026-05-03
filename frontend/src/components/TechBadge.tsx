import { TechBadgeConfig } from "@app/commons/constant/tech-stack";

interface TechBadgeProps extends Omit<TechBadgeConfig, "side"> {
  variant?: "inline";
}

/**
 * Inline TechBadge for use in non-hero contexts (e.g. skill lists)
 */
export default function TechBadge({ icon, label, color }: TechBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 glass rounded-xl px-3 py-2 text-xs font-medium border border-white/10 ${color}`}
    >
      <span aria-hidden="true">{icon}</span> {label}
    </div>
  );
}
