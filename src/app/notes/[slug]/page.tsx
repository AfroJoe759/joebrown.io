import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ContextualBackLink } from "@/components/ui/contextual-back-link";
import { createArticleJsonLd } from "@/content/article-json-ld";
import { serializeJsonLd } from "@/lib/json-ld";
import { getAllNotes, getNote } from "@/lib/notes";
import { createMetadata } from "@/lib/metadata";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

const publishedDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);

  return note
    ? createMetadata(note.title, note.description, `/notes/${slug}`, {
        type: "article",
        publishedTime: note.publishedAt,
      })
    : {};
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNote(slug);

  if (!note) notFound();

  const articleJsonLd = createArticleJsonLd(note);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <header className="page-shell page-hero border-b border-border">
        <ContextualBackLink href="/notes">Engineering notes</ContextualBackLink>
        <p className="eyebrow">{note.category}</p>
        <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
          {note.title}
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-8 text-secondary">
          {note.description}
        </p>
        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-secondary">
          <time dateTime={note.publishedAt}>
            {publishedDateFormatter.format(new Date(note.publishedAt))}
          </time>
          <span aria-hidden="true"> · </span>
          {note.readingTime} min read
        </p>
      </header>
      <div className="page-shell py-16 sm:py-20">
        <div className="prose-custom max-w-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
