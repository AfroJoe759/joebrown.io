import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { getAllNotes } from "@/lib/notes";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(
  "Engineering Notes",
  "Engineering notes from Joe Brown about CI performance, testing, developer tooling, workflow architecture, and practical AI.",
  "/notes",
);

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
      </section>
    </>
  );
}
