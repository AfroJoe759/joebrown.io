import { projects } from "@/content/projects";
import { describe, expect, it } from "vitest";

describe("projects", () => {
  it("contains unique, URL-safe slugs", () => {
    const slugs = projects.map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it("contains at least one featured case study", () => {
    expect(projects.some(({ featured }) => featured)).toBe(true);
  });
});
