import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { getAllNotes } from "@/lib/notes";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Engineering Notes",
  "Engineering notes from Joe Brown about CI performance, testing, developer tooling, workflow architecture, and practical AI.",
  "/notes",
);

const upcomingTopics = [
  {
    category: "AI engineering",
    title: "Practical AI agents for engineering teams",
    description:
      "Where agents help, where deterministic tools remain better, and how to keep humans in control.",
  },
  {
    category: "Testing",
    title: "Testing large TypeScript applications",
    description:
      "Building coverage that improves release confidence without turning the test suite into a bottleneck.",
  },
];

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <>
      <PageIntro
        eyebrow="Engineering notes"
        title="Investigations, measurements, and decisions from production work."
        description="Detailed write-ups on CI performance, dependency graphs, systems migrations, testing, developer tooling, and practical AI."
      />
      <section className="page-shell pb-24">
        <h2 className="sr-only">Published notes</h2>
        <div className="divide-y divide-border border-y border-border">
          {notes.map((note, index) => (
            <article
              key={note.slug}
              className="group relative grid gap-6 py-10 transition-colors hover:bg-surface sm:-mx-6 sm:px-6 lg:grid-cols-[4rem_1fr_auto] lg:items-start"
            >
              <p className="font-mono text-sm text-accent-strong">
                0{index + 1}
              </p>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-secondary">
                  {note.category}
                </p>
                <h3 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Link
                    href={`/notes/${note.slug}`}
                    className="rounded after:absolute after:inset-0"
                  >
                    {note.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-2xl leading-7 text-secondary">
                  {note.description}
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-secondary lg:text-right">
                <time dateTime={note.publishedAt}>
                  {shortDateFormatter.format(new Date(note.publishedAt))}
                </time>
                <span className="mt-2 block normal-case tracking-normal">
                  {note.readingTime} min read
                </span>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-10">
          <p className="eyebrow">In progress</p>
          <h2 className="max-w-2xl text-3xl font-semibold">
            The next topics in the queue.
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {upcomingTopics.map((topic) => (
              <article key={topic.title} className="bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-wider text-accent-strong">
                  {topic.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-secondary">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
