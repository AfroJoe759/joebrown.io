import { z } from "zod";

const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(20),
  role: z.string().min(1),
  status: z.enum(["Active", "In progress", "Complete"]),
  type: z.enum(["Personal", "Open source", "Employer"]),
  technologies: z.array(z.string()).min(1),
  problem: z.string().min(20),
  constraints: z.array(z.string()).min(1),
  approach: z.array(z.string()).min(1),
  architecture: z
    .object({
      label: z.string().min(20),
      steps: z.array(z.string().min(1)).min(2),
    })
    .optional(),
  tradeoffs: z.array(z.string()).min(1),
  testing: z.array(z.string()).min(1),
  outcome: z.string().min(20),
  lessons: z.array(z.string()).min(1),
  featured: z.boolean(),
  visual: z
    .object({
      src: z.string().startsWith("/").optional(),
      lightSrc: z.string().startsWith("/").optional(),
      darkSrc: z.string().startsWith("/").optional(),
      alt: z.string().min(1),
      caption: z.string().min(20).optional(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .refine(
      ({ src, lightSrc, darkSrc }) => Boolean(src || lightSrc || darkSrc),
      "A project visual requires at least one image source",
    )
    .optional(),
});

const projectData = [
  {
    slug: "personal-website",
    title: "My Personal Website",
    summary:
      "A static-first Next.js portfolio built around typed content, accessible server-rendered pages, and detailed engineering case studies.",
    role: "Product designer and full-stack engineer",
    status: "Active",
    type: "Personal",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest"],
    problem:
      "Most portfolio sites show finished screens without explaining their constraints or implementation. This site needed to publish that engineering context while remaining fast, accessible, inexpensive to operate, and useful without client-side JavaScript.",
    constraints: [
      "No database, CMS, authentication, or runtime content dependency in the first release.",
      "Core pages must work without client-side JavaScript.",
      "Unverified employer details and performance claims cannot be published.",
    ],
    approach: [
      "Use the Next.js App Router with Server Components and static rendering by default.",
      "Keep content in typed, version-controlled modules and validate it during builds.",
      "Define a small token-based design system with narrow interactive boundaries.",
    ],
    architecture: {
      label:
        "Content moves from validated source files through a static Next.js build and CDN to the visitor",
      steps: ["Typed content", "Static build", "Edge delivery"],
    },
    tradeoffs: [
      "Git-based content favors reviewability and low operational overhead over nontechnical editing.",
      "The initial visual language favors typography and layout over image-heavy presentation.",
      "The contact experience uses direct channels until server-side delivery and abuse controls are configured.",
    ],
    testing: [
      "Schema and helper unit tests",
      "Critical navigation and theme browser tests",
      "Type, lint, accessibility, and production-build checks in CI",
    ],
    outcome:
      "Projects, roles, and services are validated data modules, so new entries can be added without changing the route or card architecture.",
    lessons: [
      "Requiring every project to document constraints, testing, and tradeoffs produces stronger case studies than a screenshot gallery.",
      "Static rendering covers nearly the entire product; client JavaScript is reserved for theme controls, motion, and count-up metrics.",
    ],
    featured: true,
    visual: {
      lightSrc: "/images/projects/personal-website/preview-light.png",
      darkSrc: "/images/projects/personal-website/preview-dark.png",
      alt: "Homepage of Joe Brown’s personal engineering website",
      caption:
        "The homepage pairs direct positioning with a delivery feedback loop that makes platform and performance work tangible.",
      width: 1440,
      height: 900,
    },
  },
] satisfies z.input<typeof projectSchema>[];

export const projects = z
  .array(projectSchema)
  .superRefine((items, context) => {
    const slugs = new Set<string>();
    items.forEach((item, index) => {
      if (slugs.has(item.slug)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate slug: ${item.slug}`,
          path: [index, "slug"],
        });
      }
      slugs.add(item.slug);
    });
  })
  .parse(projectData);

export type Project = z.infer<typeof projectSchema>;

const externalProjectSchema = z.object({
  title: z.string().min(1),
  url: z
    .string()
    .url()
    .refine((value) => ["http:", "https:"].includes(new URL(value).protocol)),
  summary: z.string().min(20),
  technologies: z.array(z.string()).min(1),
});

export const additionalProjects = z.array(externalProjectSchema).parse([
  {
    title: "Logic Apps UX",
    url: "https://github.com/Azure/LogicAppsUX",
    summary:
      "Contributed parsing and state-management fixes to Microsoft’s open-source workflow interface library while improving modularity for enterprise-scale workflows.",
    technologies: [
      "TypeScript",
      "React",
      "Redux",
      "Node.js",
      "Jest",
      "Playwright",
    ],
  },
  {
    title: "FEMR — Fast Electronic Medical Records",
    url: "https://github.com/FEMR/femr",
    summary:
      "Improved an open-source electronic medical record system through feature work, bug fixes, and stronger data validation and usability.",
    technologies: [
      "Java",
      "JavaScript",
      "Play Framework",
      "HTML",
      "CSS",
      "Git",
    ],
  },
  {
    title: "Math Corps — Student Management Platform",
    url: "https://mathcorps.org",
    summary:
      "Led a four-person team building a student registration and analytics platform spanning architecture, APIs, persistence, testing, and reporting.",
    technologies: ["PHP", "Laravel", "JavaScript", "MySQL", "AWS"],
  },
]);
