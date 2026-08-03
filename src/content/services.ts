import { z } from "zod";

const serviceSchema = z.object({
  title: z.string(),
  summary: z.string().min(20),
  problems: z.array(z.string()).min(1),
  deliverables: z.array(z.string()).min(1),
});

export const services = z.array(serviceSchema).parse([
  {
    title: "Product and full-stack development",
    summary:
      "Turn clear product requirements into maintainable web applications that teams can continue to own.",
    problems: ["New applications", "Incomplete MVPs", "Internal tools"],
    deliverables: [
      "Planning",
      "Implementation",
      "Testing",
      "Deployment and handoff",
    ],
  },
  {
    title: "Backend systems and integrations",
    summary:
      "Design and improve APIs, service boundaries, data flows, and third-party integrations.",
    problems: [
      "Unreliable APIs",
      "Complex integrations",
      "Unclear service boundaries",
    ],
    deliverables: [
      "Technical design",
      "API implementation",
      "Reliability review",
    ],
  },
  {
    title: "Practical AI features",
    summary:
      "Move AI ideas from demos into evaluated, observable, and resilient product workflows.",
    problems: [
      "Brittle LLM integration",
      "No evaluation strategy",
      "Unclear product fit",
    ],
    deliverables: [
      "Use-case evaluation",
      "Structured workflows",
      "Retries and observability",
    ],
  },
  {
    title: "Performance and developer experience",
    summary:
      "Find and remove the bottlenecks that slow applications, builds, tests, and delivery teams.",
    problems: ["Slow builds or tests", "Frontend bottlenecks", "CI friction"],
    deliverables: [
      "Performance profile",
      "Prioritized plan",
      "Implementation support",
    ],
  },
  {
    title: "Architecture and technical advising",
    summary:
      "Review a system and its assumptions, then provide recommendations a team can act on.",
    problems: ["Scaling risk", "Codebase health", "Unclear technical plan"],
    deliverables: [
      "Architecture review",
      "Risk assessment",
      "Implementation roadmap",
    ],
  },
]);
