import { z } from "zod";

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  dates: z.string(),
  location: z.string(),
  current: z.boolean(),
  summary: z.string().min(20),
  focus: z.array(z.string()).min(1),
  impactGroups: z
    .array(
      z.object({
        title: z.string().min(1),
        highlights: z.array(z.string()).min(1),
        relatedNotes: z
          .array(
            z.object({
              title: z.string().min(1),
              href: z.string().startsWith("/notes/"),
            }),
          )
          .optional(),
      }),
    )
    .min(1),
  technologies: z.array(z.string()).min(1),
});

export const experience = z.array(experienceSchema).parse([
  {
    company: "Zapier",
    role: "Senior Software Engineer",
    dates: "January 2026 to present",
    location: "Remote",
    current: true,
    summary:
      "I lead full-stack product and platform work across workflow automation, developer productivity, performance, security, and delivery infrastructure.",
    focus: [
      "Engineering productivity and performance",
      "Workflow collaboration",
      "Security automation and AI tooling",
      "Compliance and service maturity",
      "Enterprise customer success",
    ],
    impactGroups: [
      {
        title: "Platform performance and developer productivity",
        highlights: [
          "Led build and CI/CD improvements for Zapier’s largest Next.js and TypeScript application, reducing production builds by 25%, test execution by 30%, CI shard allocation by 90%, and average pipeline costs by approximately 72% while making rebuilds three times faster and improving page loads by 15%.",
          "Led the migration of presence detection from Ably to Firebase, reducing annual infrastructure costs by approximately 95% and establishing a migration strategy adopted by additional teams.",
          "Led internationalization for one of Zapier’s largest repositories, extracting more than 15,000 user-facing strings and introducing the product’s first scalable translation workflow with Lokalize.",
          "Automated production deployment pipelines across multiple services, eliminating manual releases and improving deployment consistency.",
        ],
        relatedNotes: [
          {
            title: "How barrel files slow down TypeScript builds",
            href: "/notes/typescript-barrel-files-performance",
          },
          {
            title:
              "How switching from Ably to Firebase cut real-time infrastructure costs by 95%",
            href: "/notes/ably-to-firebase-cost-savings",
          },
        ],
      },
      {
        title: "Security, compliance, and AI tooling",
        highlights: [
          "Led a one-month initiative to bring 11 production services into compliance, completing the effort ahead of schedule while exceeding organizational security requirements.",
          "Developed an AI-powered security triage agent that reduced manual security analysis from hours or days to minutes, accelerated vulnerability remediation, and became widely adopted across multiple engineering teams.",
        ],
      },
      {
        title: "Product and enterprise outcomes",
        highlights: [
          "Led resolution of critical issues affecting strategic enterprise customers, helping retain high-value customer relationships and enabling the successful onboarding of a major enterprise customer.",
          "Designed editable, versioned automation templates and automatic draft saving to improve collaboration and protect complex workflow edits from accidental data loss.",
        ],
      },
    ],
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Go",
      "SQL",
      "Firebase",
      "AI engineering",
    ],
  },
  {
    company: "Microsoft",
    role: "Software Engineer II",
    dates: "August 2022 to January 2026",
    location: "Redmond, Washington · Remote",
    current: false,
    summary:
      "I led product, developer-tooling, test-automation, and accessibility initiatives for Power Platform and Copilot Studio.",
    focus: [
      "Developer tooling",
      "Copilot Studio",
      "Accessibility and test automation",
      "AI security testing",
    ],
    impactGroups: [
      {
        title: "Product engineering and Copilot",
        highlights: [
          "Partnered with designers and product managers to deliver and optimize the Copilot Studio Automation Editor ahead of schedule, improving performance for a feature that grew from more than 40,000 to more than 250,000 monthly active users during my tenure.",
          "Enabled external API integrations in Copilot automations, expanding Microsoft Copilot Studio and Microsoft 365 capabilities.",
        ],
      },
      {
        title: "Quality, accessibility, and delivery systems",
        highlights: [
          "Led a cross-team initiative that scaled automated test coverage across Power Platform from approximately 20% to 100% and improved pass rates from 15% to 96%, reducing regressions, eliminating vendor reliance, and saving 22 weeks of developer time annually.",
          "Led WCAG 2.1 accessibility testing and remediation for Copilot Studio, supporting adoption by enterprise and government customers.",
          "Developed release dashboards, feature-flagging tools, Playwright test generators, and coverage reporting that reduced manual work across multiple organizations.",
          "Engineered Azure DevOps YAML delivery pipelines for Power Platform and Copilot services, removing manual deployer roles and saving an estimated three to five months of engineering time annually.",
          "Built monitoring and region-specific end-to-end validation pipelines that improved regression detection, global rollouts, and backward-compatibility assurance.",
        ],
      },
      {
        title: "AI safety and technical leadership",
        highlights: [
          "Developed automated adversarial evaluation pipelines for GPT-4, identifying reliability and safety issues that were responsibly disclosed to OpenAI.",
          "Mentored junior engineers through office hours, onboarding, and technical guidance, improving adoption of automation tooling and supporting long-term engineering growth.",
        ],
      },
    ],
    technologies: [
      "TypeScript",
      "React",
      "Python",
      "Pytest",
      "Playwright",
      "Azure DevOps",
      "GPT-4",
    ],
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    dates: "May 2020 to August 2022",
    location: "Bellevue, Washington · Remote",
    current: false,
    summary:
      "I built product features and test infrastructure for Power Automate, focusing on collaboration, regression detection, and engineering ownership.",
    focus: ["Power Automate", "Product engineering", "Testing infrastructure"],
    impactGroups: [
      {
        title: "Product and collaboration experiences",
        highlights: [
          "Implemented collaborative automation sharing with TypeScript, React, C#, and .NET, which surpassed one million monthly active users and became one of Power Automate’s most widely adopted features during my tenure.",
          "Developed an automation versioning and history proof of concept that won an internal hackathon and was later adopted as a core product feature used by more than 40,000 people each month.",
        ],
      },
      {
        title: "Testing infrastructure and ownership",
        highlights: [
          "Built Power Automate’s TypeScript and Playwright UI testing framework, eliminating manual bug bashes and reducing regression detection time by 60%.",
          "Developed JUnit and JSON to TRX converters that added Azure DevOps support for test-ownership metadata and linked failures directly to responsible engineering teams.",
          "Created a pipeline failure-notification system that delivered reports to test owners and accelerated resolution of critical issues.",
        ],
      },
    ],
    technologies: [
      "TypeScript",
      "React",
      "C#",
      ".NET",
      "Playwright",
      "Azure DevOps",
    ],
  },
  {
    company: "DCS Corporation",
    role: "Software Engineer",
    dates: "December 2018 to February 2020",
    location: "Warren, Michigan",
    current: false,
    summary:
      "I developed monitoring, computer-vision, and delivery infrastructure for the Department of Defense’s Next Generation Combat Vehicle program.",
    focus: ["Network monitoring", "Video systems", "Delivery infrastructure"],
    impactGroups: [
      {
        title: "Systems and applied engineering",
        highlights: [
          "Developed network-monitoring and video-streaming latency tools using C, C++, Python, Qt, and OpenCV.",
          "Contributed to AI and machine-learning initiatives for image detection and navigation in robotic systems.",
        ],
      },
      {
        title: "Delivery infrastructure",
        highlights: [
          "Implemented CI/CD pipelines with AWS, Docker, and Jenkins, enabling automated deployments for the first time.",
        ],
      },
    ],
    technologies: ["C++", "Python", "Qt", "OpenCV", "AWS", "Docker"],
  },
]);

export const education = [
  {
    institution: "Georgia Institute of Technology",
    degree: "Master of Science in Computer Science",
    detail: "Artificial Intelligence concentration",
    completed: "May 2023",
  },
  {
    institution: "Wayne State University",
    degree: "Bachelor of Science in Computer Science",
    completed: "December 2018",
  },
] as const;
