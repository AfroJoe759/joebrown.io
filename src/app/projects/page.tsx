import { ProjectCard } from "@/components/content/project-card";
import { PageIntro } from "@/components/layout/page-intro";
import { Tag } from "@/components/ui/tag";
import { additionalProjects, projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Projects",
  "Engineering case studies by Joe Brown covering architecture, implementation, tradeoffs, testing, and lessons.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="What I built, how I structured it, and what changed."
        description="Case studies covering requirements, architecture, implementation, testing, tradeoffs, and measurable or observable outcomes."
      />
      <section className="page-shell pb-24">
        <h2 className="sr-only">Projects</h2>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        <div className="mt-24 border-t border-border pt-10">
          <h2 className="text-3xl font-semibold">
            Open-source and community work
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3">
            {additionalProjects.map((project) => (
              <article
                key={project.title}
                className="group relative bg-surface p-6 transition-colors focus-within:bg-elevated hover:bg-elevated sm:p-8"
              >
                <h3 className="text-xl font-semibold">
                  <a
                    href={project.url}
                    className="rounded text-accent-strong after:absolute after:inset-0 hover:underline"
                    rel="noreferrer"
                  >
                    {project.title} ↗
                  </a>
                </h3>
                <p className="mt-4 leading-7 text-secondary">
                  {project.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
