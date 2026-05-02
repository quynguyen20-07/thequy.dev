import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useProjects } from '../api/hooks/useProjects'
import { useSkills } from '../api/hooks/useCommon'

const stats = [
  { value: '3.5+', label: 'Years Experience' },
  { value: '5+', label: 'Real Projects' },
  { value: '10+', label: 'Technologies' },
  { value: '3', label: 'Companies' },
]

export default function Home() {
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  if (projectsLoading || skillsLoading || !skills) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  const featuredProjects = Array.isArray(projects)
    ? projects.filter((p: any) => p.featured).slice(0, 3)
    : [];



  return (
    <>
      <SEO
        title="Fullstack Developer | Node.js & NestJS Developer Vietnam"
        description="The Quy Nguyen – Fullstack Developer with 3.5+ years experience building scalable booking systems, AI-powered platforms, and high-performance backend services using Node.js, NestJS, and React. Available for hire in Vietnam."
        keywords="Node.js developer Vietnam, NestJS backend developer, React portfolio developer, Fullstack developer Vietnam, The Quy Nguyen, booking platform developer, AI backend developer Da Nang"
        path="/"
      />

      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background glows */}
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" aria-hidden="true" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl pointer-events-none animate-pulse-slow" aria-hidden="true" />

        {/* Floating orbs */}
        <div className="absolute top-32 right-12 w-4 h-4 rounded-full bg-primary-400/40 animate-float" style={{ animationDelay: '0s' }} aria-hidden="true" />
        <div className="absolute top-64 right-32 w-2 h-2 rounded-full bg-accent-400/60 animate-float" style={{ animationDelay: '1s' }} aria-hidden="true" />
        <div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-primary-300/30 animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="animate-slide-up">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-500/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" aria-hidden="true" />
              <span className="text-accent-400 text-sm font-medium">Open to opportunities</span>
            </div>

            {/* H1 – only one per page */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Fullstack{' '}
              <span className="gradient-text text-glow">Developer</span>
              <br />
              <span className="text-slate-300 text-3xl sm:text-4xl lg:text-5xl font-bold">
                Node.js · NestJS · React
              </span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl">
              I build <strong className="text-white">scalable booking systems</strong>, AI-powered platforms, and high-performance backend services using{' '}
              <strong className="text-primary-400">Node.js</strong> and modern technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/projects" className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                </svg>
                View My Work
              </Link>
              <Link to="/contact" className="btn-secondary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-slate-600 text-xs uppercase tracking-widest">Find me on</span>
              <a
                href="https://github.com/quynguyen20-07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/nguyen-the-quy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-slate-400 hover:text-primary-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="hidden lg:flex justify-center items-center animate-fade-in">
            <div className="relative w-80">
              {/* Main profile card */}
              <div className="glass rounded-3xl p-6 border-glow animate-float">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-primary-600/40">
                    Q
                  </div>
                  <div>
                    <div className="text-white font-bold">The Quy Nguyen</div>
                    <div className="text-primary-400 text-sm">Fullstack Developer</div>
                    <div className="text-slate-500 text-xs mt-0.5">🇻🇳 Da Nang, Vietnam</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stats?.map(({ value, label }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                      <div className="text-primary-400 font-black text-xl">{value}</div>
                      <div className="text-slate-500 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating tech badges */}
              <div className="absolute -top-4 -right-6 glass rounded-xl px-3 py-2 text-xs font-medium text-accent-400 border border-accent-500/30 animate-float" style={{ animationDelay: '0.5s' }}>
                ⚡ NestJS
              </div>
              <div className="absolute -bottom-4 -left-6 glass rounded-xl px-3 py-2 text-xs font-medium text-primary-400 border border-primary-500/30 animate-float" style={{ animationDelay: '1.5s' }}>
                🐘 PostgreSQL
              </div>
              <div className="absolute top-1/2 -right-8 glass rounded-xl px-3 py-2 text-xs font-medium text-blue-400 border border-blue-500/30 animate-float" style={{ animationDelay: '2.5s' }}>
                ☁️ AWS
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-slate-600 text-xs">Scroll down</span>
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20" aria-label="Featured projects">
        <header className="mb-12">
          <span className="tag-accent mb-3">Portfolio</span>
          <h2 className="section-title mt-3">Featured Projects</h2>
          <p className="section-subtitle">
            Real-world systems built with Node.js, NestJS, React, and modern cloud infrastructure.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredProjects?.map((project) => (
            <div
              key={project.id}
              className="card group relative overflow-hidden hover:border-primary-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300"
            >
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${project.color} opacity-60 group-hover:opacity-100 transition-opacity`} aria-hidden="true" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl w-10 h-10 rounded-xl glass flex items-center justify-center" role="img" aria-label={project.category}>
                  {project.icon}
                </span>
                <div>
                  <p className="text-xs text-accent-400 font-medium">{project.category}</p>
                  <h3 className="text-white font-bold text-sm">{project.title}</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-1.5">
                {project?.tech?.slice(0, 4)?.map((t) => (
                  <span key={t} className="tag text-xs">{t}</span>
                ))}
                {project?.tech?.length > 4 && (
                  <span className="tag text-xs">+{project?.tech?.length - 4}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects" className="btn-secondary">
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-white/5" aria-label="Technical skills">
        <header className="mb-12 text-center">
          <span className="tag mb-3">Tech Stack</span>
          <h2 className="section-title mt-3 mx-auto text-center">Skills & Technologies</h2>
          <p className="section-subtitle mx-auto text-center">
            Proficient across the full development lifecycle — from backend APIs to cloud deployment.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Languages', items: skills.languages, icon: '💻', color: 'text-blue-400' },
            { label: 'Backend', items: skills.backend, icon: '⚙️', color: 'text-purple-400' },
            { label: 'Frontend', items: skills.frontend, icon: '🎨', color: 'text-pink-400' },
            { label: 'Databases', items: skills.databases, icon: '🗄️', color: 'text-yellow-400' },
            { label: 'DevOps & Cloud', items: skills.devops, icon: '☁️', color: 'text-cyan-400' },
            { label: 'Tools & Methods', items: skills.tools, icon: '🔧', color: 'text-green-400' },
          ].map(({ label, items, icon, color }) => (
            <article key={label} className="card hover:border-white/20 transition-all duration-300">
              <h3 className={`font-bold text-sm mb-3 ${color}`}>
                <span role="img" aria-hidden="true">{icon}</span> {label}
              </h3>
              <ul className="flex flex-wrap gap-1.5" role="list">
                {items?.map((item) => (
                  <li key={item}>
                    <span className="tag text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20" aria-label="Call to action">
        <div className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden border-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-accent-500/5 pointer-events-none" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">
            Let's Build Something{' '}
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Looking for a Node.js backend developer or fullstack engineer in Vietnam? I'm available for new projects.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link to="/contact" className="btn-primary">
              Start a Conversation
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
