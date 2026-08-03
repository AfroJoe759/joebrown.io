import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { Tag } from "@/components/ui/tag";
import { education, experience } from "@/content/experience";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Experience",
  "Joe Brown’s software engineering experience at Zapier and Microsoft, focused on production systems and developer experience.",
  "/experience",
);

function createImpactGroupId(company: string, role: string, group: string) {
  return `${company}-${role}-${group}`
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-");
}

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Experience"
        title="Building workflow products and the systems used to ship them since 2018."
        description="Roles at Zapier, Microsoft, and DCS spanning customer-facing automation, CI/CD, testing infrastructure, accessibility, security, and AI tooling."
      />
      <div className="page-shell -mt-12 pb-16 sm:-mt-20">
        <ButtonLink
          href="/documents/joe-brown-resume.pdf"
          download="Joe-Brown-Resume-2026.pdf"
          className="gap-2"
        >
          Download resume
          <span aria-hidden="true">↓</span>
        </ButtonLink>
      </div>
      <section className="page-shell pb-24">
        <div className="space-y-20">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[18rem_1fr]"
            >
              <div>
                <p className="text-2xl font-semibold">{item.company}</p>
                <p className="mt-1 text-secondary">{item.role}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-secondary">
                  {item.dates}
                </p>
                <p className="mt-2 text-sm text-secondary">{item.location}</p>
              </div>
              <div>
                <p className="max-w-2xl text-lg leading-8 text-secondary">
                  {item.summary}
                </p>
                <h2 className="mt-8 text-xl font-semibold">Selected impact</h2>
                <div className="mt-6 max-w-3xl space-y-8">
                  {item.impactGroups.map((group) => {
                    const groupId = createImpactGroupId(
                      item.company,
                      item.role,
                      group.title,
                    );

                    return (
                      <section key={group.title} aria-labelledby={groupId}>
                        <h3
                          id={groupId}
                          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent-strong"
                        >
                          {group.title}
                        </h3>
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
                        {group.relatedNotes ? (
                          <div className="mt-5 flex flex-col items-start gap-2">
                            {group.relatedNotes.map((note) => (
                              <Link
                                key={note.href}
                                href={note.href}
                                className="group/note inline-flex items-center gap-1 text-sm font-semibold text-accent-strong"
                              >
                                Read: {note.title}
                                <span
                                  aria-hidden="true"
                                  className="transition-transform group-hover/note:translate-x-1 group-focus-visible/note:translate-x-1"
                                >
                                  →
                                </span>
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </section>
                    );
                  })}
                </div>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h2 className="font-semibold">Focus</h2>
                    <ul className="mt-3 space-y-2 text-secondary">
                      {item.focus.map((focus) => (
                        <li key={focus}>• {focus}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="font-semibold">Technologies and systems</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.technologies.map((technology) => (
                        <Tag key={technology}>{technology}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-24 border-t border-border pt-10">
          <h2 className="text-3xl font-semibold">Education</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {education.map((item) => (
              <article key={item.institution}>
                <h3 className="text-xl font-semibold">{item.institution}</h3>
                <p className="mt-2 text-secondary">{item.degree}</p>
                {"detail" in item ? (
                  <p className="mt-1 text-sm text-secondary">{item.detail}</p>
                ) : null}
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-secondary">
                  {item.completed}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
