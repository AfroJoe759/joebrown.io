import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-600.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { createPersonJsonLd } from "@/content/person-json-ld";
import { site } from "@/content/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  icons: {
    icon: "/brand/favicon-blue-j.png",
    apple: "/brand/apple-touch-icon-blue-j.png",
  },
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = createPersonJsonLd(site);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="/theme.js" strategy="beforeInteractive" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-primary px-4 py-3 font-semibold text-background focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="page-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
