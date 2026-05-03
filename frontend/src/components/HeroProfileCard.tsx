import { TechBadgeConfig } from "@app/commons/constant/tech-stack";
import { useProfile } from "@app/api/hooks/useProfile";

interface StatItem {
  value: string;
  label: string;
  iconBg: string;
  icon: React.ReactNode;
}

interface HeroProfileCardProps {
  stats: StatItem[];
  badges: TechBadgeConfig[];
}

// SVG connector curve between badge and card
function CurvedConnector({ side }: { side: "left" | "right" }) {
  // SVG size: width = 40px, height = 32px (tùy chỉnh cho đẹp)
  // Đường cong cubic Bezier: từ badge (0,16) đến card (40,16)
  // Control points tạo độ cong mềm mại
  const isLeft = side === "left";
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      className="-mx-1"
      style={{ flexShrink: 0 }}
    >
      <path
        d={isLeft ? "M0 16 C16 16, 24 16, 40 16" : "M40 16 C24 16, 16 16, 0 16"}
        stroke="#7dd3fc55" // primary-400/33
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
      />
      {/* Dot ở cuối đường cong */}
      <circle
        cx={isLeft ? 40 : 0}
        cy={16}
        r={5}
        fill="#0ea5e9"
        opacity="0.7"
        stroke="#38bdf8"
        strokeWidth="2"
      />
      <defs>
        <filter
          id="glow"
          x="-10"
          y="-10"
          width="60"
          height="52"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

// Single badge pill + connector curve
function SideBadge({
  badge,
  side,
}: {
  badge: TechBadgeConfig;
  side: "left" | "right";
}) {
  const pill = (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-sm w-32 animate-float"
      style={{ animationDelay: badge.delay }}
    >
      <span className="text-lg leading-none" aria-hidden="true">
        {badge.icon}
      </span>
      <span
        className={`font-semibold text-sm whitespace-nowrap ${badge.color}`}
      >
        {badge.label}
      </span>
    </div>
  );
  return (
    <div className="flex items-center">
      {side === "left" ? (
        <>
          {pill}
          <CurvedConnector side="left" />
        </>
      ) : (
        <>
          <CurvedConnector side="right" />
          {pill}
        </>
      )}
    </div>
  );
}

export default function HeroProfileCard({
  stats,
  badges,
}: HeroProfileCardProps) {
  const { data: profile } = useProfile();

  const leftBadges = badges.filter((b) => b.side === "left");
  const rightBadges = badges.filter((b) => b.side === "right");

  return (
    <div className="hidden lg:flex items-center justify-center gap-0 animate-fade-in">
      {/* ── Left badges ── */}
      <div className="flex flex-col gap-3">
        {leftBadges.map((badge) => (
          <SideBadge key={badge.label} badge={badge} side="left" />
        ))}
      </div>

      {/* ── Center card ── */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-5 border border-white/10 w-72 shrink-0 animate-float shadow-2xl shadow-black/40">
        {/* Three-dot menu */}
        <div className="flex justify-end mb-3">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
          </div>
        </div>

        {/* Profile section */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar + online dot */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-black text-2xl">
                  {profile?.name?.charAt(0) || "Q"}
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-slate-900" />
          </div>

          {/* Name / role / location */}
          <div className="min-w-0">
            <h3 className="text-white font-bold text-base leading-tight truncate">
              {profile?.name || "Nguyen The Quy"}
            </h3>
            <p className="text-primary-400 font-medium text-sm mt-0.5">
              {profile?.role || "Fullstack Developer"}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <svg
                className="w-3 h-3 text-slate-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-slate-500 text-xs">
                {profile?.location || "Da Nang, Vietnam"}
              </span>
            </div>
          </div>
        </div>

        {/* Bio — skip if value looks like a URL */}
        <p className="text-slate-400 text-xs leading-relaxed mb-3">
          {profile?.bio && !profile.bio.startsWith("http")
            ? profile.bio
            : "Passionate about building scalable web applications with clean code and great user experiences."}
        </p>

        {/* Divider */}
        <div className="border-t border-white/8 mb-3" />

        {/* Stats 2×2 grid */}
        <div className="grid grid-cols-2 gap-2">
          {stats.map(({ value, label, icon, iconBg }) => (
            <div
              key={label}
              className="flex items-center gap-2 p-2 rounded-xl bg-white/5"
            >
              <div
                className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
              >
                {icon}
              </div>
              <div className="min-w-0">
                <div className="text-white font-black text-sm leading-none">
                  {value}
                </div>
                <div className="text-slate-500 text-xs mt-0.5 leading-tight">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right badges ── */}
      <div className="flex flex-col gap-3">
        {rightBadges.map((badge) => (
          <SideBadge key={badge.label} badge={badge} side="right" />
        ))}
      </div>
    </div>
  );
}
