import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/ui/tag";
import type { Project } from "@/content/projects";

function ProjectPreview({
  visual,
}: {
  visual: NonNullable<Project["visual"]>;
}) {
  const fallbackSource = visual.src ?? visual.lightSrc ?? visual.darkSrc;

  if (!fallbackSource) {
    return null;
  }

  const lightSource = visual.lightSrc ?? fallbackSource;
  const darkSource = visual.darkSrc ?? fallbackSource;
  const imageProps = {
    width: visual.width,
    height: visual.height,
    sizes:
      "(min-width: 1024px) 50vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)",
  } as const;
  const imageClassName =
    "h-auto w-full transition-transform duration-500 group-focus-within:scale-[1.015] group-hover:scale-[1.015]";

  if (lightSource === darkSource) {
    return (
      <Image
        {...imageProps}
        src={lightSource}
        alt={visual.alt}
        className={imageClassName}
      />
    );
  }

  return (
    <>
      <Image
        {...imageProps}
        src={lightSource}
        alt={visual.alt}
        className={`project-preview-light ${imageClassName}`}
      />
      <Image
        {...imageProps}
        src={darkSource}
        alt={visual.alt}
        className={`project-preview-dark ${imageClassName}`}
      />
    </>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`group relative -mx-4 grid items-center gap-8 rounded-2xl border border-border bg-surface px-4 py-6 transition-colors focus-within:bg-elevated hover:bg-elevated sm:px-6 sm:py-8 ${project.visual ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(24rem,1.15fr)]" : "sm:grid-cols-[1fr_auto]"}`}
    >
      <div>
        <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-secondary">
          <span>{project.type}</span>
          <span aria-hidden="true">·</span>
          <span>{project.status}</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-2xl leading-7 text-secondary">
          {project.summary}
        </p>
        <p className="mt-4 max-w-2xl border-l-2 border-accent pl-4 text-sm leading-6 text-primary">
          <span className="font-semibold">Outcome:</span> {project.outcome}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Tag key={technology}>{technology}</Tag>
          ))}
        </div>
      </div>
      {project.visual ? (
        <figure className="relative overflow-hidden rounded-xl border border-border bg-background shadow-[0_18px_45px_-30px_rgb(var(--primary)/0.45)]">
          <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="ml-2 truncate font-mono text-[0.625rem] text-secondary">
              joebrown.io
            </span>
          </div>
          <ProjectPreview visual={project.visual} />
          {project.visual.caption ? (
            <figcaption className="border-t border-border px-4 py-3 text-xs leading-5 text-secondary">
              {project.visual.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <span
          className="relative self-center text-2xl text-accent transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      )}
    </article>
  );
}
