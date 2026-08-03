import type { site as siteData } from "@/content/site";

type Site = typeof siteData;

export function createPersonJsonLd(site: Site) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.title,
    sameAs: [site.githubUrl, site.linkedinUrl],
  };
}
