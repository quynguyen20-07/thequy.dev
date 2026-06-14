import { useSkillsMap } from "@app/api/hooks/useSkills";
import { usePageSeo } from "@app/api/hooks/useSeo";
import PageHeader from "@app/components/PageHeader";
import SEO from "@app/components/SEO";
import {
  SKILLS_SEO,
  SKILL_CATEGORY_META,
  DEFAULT_CATEGORY_META,
} from "@app/commons/constant/skills";

export default function Skills() {
  const { data: skillsMap = {}, isLoading } = useSkillsMap();
  const { data: seo } = usePageSeo("skills");

  const categories = Object.entries(skillsMap);
  const totalSkills = categories.reduce(
    (acc, [, items]) => acc + items.length,
    0,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-sm">Loading skills...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={seo?.title ?? SKILLS_SEO.title}
        description={seo?.description ?? SKILLS_SEO.description}
        keywords={seo?.keywords ?? SKILLS_SEO.keywords}
        path={seo?.path ?? SKILLS_SEO.path}
      />

      <div className="pt-16">
        <PageHeader
          tag="Tech Stack"
          title={
            <>
              Skills &amp; <span className="gradient-text">Technologies</span>
            </>
          }
          subtitle="Proficient across the full development lifecycle — from backend APIs to cloud deployment and DevOps automation."
        />

        {/* Stats bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-6 mb-14 justify-center">
            {[
              { value: String(totalSkills) + "+", label: "Total Skills" },
              { value: String(categories.length), label: "Categories" },
              { value: "3.5+", label: "Years of Experience" },
            ].map(({ value, label }) => (
              <div key={label} className="glass rounded-2xl px-8 py-4 text-center">
                <div className="text-2xl font-black text-primary-400">{value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          {categories.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No skills found. Check back soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(([category, items]) => {
                const meta =
                  SKILL_CATEGORY_META[category] ?? DEFAULT_CATEGORY_META;

                return (
                  <article
                    key={category}
                    className={`group relative bg-gradient-to-br ${meta.gradient} border ${meta.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-black/20`}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`w-10 h-10 rounded-xl border ${meta.border} flex items-center justify-center text-xl bg-white/5`}
                      >
                        <span role="img" aria-label={category}>
                          {meta.icon}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-white font-bold text-sm leading-tight">
                          {category}
                        </h2>
                        <p className="text-slate-500 text-xs">
                          {items.length} skill{items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    {/* Skill badges */}
                    <ul className="flex flex-wrap gap-2" role="list">
                      {items.map((item) => (
                        <li key={item}>
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${meta.badge}`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Subtle glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)",
                      }}
                    />
                  </article>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-4 glass rounded-3xl p-10 border-glow">
              <span className="text-4xl">🚀</span>
              <h2 className="text-2xl font-black text-white">
                Want to work together?
              </h2>
              <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <a href="/contact" className="btn-primary">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
