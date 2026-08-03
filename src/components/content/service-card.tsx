"use client";

import { useId, useState } from "react";

import type { Service } from "@/content/services";

export function ServiceCard({
  index,
  service,
}: {
  index: number;
  service: Service;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `${useId().replaceAll(":", "")}-service-panel`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="transition-colors lg:px-5 lg:hover:bg-elevated">
      <h2 className="lg:hidden">
        <button
          type="button"
          className="group flex w-full items-center gap-4 py-7 text-left"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((value) => !value)}
        >
          <span className="font-mono text-sm text-accent-strong">{number}</span>
          <span className="flex-1 text-lg font-semibold">{service.title}</span>
          <span
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-lg text-accent-strong transition-transform group-aria-expanded:rotate-45"
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h2>
      <div
        id={panelId}
        className={`${expanded ? "block" : "hidden"} pb-8 lg:grid lg:grid-cols-[4rem_1fr_1fr] lg:gap-8 lg:py-12`}
      >
        <p className="hidden font-mono text-sm text-accent-strong lg:block">
          {number}
        </p>
        <div>
          <h2 className="hidden text-2xl font-semibold lg:block">
            {service.title}
          </h2>
          <p className="max-w-xl leading-7 text-secondary lg:mt-3">
            {service.summary}
          </p>
        </div>
        <div className="mt-6 grid gap-6 min-[480px]:grid-cols-2 lg:mt-0">
          <div>
            <h3 className="text-sm font-semibold">Problems</h3>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              {service.problems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Deliverables</h3>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
