import Link from "next/link";

import { DeliveryFlow } from "@/components/content/delivery-flow";
import { ImpactMetricGroup } from "@/components/content/impact-metric-group";
import { ImpactNumber } from "@/components/content/impact-number";
import { ProjectCard } from "@/components/content/project-card";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/content/experience";
import { conversationTopics, impactMetrics } from "@/content/home";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { getAllNotes } from "@/lib/notes";

const primaryMetrics = impactMetrics.filter(
  (metric) => metric.prominence === "primary",
);
const supportingMetrics = impactMetrics.filter(
  (metric) => metric.prominence === "supporting",
);

export default async function HomePage() {
  const notes = await getAllNotes();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="page-shell grid min-h-[calc(100vh-4.5rem)] items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">Joe Brown · Senior Software Engineer</p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-7xl lg:text-[5.25rem]">
              Senior software engineer building reliable products and faster
              engineering systems.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-secondary sm:text-xl">
              I build full-stack products, developer platforms, and practical AI
              tooling at production scale—currently at Zapier after several
              years at Microsoft.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/projects">View my projects</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Work with me
              </ButtonLink>
              <a
                href="/documents/joe-brown-resume.pdf"
                download="Joe-Brown-Resume-2026.pdf"
                className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-semibold text-secondary transition-colors hover:text-primary"
              >
                Download resume ↓
              </a>
            </div>
          </div>
          <DeliveryFlow />
        </div>
      </section>
      <section className="section-space-compact bg-surface">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Engineering impact"
            title="Product adoption, delivery speed, and operating cost."
            description="Selected results from workflow products, CI performance, infrastructure migrations, internationalization, and security compliance."
          />
          <ImpactMetricGroup>
            <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <dl className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-1">
                {primaryMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex min-h-64 flex-col justify-end bg-background p-6 sm:p-8 lg:min-h-72"
                  >
                    <dt className="order-2 mt-2 text-lg font-semibold">
                      {metric.label}
                    </dt>
                    <dd className="order-1 text-5xl font-semibold tracking-[-0.05em] text-accent-strong sm:text-6xl lg:text-7xl">
                      <ImpactNumber
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                      />
                    </dd>
                    <dd className="order-3 mt-3 max-w-md text-sm leading-6 text-secondary">
                      {metric.detail}
                    </dd>
                  </div>
                ))}
              </dl>
              <dl className="grid gap-px bg-border sm:grid-cols-2">
                {supportingMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex flex-col bg-background p-6 sm:p-8"
                  >
                    <dt className="order-2 mt-2 font-semibold">
                      {metric.label}
                    </dt>
                    <dd className="order-1 text-3xl font-semibold tracking-[-0.04em] text-accent-strong sm:text-4xl">
                      <ImpactNumber
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                      />
                    </dd>
                    <dd className="order-3 mt-3 text-sm leading-6 text-secondary">
                      {metric.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </ImpactMetricGroup>
        </div>
      </section>
      <section className="page-shell section-space">
        <SectionHeading
          eyebrow="Selected projects"
          title="What I built, why it works this way, and what I learned."
          description="Each case study documents the constraints, architecture, implementation choices, testing strategy, and tradeoffs behind the result."
        />
        <div className="mt-12">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
      </section>
      <section className="border-y border-border bg-surface">
        <div className="page-shell section-space-compact grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Experience"
              title="From workflow features to CI platforms and security tooling."
            />
            <div className="mt-10 space-y-8">
              {experience.slice(0, 2).map((item) => (
                <div
                  key={`${item.company}-${item.role}`}
                  className="border-l-2 border-border pl-5"
                >
                  <p className="font-semibold">
                    {item.role} · {item.company}
                  </p>
                  <p className="mt-1 text-sm text-secondary">{item.dates}</p>
                  <p className="mt-3 leading-7 text-secondary">
                    {item.impactGroups[0].highlights[0]}
                  </p>
                </div>
              ))}
              <Link
                className="group inline-flex items-center gap-1 font-semibold text-accent-strong"
                href="/experience"
              >
                Full experience
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Services"
              title="Architecture, implementation, and engineering-system improvements."
            />
            <div className="mt-10 divide-y divide-border">
              {services.slice(0, 4).map((service) => (
                <div key={service.title} className="py-5">
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">
                    {service.summary}
                  </p>
                </div>
              ))}
              <Link
                className="group inline-flex items-center gap-1 pt-6 font-semibold text-accent-strong"
                href="/services"
              >
                How I can help
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="page-shell section-space">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Engineering notes"
            title="Published investigations from production engineering work."
            description="Detailed write-ups on the measurements, failure modes, and tradeoffs behind production engineering decisions."
          />
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
              Latest notes
            </p>
            <div className="divide-y divide-border border-y border-border">
              {notes.slice(0, 2).map((note, index) => (
                <article
                  key={note.slug}
                  className="group relative -mx-4 flex gap-5 rounded-lg px-4 py-5 transition-colors focus-within:bg-elevated hover:bg-elevated"
                >
                  <span className="font-mono text-sm text-accent-strong">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">
                      <Link
                        href={`/notes/${note.slug}`}
                        className="rounded after:absolute after:inset-0"
                      >
                        {note.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-secondary">
                      {note.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <Link
              href="/notes"
              className="group mt-6 inline-flex items-center gap-1 font-semibold text-accent-strong"
            >
              Visit Engineering Notes
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="page-shell pb-24 pt-8 sm:pb-28 lg:pb-32">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-10 sm:px-12 sm:py-14">
          <div
            className="absolute inset-y-0 left-0 w-1 bg-accent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-strong">
                Start a conversation
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                Have a product, system, or engineering problem worth solving?
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Get in touch</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  View services
                </ButtonLink>
              </div>
            </div>
            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Good starting points
              </p>
              <ol className="mt-4 divide-y divide-border border-y border-border">
                {conversationTopics.map((topic, index) => (
                  <li key={topic} className="flex items-center gap-4 py-4">
                    <span className="font-mono text-xs text-accent-strong">
                      0{index + 1}
                    </span>
                    <span className="font-semibold">{topic}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 flex items-center gap-2 text-sm text-secondary">
                <span
                  className="h-2 w-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                I typically respond within two business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
