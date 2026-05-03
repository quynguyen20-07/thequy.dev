import {
  getHighlightsData,
  getEducationData,
  isAboutPageLoading,
  getSkillsData,
  getExperiencesData,
  getSkillsByCategory,
  formatDateRange,
} from "@app/commons/helper/aboutUtils";
import {
  DEFAULT_HIGHLIGHTS,
  DEFAULT_EDUCATION,
  SKILL_CATEGORIES,
  ABOUT_SEO,
  PROFILE_INFO,
} from "@app/commons/constant/about";
import { useHighlights, useEducation } from "@app/api/hooks/useAdminCommon";
import { useExperiences, useSkills } from "@app/api/hooks/useCommon";
import PageHeader from "@app/components/PageHeader";
import SEO from "@app/components/SEO";

export default function About() {
  const { data: expData = [], isLoading: expLoading } = useExperiences();
  const { data: skillsData, isLoading: skillsLoading } = useSkills();
  const { data: highlightsData = [], isLoading: highlightsLoading } =
    useHighlights();
  const { data: educationData = [], isLoading: educationLoading } =
    useEducation();

  const experiences = getExperiencesData(expData);
  const skills = getSkillsData(skillsData);
  const highlights = getHighlightsData(highlightsData, DEFAULT_HIGHLIGHTS);
  const education = getEducationData(educationData, DEFAULT_EDUCATION);

  const isLoading = isAboutPageLoading({
    experiences: expLoading,
    skills: skillsLoading,
    highlights: highlightsLoading,
    education: educationLoading,
    skillsData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <SEO
        title={ABOUT_SEO.title}
        description={ABOUT_SEO.description}
        keywords={ABOUT_SEO.keywords}
        path={ABOUT_SEO.path}
      />

      <div className="pt-16">
        <PageHeader
          tag="About Me"
          title={
            <>
              About <span className="gradient-text">The Quy Nguyen</span>
            </>
          }
          subtitle="Fullstack Developer with 3.5+ years of experience in building booking systems, AI platforms, and scalable backend services using Node.js, NestJS, and React."
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-20">
          {/* Bio Section */}
          <section
            className="grid lg:grid-cols-2 gap-12 items-start"
            aria-label="Biography"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Who I Am</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I'm a{" "}
                  <strong className="text-white">
                    Full-Stack Developer (Node.js)
                  </strong>{" "}
                  with over 3.5 years of experience building real-world booking
                  and service platforms. My core focus is developing stable,
                  high-performance, and scalable backend systems.
                </p>
                <p>
                  I specialize in designing{" "}
                  <strong className="text-primary-400">RESTful APIs</strong>,
                  complex booking workflows, payment-related logic, supplier
                  management systems, and content platforms. I have hands-on
                  experience with{" "}
                  <strong className="text-primary-400">
                    Docker, GitLab CI/CD, AWS
                  </strong>
                  , and Firebase to deliver reliable production-ready solutions.
                </p>
                <p>
                  Currently working at{" "}
                  <strong className="text-accent-400">Unitech Dach</strong>,
                  building digital solutions for enterprise and supply‑chain
                  management: tracking container volumes sold, analyzing
                  regional performance, monitoring KPIs, generating automated
                  statistical reports and alerts when targets are missed. I
                  design real‑time data collection pipelines, analytical
                  dashboards, AI forecasting modules and resource‑allocation
                  tools, while ensuring security, scalability and seamless
                  integration with existing business processes.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {PROFILE_INFO.map((info) => (
                  <div key={info.label} className="glass rounded-xl px-4 py-2">
                    <div className="text-slate-500 text-xs">{info.label}</div>
                    <div
                      className={`text-sm font-medium ${
                        info.isStatus ? "text-accent-400" : "text-white"
                      }`}
                    >
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div
              className="grid grid-cols-2 gap-4"
              aria-label="Key skills and highlights"
            >
              {highlights.map(({ icon, title, description, color }) => (
                <article
                  key={title}
                  className="card hover:border-white/20 transition-all duration-300"
                >
                  <span
                    className={`text-2xl mb-2 block ${color}`}
                    role="img"
                    aria-label={title}
                  >
                    {icon}
                  </span>
                  <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section aria-label="Work experience timeline">
            <h2 className="text-2xl font-bold text-white mb-8">
              Work Experience
            </h2>
            <ol className="relative space-y-6" aria-label="Timeline">
              {experiences?.map((exp, i) => (
                <li key={i} className="relative pl-8">
                  {/* Timeline line */}
                  {i < experiences.length - 1 && (
                    <div
                      className="absolute left-2.5 top-8 bottom-0 w-px bg-white/10"
                      aria-hidden="true"
                    />
                  )}
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      exp.current
                        ? "border-accent-400 bg-accent-400/20"
                        : "border-primary-500/50 bg-primary-500/10"
                    }`}
                    aria-hidden="true"
                  >
                    {exp.current && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                    )}
                  </div>

                  <article className="card hover:border-white/20 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-white font-bold">{exp.role}</h3>
                        <p className="text-primary-400 font-medium text-sm">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs">
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </span>
                        {exp.current && (
                          <span className="tag-accent text-xs py-0.5">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">
                      {exp.description}
                    </p>
                    <ul className="flex flex-wrap gap-1.5" role="list">
                      {exp?.tech?.map((t: string) => (
                        <li key={t}>
                          <span className="tag text-xs">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          {/* Skills Section */}
          <section aria-label="Technical skills">
            <h2 className="text-2xl font-bold text-white mb-8">
              Technical Skills
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILL_CATEGORIES.map(({ label, icon, color, border }) => (
                <article
                  key={label}
                  className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                    <span role="img" aria-hidden="true">
                      {icon}
                    </span>
                    {label}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5" role="list">
                    {getSkillsByCategory(skills, label).map((item: string) => (
                      <li key={item}>
                        <span className="tag text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Education */}
          <section aria-label="Education">
            <h2 className="text-2xl font-bold text-white mb-8">Education</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {education.map(({ degree, institution, period, note }) => (
                <article
                  key={degree}
                  className="card hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-primary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{degree}</h3>
                      <p className="text-primary-400 text-xs font-medium">
                        {institution}
                      </p>
                      <p className="text-slate-500 text-xs">{period}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {note}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
