import { useProfile } from "@app/api/hooks/useProfile";
import { ReactNode } from "react";

interface HeroProfileCardProps {
  stats: Array<{ value: string; label: string }>;
  children?: ReactNode;
}

/**
 * HeroProfileCard - Reusable profile card for hero section
 * Displays profile avatar + stats in a glass card
 *
 * Props driven for flexibility:
 * - stats: Array of stat objects to display
 * - children: Optional tech badges or other content
 */
export default function HeroProfileCard({
  stats,
  children,
}: HeroProfileCardProps) {
  const { data: profile } = useProfile();

  return (
    <div className="hidden lg:flex justify-center items-center animate-fade-in">
      {/* relative w-80 is the positioning anchor for all badges */}
      <div className="relative w-80">
        {/* Main profile card — badges render AFTER this so they appear on top */}
        <div className="glass rounded-3xl p-6 border-glow animate-float">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-primary-600/40">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name || "Profile"}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <span>{profile?.name?.charAt(0) || "Q"}</span>
              )}
            </div>
            <div>
              <div className="text-white font-bold">
                {profile?.name || "The Quy Nguyen"}
              </div>
              <div className="text-primary-400 text-sm">
                Fullstack Developer
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                🇻🇳 Da Nang, Vietnam
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats?.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/5 rounded-xl p-3 text-center"
              >
                <div className="text-primary-400 font-black text-xl">
                  {value}
                </div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges rendered after card → naturally on top via DOM stacking order */}
        {children}
      </div>
    </div>
  );
}
