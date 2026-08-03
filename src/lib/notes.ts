import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import {
  parseNoteSource,
  type Note,
  type NoteMetadata,
} from "@/lib/note-content";

const notesDirectory = path.join(process.cwd(), "src/content/notes");
const noteSlugPattern = /^[a-z0-9-]+$/;

async function readNoteFile(fileName: string): Promise<Note> {
  const source = await readFile(path.join(notesDirectory, fileName), "utf8");
  return parseNoteSource(fileName, source);
}

export const getAllNotes = cache(async (): Promise<NoteMetadata[]> => {
  const fileNames = (await readdir(notesDirectory)).filter((fileName) =>
    fileName.endsWith(".md"),
  );
  const notes = await Promise.all(fileNames.map(readNoteFile));

  return notes
    .filter((note) => !note.draft)
    .sort((first, second) =>
      second.publishedAt.localeCompare(first.publishedAt),
    )
    .map((note) => ({
      title: note.title,
      description: note.description,
      category: note.category,
      publishedAt: note.publishedAt,
      draft: note.draft,
      slug: note.slug,
      readingTime: note.readingTime,
    }));
});

export const getNote = cache(async (slug: string): Promise<Note | null> => {
  if (!noteSlugPattern.test(slug)) return null;

  try {
    const note = await readNoteFile(`${slug}.md`);
    return note.draft ? null : note;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
});
