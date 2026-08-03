"use client";

import { useId, useState } from "react";

import { Tag } from "@/components/ui/tag";
import type { ExperienceEntry as ExperienceEntryData } from "@/content/experience";

function createImpactGroupId(
  entryId: string,
  company: string,
  role: string,
  group: string,
) {
  return `${entryId}-${company}-${role}-${group}`
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-");
}

export function ExperienceEntry({ entry }: { entry: ExperienceEntryData }) {
  const [expanded, setExpanded] = useState(false);
  const generatedId = useId();
  const entryId = generatedId.replaceAll(":", "");
  const headingId = `${entryId}-heading`;
  const panelId = `${entryId}-panel`;

  return (
    <article className="border-t border-border">
      <h2 id={headingId}>
        <button
          type="button"
          className="group grid w-full gap-5 py-8 text-left transition-colors hover:bg-elevated focus-visible:bg-elevated sm:px-5 lg:grid-cols-[16rem_1fr_auto] lg:items-start"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((value) => !value)}
        >
          <span>
            <span className="block text-2xl font-semibold">
              {entry.company}
            </span>
            <span className="mt-1 block text-secondary">{entry.role}</span>
            <span className="mt-3 block font-mono text-xs uppercase tracking-wider text-secondary">
              {entry.dates}
            </span>
            <span className="mt-2 block text-sm text-secondary">
              {entry.location}
            </span>
          </span>
          <span className="max-w-2xl text-base font-normal leading-7 text-secondary lg:pt-1">
            {entry.summary}
          </span>
          <span
            className="inline-flex size-10 items-center justify-center justify-self-start rounded-full border border-border text-accent-strong lg:justify-self-end"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="size-5 transition-transform group-aria-expanded:rotate-180"
            >
              <path
                d="m5 7.5 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={panelId}
        className={`experience-panel grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-12 sm:px-5 lg:ml-[16rem] lg:pl-5">
            <h3 className="text-xl font-semibold">Selected impact</h3>
            <div className="mt-6 max-w-3xl space-y-8">
              {entry.impactGroups.map((group) => {
                const groupId = createImpactGroupId(
                  entryId,
                  entry.company,
                  entry.role,
                  group.title,
                );

                return (
                  <section key={group.title} aria-labelledby={groupId}>
                    <h4
                      id={groupId}
                      className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent-strong"
                    >
                      {group.title}
                    </h4>
                    <ul className="mt-3 space-y-3 leading-7 text-secondary">
                      {group.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="text-accent" aria-hidden="true">
                            •
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold">Focus</h3>
                <ul className="mt-3 space-y-2 text-secondary">
                  {entry.focus.map((focus) => (
                    <li key={focus}>• {focus}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Technologies and systems</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.technologies.map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
