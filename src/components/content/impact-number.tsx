"use client";

import { useEffect, useRef, useState } from "react";

import { useImpactAnimation } from "@/components/content/impact-metric-group";

type ImpactNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export function ImpactNumber({
  value,
  prefix = "",
  suffix = "",
}: ImpactNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationFrameRef = useRef(0);
  const { reducedMotion, startedAt } = useImpactAnimation();

  useEffect(() => {
    if (reducedMotion || startedAt === null) return;

    setDisplayValue(0);
    const duration = 1000;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [reducedMotion, startedAt, value]);

  return (
    <span>
      <span className="sr-only">
        {prefix}
        {numberFormatter.format(value)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {numberFormatter.format(displayValue)}
        {suffix}
      </span>
    </span>
  );
}
