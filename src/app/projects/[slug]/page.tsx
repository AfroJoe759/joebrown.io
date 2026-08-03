import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Tag } from "@/components/ui/tag";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? createMetadata(project.title, project.summary, `/projects/${slug}`)
    : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <article>
      <header className="page-shell page-hero">
        <p className="eyebrow">
          {project.type} · {project.status}
        </p>
        <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
          {project.title}
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-8 text-secondary">
          {project.summary}
        </p>
        <dl className="mt-10 grid gap-6 border-y border-border py-7 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-secondary">Role</dt>
            <dd className="mt-1 font-semibold">{project.role}</dd>
          </div>
          <div>
            <dt className="text-sm text-secondary">Stack</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Tag key={technology}>{technology}</Tag>
              ))}
            </dd>
          </div>
        </dl>
      </header>
      <div className="page-shell pb-24">
        <div className="prose-custom max-w-article">
          <h2>Problem</h2>
          <p>{project.problem}</p>
          <h2>Constraints</h2>
          <ul>
            {project.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Approach</h2>
          <ol>
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          {project.architecture ? <h2>Architecture</h2> : null}
        </div>
        {project.architecture ? (
          <div
            className="my-10 max-w-4xl rounded-2xl border border-border bg-surface p-6 sm:p-10"
            role="img"
            aria-label={project.architecture.label}
          >
            <div className="flex flex-col items-stretch gap-3 text-center font-mono text-sm sm:flex-row sm:items-center">
              {project.architecture.steps.map((step, index) => (
                <div key={step} className="contents">
                  {index > 0 ? (
                    <span className="rotate-90 sm:rotate-0" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <div
                    className={`flex-1 rounded-lg border bg-background p-5 ${index === 1 ? "border-accent" : "border-border"}`}
                  >
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="prose-custom max-w-article">
          <h2>Tradeoffs</h2>
          <ul>
            {project.tradeoffs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Testing</h2>
          <ul>
            {project.testing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Outcome</h2>
          <p>{project.outcome}</p>
          <h2>Lessons</h2>
          <ul>
            {project.lessons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="not-prose mt-12">
            <ButtonLink href="/projects" variant="secondary">
              Back to all projects
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
