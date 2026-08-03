import matter from "gray-matter";
import { z } from "zod";

const noteMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(40).max(220),
  category: z.string().min(1),
  publishedAt: z.string().date(),
  draft: z.boolean().default(false),
});

export type NoteMetadata = z.infer<typeof noteMetadataSchema> & {
  slug: string;
  readingTime: number;
};

export type Note = NoteMetadata & { content: string };

export function estimateReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

export function parseNoteSource(fileName: string, source: string): Note {
  const { data, content } = matter(source);
  const metadata = noteMetadataSchema.parse(data);

  return {
    ...metadata,
    slug: fileName.replace(/\.md$/, ""),
    readingTime: estimateReadingTime(content),
    content,
  };
}
