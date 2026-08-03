import Image from "next/image";

import { PageIntro } from "@/components/layout/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "About",
  "Learn what kind of engineer Joe Brown is and how he approaches useful, maintainable, and accessible software.",
  "/about",
);

const interests = [
  "AI-powered products and developer tools",
  "Developer productivity and internal platforms",
  "Backend systems and APIs",
  "Workflow automation",
  "Performance optimization",
  "System design and architecture",
  "Testing and engineering quality",
  "Modern web applications",
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="I build products—and the engineering systems behind them."
        description="Since 2018, I’ve shipped workflow products, test infrastructure, CI/CD systems, accessibility improvements, and AI tooling."
      />
      <article className="page-shell pb-24">
        <div className="prose-custom max-w-article">
          <p>
            Today I work at Zapier, where I build workflow automation features
            and help improve the engineering systems that support them. Before
            that, I spent several years at Microsoft building experiences for
            Power Platform and Copilot Studio.
          </p>
          <p>
            I’m most interested in work where product behavior and engineering
            systems meet: a customer-facing workflow that needs safer state
            management, a test suite that has become too slow to trust, or an AI
            feature that needs evaluation and failure handling before it can
            ship. The framework changes with the problem; reliability,
            maintainability, accessibility, and clear ownership do not.
          </p>
        </div>

        <section className="my-20 grid items-center gap-10 border-y border-border py-12 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
          <figure>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src="/images/profile/joe-brown.jpg"
                alt="Joe Brown"
                width={516}
                height={600}
                sizes="(min-width: 1024px) 320px, min(100vw - 40px, 516px)"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm text-secondary">
              Joe Brown, senior software engineer.
            </figcaption>
          </figure>
          <div className="prose-custom max-w-article">
            <h2>How I think about engineering</h2>
            <p>
              I believe great software is more than software that works. It
              should be understandable. It should be easy to maintain. It should
              perform well. It should be accessible. And it should make the next
              engineer’s job easier, not harder.
            </p>
            <p>
              Throughout my career, I’ve gravitated toward projects that improve
              the way other engineers build software. Some of my favorite work
              has involved reducing build times, improving testing
              infrastructure, automating repetitive workflows, modernizing
              development processes, and helping teams ship faster with greater
              confidence.
            </p>
            <p>
              Technology changes constantly, but those principles have remained
              consistent throughout my career.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-article">
            <p className="eyebrow">What I enjoy building</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              The product and platform problems I keep returning to.
            </h2>
            <p className="mt-5 text-lg leading-8 text-secondary">
              I enjoy working across the stack, but a few areas consistently
              keep my attention.
            </p>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {interests.map((interest, index) => (
              <li key={interest} className="bg-surface p-6">
                <span className="font-mono text-xs text-accent-strong">
                  0{index + 1}
                </span>
                <p className="mt-4 font-semibold leading-6">{interest}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-article text-lg leading-8 text-secondary">
            These areas overlap in practice. A workflow feature can require API
            design, performance profiling, accessibility testing, deployment
            automation, and tooling that helps the next engineer change it
            safely.
          </p>
        </section>

        <section className="grid gap-12 py-20 lg:grid-cols-2 lg:gap-20">
          <div className="prose-custom">
            <h2>Beyond writing code</h2>
            <p>
              Good engineering isn’t just about implementation. It’s about
              communicating ideas clearly, documenting decisions, mentoring
              other engineers, and leaving systems in a better state than you
              found them.
            </p>
            <p>
              That’s one reason I’m beginning to share more through technical
              writing and YouTube. I enjoy explaining difficult engineering
              concepts in practical ways, and I hope what I create helps other
              developers grow in their careers.
            </p>
          </div>
          <div className="prose-custom">
            <h2>Outside of work</h2>
            <p>
              You’ll usually find me experimenting with new technologies,
              refining personal projects, planning future videos, or learning
              something new.
            </p>
            <p>
              I’m especially interested in how AI is changing the way software
              is built, but I believe engineering fundamentals are more
              important than ever. Good judgment, thoughtful design, and clear
              communication become more valuable as our tools improve.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-12 sm:px-12">
          <div
            className="absolute inset-y-0 left-0 w-1 bg-accent"
            aria-hidden="true"
          />
          <p className="eyebrow">Start with the problem</p>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a product, workflow, or engineering problem worth discussing?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary">
            If your team is shipping a web product, untangling CI bottlenecks,
            designing a service integration, or evaluating an AI workflow, send
            me the problem and the constraints you already know about.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              See how I work
            </ButtonLink>
          </div>
        </section>
      </article>
    </>
  );
}
