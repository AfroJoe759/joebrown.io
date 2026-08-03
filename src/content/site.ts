import { z } from "zod";

import { siteValues } from "@/content/site-values";

const httpUrl = z
  .string()
  .url()
  .refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "URL must use HTTP or HTTPS");

const siteSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(50).max(180),
  url: httpUrl,
  email: z.string().email(),
  githubUrl: httpUrl,
  linkedinUrl: httpUrl,
});

export const site = siteSchema.parse({
  name: siteValues.name,
  title: siteValues.title,
  description: siteValues.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? siteValues.defaultUrl,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? siteValues.defaultEmail,
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? siteValues.defaultGithubUrl,
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? siteValues.defaultLinkedinUrl,
});
