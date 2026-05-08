import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { label: "Projects", path: "/admin/projects", icon: "💼" },
    { label: "Experience", path: "/admin/experience", icon: "⏳" },
    { label: "Highlights", path: "/admin/highlights", icon: "⭐" },
    { label: "Education", path: "/admin/education", icon: "🎓" },
    { label: "Skills", path: "/admin/skills", icon: "🛠️" },
    { label: "Profile", path: "/admin/profile", icon: "👤" },
    { label: "Home", path: "/admin/home", icon: "🏠" },
    { label: "Contact", path: "/admin/contact", icon: "📬" },
    { label: "SEO", path: "/admin/seo", icon: "🔍" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-xl font-black gradient-text">
            THE QUY ADMIN
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-primary-600/20 text-primary-400 border border-primary-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
