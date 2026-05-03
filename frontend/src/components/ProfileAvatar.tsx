import { useProfile } from "@app/api/hooks/useProfile";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

/**
 * Reusable profile avatar component
 * Displays avatar + name in multiple sizes
 * Used in Navbar, Hero, Footer, etc.
 */
export default function ProfileAvatar({
  size = "md",
  showName = false,
  className = "",
}: ProfileAvatarProps) {
  const { data: profile } = useProfile();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const shadowClasses = {
    sm: "shadow-primary-600/30",
    md: "shadow-primary-600/40",
    lg: "shadow-primary-600/50",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-lg ${shadowClasses[size]} group-hover:shadow-primary-500/60 transition-all duration-300`}
      >
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name || "Profile"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{profile?.name?.charAt(0) || "Q"}</span>
        )}
      </div>

      {showName && (
        <div className="hidden sm:block">
          <span className="font-bold bg-gradient-to-r from-white via-white via-60% to-primary-400 bg-clip-text text-transparent text-sm">
            {profile?.name || "Nguyen The Quy"}
          </span>
        </div>
      )}
    </div>
  );
}
