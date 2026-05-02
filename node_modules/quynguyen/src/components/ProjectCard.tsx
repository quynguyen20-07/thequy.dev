// src/components/ProjectCard.tsx
import { useState } from 'react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className="card group relative overflow-hidden transition-all duration-300 hover:border-primary-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10"
      aria-label={`Project: ${project.title}`}
    >
      {/* Gradient accent */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${project.color} opacity-60 group-hover:opacity-100 transition-opacity`}
      />

      {/* Header */}
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="text-2xl w-10 h-10 rounded-xl glass flex items-center justify-center"
            role="img"
            aria-label={project.category}
          >
            {project.icon}
          </span>
          <div>
            <span className="tag-accent text-xs mb-1">{project.category}</span>
            <h2 className="text-white font-bold text-base leading-tight">{project.title}</h2>
          </div>
        </div>
        {project.featured && (
          <span className="tag text-xs shrink-0">Featured</span>
        )}
      </header>

      {/* Company & Period */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-primary-400 text-xs font-medium">{project.company}</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-500 text-xs">{project.period}</span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        {project.shortDescription}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="tag text-xs">
            {t}
          </span>
        ))}
      </div>

      {/* Achievements (expandable) */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 text-xs font-medium transition-colors mb-2"
        aria-expanded={expanded}
        aria-controls={`achievements-${project.id}`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {expanded ? 'Hide' : 'Show'} Key Achievements
      </button>

      {expanded && (
        <ul
          id={`achievements-${project.id}`}
          className="space-y-2 mt-2 animate-fade-in"
          role="list"
        >
          {project.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 shrink-0" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
