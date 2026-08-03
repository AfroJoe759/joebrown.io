# My Personal Website

The source for [joebrown.io](https://joebrown.io), a static-first portfolio and
engineering website built with Next.js, React, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 22 LTS
- npm 10 or newer
- Git

## Quick Start

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:8000](http://localhost:8000).

Use `npm install` instead of `npm ci` only when intentionally changing
dependencies. Commit the resulting `package-lock.json` changes.

## Configuration

The application works with the public defaults in `src/content/site.ts`. For
local or deployed overrides, copy `.env.example` to `.env.local` and configure:

| Variable                    | Purpose                                                   |
| --------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Production origin used for canonical URLs and the sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email                                      |
| `NEXT_PUBLIC_GITHUB_URL`    | Public GitHub profile                                     |
| `NEXT_PUBLIC_LINKEDIN_URL`  | Public LinkedIn profile                                   |

Variables prefixed with `NEXT_PUBLIC_` are included in browser-accessible code.
Never store secrets in them. Local `.env` files are ignored; `.env.example` is
committed as the configuration contract.

## Commands

| Command                    | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| `npm run dev`              | Start the development server on `127.0.0.1:8000`         |
| `npm run build`            | Create an optimized production build                     |
| `npm run start`            | Serve the production build on `127.0.0.1:8000`           |
| `npm run format:check`     | Check formatting with Prettier                           |
| `npm run lint`             | Run ESLint with zero warnings allowed                    |
| `npm run typecheck`        | Run strict TypeScript checks                             |
| `npm test`                 | Run Vitest unit and component tests                      |
| `npm run test:e2e`         | Run Playwright browser tests on port 4173                |
| `npm run capture:projects` | Refresh project previews from the server on port 8000    |
| `npm run validate`         | Run formatting, lint, types, tests, and production build |

Development, production, and browser tests use isolated `.next-dev`, `.next`,
and `.next-e2e` output directories. Validation and browser tests can run while
the development server is active.

## Browser Test Setup

Install Chromium once on each development machine:

```bash
npx playwright install chromium
```

Then run:

```bash
npm run test:e2e
```

Playwright creates and serves an isolated production build at
`http://127.0.0.1:4173`. Traces from a first retry and failure artifacts are
written to ignored test-output directories.

Project previews are deterministic local screenshots. Start the development
server, then run `npm run capture:projects` and commit the refreshed files under
`public/images/projects/<project-slug>/`. Preview capture uses fixed light- and
dark-mode viewports with reduced motion; it does not run as part of production
builds.

## Project Structure

```text
src/
├── app/                 Next.js routes, metadata, sitemap, and error states
├── components/
│   ├── content/         Domain-specific presentation and interactions
│   ├── layout/          Header, footer, navigation, and theme control
│   └── ui/              Small reusable interface primitives
├── content/             Typed site data and Markdown engineering notes
└── lib/                 Shared non-UI helpers
public/
├── documents/           Public downloads
└── images/
    ├── profile/         Profile photography
    └── projects/        Project-specific visual evidence
tests/e2e/               Critical Playwright journeys
```

Components are imported directly. Do not introduce barrel files.

## Routes

| Route              | Purpose                                                 |
| ------------------ | ------------------------------------------------------- |
| `/`                | Homepage and engineering-impact overview                |
| `/about`           | Engineering philosophy, interests, and personal context |
| `/experience`      | Career progression and selected impact                  |
| `/projects`        | Project and case-study index                            |
| `/projects/[slug]` | Statically generated case study                         |
| `/services`        | Consulting capabilities and engagement process          |
| `/notes`           | Engineering Notes roadmap and future content index      |
| `/contact`         | Direct contact and professional profiles                |

The resume is a direct static download at
`/documents/joe-brown-resume.pdf`; there is no separate resume page.

## Editing Content

Most public content lives in typed modules:

- `src/content/site.ts`: identity, metadata, and profile links
- `src/content/experience.ts`: roles, dates, impact, and technologies
- `src/content/projects.ts`: project summaries and case-study content
- `src/content/services.ts`: services, problems, and deliverables

Engineering notes live in `src/content/notes/*.md`. Each file requires validated
front matter with `title`, `description`, `category`, `publishedAt`, and `draft`.
Published notes are statically generated, included in the sitemap, and rendered
without enabling raw HTML in Markdown.

Zod validates content during module evaluation and production builds. Project
slugs must be unique and URL-safe. Published claims, dates, and metrics must be
verified before they are committed. Do not add proprietary employer details or
imply employer endorsement.

## Application Architecture

- Next.js App Router with static generation for public routes
- React Server Components by default
- Client Components limited to theme selection and small interactions
- No database, authentication, CMS, or runtime content API
- Local content rendered without client-side fetching
- CSS custom properties provide light and dark design tokens
- Explicit theme choices persist in local storage
- Security headers are configured in `next.config.ts`

## Debugging

### Missing `.next/server` files or `ENOENT`

Stop the affected Next.js process, remove only its generated cache, and restart:

```bash
rm -rf .next-dev
npm run dev
```

Source files are not stored in generated `.next*` directories. Use `.next-dev`
for development problems, `.next` for production builds, and `.next-e2e` for
browser-test problems.

### Port 8000 is already in use

Identify the listener:

```bash
lsof -nP -iTCP:8000 -sTCP:LISTEN
```

Stop the owning process only after confirming it is safe to terminate. The E2E
server uses port 4173 and should not conflict with development.

### A removed route still resolves

Next.js may retain generated route data during development. Stop the server,
remove `.next`, and restart. If the stale route appears only in browser tests,
remove `.next-e2e` before rerunning Playwright.

### Environment changes do not appear

Restart the development server after editing `.env.local`. Confirm that a
variable begins with `NEXT_PUBLIC_` only when it is intentionally public.

### Playwright cannot find Chromium

```bash
npx playwright install chromium
```

### Rendering or hydration problems

Check the terminal and browser console first. Then verify:

```bash
npm run typecheck
npm run lint
npm test
```

Theme state is applied before paint in `src/app/layout.tsx`. Avoid moving theme
initialization into an effect-only path, which would reintroduce flashes and
hydration differences.

## Quality Expectations

Before opening a pull request, run:

```bash
npm run validate
npm run test:e2e
```

Also review keyboard navigation, focus visibility, mobile layout, both themes,
200% zoom, and reduced motion. The target is WCAG 2.2 AA with Lighthouse scores
of 95 or better across Performance, Accessibility, Best Practices, and SEO.

## Deployment

The intended deployment platform is Vercel.

1. Import the GitHub repository into Vercel.
2. Configure the variables from `.env.example`.
3. Use the default Next.js build command and output settings.
4. Review the preview for content, accessibility, responsive layout, themes,
   and reduced motion.
5. Promote only after CI passes.

Production deployments should originate from the protected default branch.
Rollback through Vercel deployment history rather than editing production
directly.

## License

Source code is available under the MIT License. Personal writing, résumé
content, photography, logos, and other media remain all rights reserved. See
`LICENSE.md` for the complete terms.
