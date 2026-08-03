import { describe, expect, it } from "vitest";

import { estimateReadingTime, parseNoteSource } from "@/lib/note-content";

const validFrontMatter = `---
title: "A useful note"
description: "A sufficiently detailed description for a published engineering note."
category: "Testing"
publishedAt: "2026-08-03"
draft: false
---`;

describe("note content", () => {
  it("parses validated metadata and derives the slug", () => {
    const note = parseNoteSource(
      "useful-note.md",
      `${validFrontMatter}\n\nUseful content.`,
    );

    expect(note).toMatchObject({
      title: "A useful note",
      slug: "useful-note",
      publishedAt: "2026-08-03",
      draft: false,
      readingTime: 1,
    });
  });

  it("rejects malformed front matter", () => {
    expect(() =>
      parseNoteSource(
        "invalid.md",
        "---\ntitle: Missing required fields\n---\nContent",
      ),
    ).toThrow();
  });

  it("rounds reading time up and never returns zero", () => {
    expect(estimateReadingTime("")).toBe(1);
    expect(
      estimateReadingTime(Array.from({ length: 221 }, () => "word").join(" ")),
    ).toBe(2);
  });
});
