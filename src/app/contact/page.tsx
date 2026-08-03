import { PageIntro } from "@/components/layout/page-intro";
import { MailIcon } from "@/components/ui/mail-icon";
import { SocialIcon } from "@/components/ui/social-icon";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Contact",
  "Contact Joe Brown about senior software engineering, technical consulting, or project work.",
  "/contact",
);

export default function ContactPage() {
  const subject = encodeURIComponent("Project inquiry from joebrown.io");
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let’s talk about the problem you’re solving."
        description="Share the outcome you need, the constraints you know about, and where your team could use senior technical help."
      />
      <section className="page-shell grid gap-16 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <a
            className="group -mx-4 block rounded-lg border-y border-border px-4 py-7 transition-colors hover:bg-surface focus-visible:bg-surface"
            href={`mailto:${site.email}?subject=${subject}`}
          >
            <span className="flex items-center gap-2 text-sm text-secondary">
              <MailIcon />
              Email
            </span>
            <span className="mt-2 flex items-center justify-between text-xl font-semibold">
              <span>{site.email}</span>
              <span
                className="text-accent transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </a>
          <a
            className="group -mx-4 block rounded-lg border-b border-border px-4 py-7 transition-colors hover:bg-surface focus-visible:bg-surface"
            href={site.linkedinUrl}
            rel="me noreferrer"
          >
            <span className="flex items-center gap-2 text-sm text-secondary">
              <SocialIcon service="linkedin" />
              LinkedIn
            </span>
            <span className="mt-2 flex items-center justify-between text-xl font-semibold">
              <span>Professional profile</span>
              <span
                className="text-accent transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </a>
          <a
            className="group -mx-4 block rounded-lg border-b border-border px-4 py-7 transition-colors hover:bg-surface focus-visible:bg-surface"
            href={site.githubUrl}
            rel="me noreferrer"
          >
            <span className="flex items-center gap-2 text-sm text-secondary">
              <SocialIcon service="github" />
              GitHub
            </span>
            <span className="mt-2 flex items-center justify-between text-xl font-semibold">
              <span>Public code</span>
              <span
                className="text-accent transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </a>
        </div>
        <aside className="rounded-2xl bg-surface p-8">
          <h2 className="text-xl font-semibold">
            A useful first message includes
          </h2>
          <ul className="mt-5 space-y-4 text-secondary">
            <li>What you are trying to build or improve</li>
            <li>Why it matters now</li>
            <li>Your current team and technical context</li>
            <li>Known timeline or constraints</li>
          </ul>
          <p className="mt-8 border-t border-border pt-6 text-sm leading-6 text-secondary">
            Your message goes directly to Joe. Do not include passwords,
            credentials, customer data, or other sensitive information.
          </p>
        </aside>
      </section>
    </>
  );
}
