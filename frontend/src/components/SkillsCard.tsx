/**
 * SkillsCard - Reusable component for displaying skill category
 * Displays icon + category name + skill tags
 */

interface SkillsCardProps {
  icon: string;
  label: string;
  color: string;
  items: string[];
}

export default function SkillsCard({
  icon,
  label,
  color,
  items,
}: SkillsCardProps) {
  return (
    <article className="card hover:border-white/20 transition-all duration-300">
      <h3 className={`font-bold text-sm mb-3 ${color}`}>
        <span role="img" aria-hidden="true">
          {icon}
        </span>{" "}
        {label}
      </h3>
      <ul className="flex flex-wrap gap-1.5" role="list">
        {items?.map((item) => (
          <li key={item}>
            <span className="tag text-xs">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
