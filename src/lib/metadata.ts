import type { Metadata } from "next";

import { site } from "@/content/site";

type MetadataOptions =
  | { type?: "website"; publishedTime?: never }
  | { type: "article"; publishedTime: string };

export function createMetadata(
  title: string,
  description: string,
  path = "",
  options: MetadataOptions = {},
): Metadata {
  const url = new URL(path, site.url);
  const openGraph: Metadata["openGraph"] =
    options.type === "article"
      ? {
          title,
          description,
          url,
          siteName: site.name,
          type: "article",
          publishedTime: options.publishedTime,
        }
      : {
          title,
          description,
          url,
          siteName: site.name,
          type: "website",
        };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: { card: "summary_large_image", title, description },
  };
}
