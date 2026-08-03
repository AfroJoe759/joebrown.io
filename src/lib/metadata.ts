import type { Metadata } from "next";

import { site } from "@/content/site";

export function createMetadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  const url = new URL(path, site.url);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
