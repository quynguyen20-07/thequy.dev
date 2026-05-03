import {
  TechBadgeConfig,
  POSITION_MAP,
} from "@app/commons/constant/tech-stack";

interface TechBadgeProps extends TechBadgeConfig {
  variant?: "floating" | "inline";
}

/**
 * Reusable TechBadge component
 * Displays a single technology badge with consistent styling
 *
 * Usage:
 * - Floating: Used in hero section with absolute positioning
 * - Inline: Used in lists/sections with normal flow
 *
 * Props driven - pure presentational component
 */
export default function TechBadge({
  icon,
  label,
  color,
  borderColor,
  delay,
  position,
  variant = "floating",
}: TechBadgeProps) {
  const positionClasses = variant === "floating" ? POSITION_MAP[position] : "";

  const baseClasses = "glass rounded-xl px-3 py-2 text-xs font-medium border";
  const animationClasses =
    variant === "floating" ? "animate-float absolute z-10" : "";

  return (
    <div
      className={`${baseClasses} ${animationClasses} ${color} ${borderColor} ${positionClasses}`}
      style={variant === "floating" ? { animationDelay: delay } : {}}
      role={variant === "floating" ? "img" : undefined}
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span> {label}
    </div>
  );
}
