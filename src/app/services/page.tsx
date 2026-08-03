import { ServiceCard } from "@/components/content/service-card";
import { PageIntro } from "@/components/layout/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { services } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Services",
  "Senior product engineering, backend, AI feature, performance, developer experience, and architecture consulting services.",
  "/services",
);

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Product delivery, platform performance, and technical direction."
        description="I help teams ship web products, repair slow build and test systems, design service integrations, and move AI features beyond the prototype stage."
      />
      <section className="page-shell pb-24">
        <div className="divide-y divide-border border-y border-border">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} service={service} />
          ))}
        </div>
        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="text-3xl font-semibold">
              From an unclear problem to a shipped change or actionable plan.
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                "Initial conversation",
                "Problem definition",
                "Technical evaluation",
                "Scope and recommendation",
                "Implementation",
                "Handoff and follow-up",
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="font-mono text-sm text-accent-strong">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow">Good fit</p>
            <h2 className="text-3xl font-semibold">
              Teams that can share context and make decisions.
            </h2>
            <p className="mt-5 leading-7 text-secondary">
              I work best with SaaS teams, startups, technical founders, and
              organizations that need senior implementation help. I’m not the
              right fit for logo design, SEO-only work, WordPress theme work, or
              projects without a clear decision maker.
            </p>
            <ButtonLink href="/contact" className="mt-8">
              Discuss your project
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
