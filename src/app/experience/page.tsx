import { ExperienceEntry } from "@/components/content/experience-entry";
import { PageIntro } from "@/components/layout/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { education, experience } from "@/content/experience";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Experience",
  "Joe Brown’s software engineering experience at Zapier and Microsoft, focused on production systems and developer experience.",
  "/experience",
);

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Experience"
        title="Building workflow products and the systems used to ship them since 2018."
        description="Roles at Zapier, Microsoft, and DCS spanning customer-facing automation, CI/CD, testing infrastructure, accessibility, security, and AI tooling."
      />
      <div className="page-shell -mt-4 pb-16 sm:-mt-8 lg:-mt-10">
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
        <div>
          {experience.map((item) => (
            <ExperienceEntry
              key={`${item.company}-${item.role}`}
              entry={item}
            />
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
