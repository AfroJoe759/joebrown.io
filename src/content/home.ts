export type ImpactMetric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  prominence: "primary" | "supporting";
};

export const impactMetrics: ImpactMetric[] = [
  {
    value: 1000000,
    suffix: "+",
    label: "monthly active users",
    detail:
      "Implemented collaborative automation sharing in Power Automate with TypeScript, React, C#, and .NET.",
    prominence: "primary",
  },
  {
    value: 95,
    suffix: "%",
    label: "infrastructure savings",
    detail:
      "Moved presence detection from Ably to Firebase and documented a migration path reused by other teams.",
    prominence: "primary",
  },
  {
    value: 72,
    suffix: "%",
    label: "lower CI costs",
    detail:
      "Reduced average pipeline spend through dynamic test selection, sharding, incremental builds, and caching.",
    prominence: "supporting",
  },
  {
    value: 3,
    suffix: "×",
    label: "faster rebuilds",
    detail:
      "Made local and CI rebuilds three times faster in Zapier’s largest Next.js and TypeScript application.",
    prominence: "supporting",
  },
  {
    value: 15000,
    suffix: "+",
    label: "strings internationalized",
    detail:
      "Extracted user-facing copy, introduced an i18n layer, and connected the repository to Lokalize.",
    prominence: "supporting",
  },
  {
    value: 11,
    label: "services brought into compliance",
    detail:
      "Brought 11 production services beyond minimum compliance requirements within one month.",
    prominence: "supporting",
  },
];

export const conversationTopics = [
  "Product architecture",
  "Developer productivity",
  "Practical AI integrations",
] as const;
