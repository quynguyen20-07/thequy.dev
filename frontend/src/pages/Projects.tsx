import { useProjects } from "@app/api/hooks/useProjects";
import type { Project } from "@app/api/types/project";
import ProjectCard from "@app/components/ProjectCard";
import SEO from "@app/components/SEO";
import { useState } from "react";

export default function Projects() {
  const { data: projectsData = [], isLoading } = useProjects();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const projects = Array.isArray(projectsData) ? projectsData : [];
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p: Project) => p.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p: Project) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Projects · Node.js & NestJS Developer Vietnam"
        description="Explore The Quy Nguyen's portfolio projects: TripC AI Platform, RoomsBooked hotel booking system, DevPlus LMS, Driving Test Management System, and DigiEye AI Camera. Built with NestJS, React, PostgreSQL, Redis, and AWS."
        keywords="TripC AI platform NestJS, RoomsBooked hotel booking system, DevPlus LMS NestJS React, driving test management system, DigiEye AI camera system, Node.js developer Vietnam projects, NestJS backend developer portfolio"
        path="/projects"
      />

      <div className="pt-16">
        {/* Page Header */}
        <header className="relative py-20 px-4 sm:px-6 overflow-hidden mb-6">
          <div
            className="absolute inset-0 hero-glow pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-6xl mx-auto text-center">
            <span className="tag-accent mb-4 inline-block">Portfolio</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Projects & <span className="gradient-text">Work Experience</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real-world systems built across AI platforms, booking engines,
              LMS, and government-grade applications using NestJS, React, and
              modern cloud infrastructure.
            </p>
          </div>
        </header>
        {/* Filter Tabs */}
        <section
          className="max-w-6xl mx-auto px-4 sm:px-6 mb-10"
          aria-label="Project filters"
        >
          <div
            className="flex flex-wrap gap-2 justify-center"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories?.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
                    : "glass text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
        {/* Projects Grid */}
        <section
          className="max-w-6xl mx-auto px-4 sm:px-6 pb-20"
          aria-label="Projects list"
          role="tabpanel"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filtered?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No projects found in this category.
            </div>
          )}
        </section>
        {/* Tech Stack Highlight */}
        <aside
          className="bg-dark-800/40 border-t border-white/5 py-16 px-4 sm:px-6"
          aria-label="Core technology stack"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-8">
              Technologies Used Across Projects
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "NestJS",
                "Node.js",
                "TypeScript",
                "React.js",
                "Next.js",
                "PostgreSQL",
                "Redis",
                "Docker",
                "AWS EC2",
                "AWS S3",
                "Firebase",
                "GitLab CI/CD",
                "Go (Gin)",
                "Socket.IO",
                "Cloudflare CDN",
              ].map((tech) => (
                <span key={tech} className="tag text-sm py-1.5 px-4">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
