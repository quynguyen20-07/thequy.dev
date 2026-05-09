import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileAvatar from "@app/components/ProfileAvatar";

const navItems = [
  { path: "/about", label: "About Me" },
  { path: "/skills", label: "Skills" },
  { path: "/projects", label: "Project" },
  { path: "/contact", label: "Contact Me" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "glass border-b border-white/10 shadow-xl shadow-black/20"
        : "bg-transparent"
        }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="flex-1 flex justify-start">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="The Quy Nguyen - Home"
          >
            <ProfileAvatar size="md" showName={true} />
          </Link>
        </div>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex flex-[2] justify-center">
          <ul className="flex items-center gap-10" role="list">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `nav-link text-sm font-semibold tracking-wide transition-all ${isActive ? "nav-link-active text-white" : "text-slate-400"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Section - Right */}
        <div className="hidden md:flex flex-1 justify-end">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2 group"
          >
            Resume
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                    ? "bg-primary-600/20 text-primary-400 border border-primary-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <a
            href="/resume.pdf"
            className="block w-full btn-primary text-center py-4 text-base"
            onClick={() => setMenuOpen(false)}
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}

