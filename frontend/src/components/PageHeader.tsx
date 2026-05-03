import { ReactNode } from "react";

interface PageHeaderProps {
  tag: string;
  title: ReactNode;
  subtitle?: ReactNode;
  centered?: boolean;
  className?: string;
}

/**
 * Reusable page header component
 * Displays tag, title, and optional subtitle with hero glow effect
 * Used consistently across About, Projects, Contact pages
 */
export default function PageHeader({
  tag,
  title,
  subtitle,
  centered = false,
  className = "",
}: PageHeaderProps) {
  return (
    <header
      className={`relative py-20 px-4 sm:px-6 overflow-hidden mb-6 ${className}`}
    >
      <div
        className="absolute inset-0 hero-glow pointer-events-none"
        aria-hidden="true"
      />
      <div className={`max-w-6xl mx-auto ${centered ? "text-center" : ""}`}>
        <span className="tag-accent mb-4 inline-block">{tag}</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p
            className={`text-slate-400 text-lg leading-relaxed ${centered ? "max-w-2xl mx-auto" : "max-w-3xl"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
