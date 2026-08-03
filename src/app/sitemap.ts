import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { getAllNotes } from "@/lib/notes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getAllNotes();
  const routes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/services",
    "/notes",
    "/contact",
  ];
  return [
    ...routes.map((path) => ({
      url: new URL(path || "/", site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...notes.map((note) => ({
      url: new URL(`/notes/${note.slug}`, site.url).toString(),
      lastModified: note.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
