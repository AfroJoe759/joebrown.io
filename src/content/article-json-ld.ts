import type { NoteMetadata } from "@/lib/note-content";

import { site } from "@/content/site";

export function createArticleJsonLd(note: NoteMetadata) {
  const url = new URL(`/notes/${note.slug}`, site.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.description,
    datePublished: note.publishedAt,
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}
