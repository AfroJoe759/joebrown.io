"use client";

import { useEffect, useRef, useState } from "react";

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
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setDisplayValue(0);
    const element = elementRef.current;
    if (!element) return;

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 900;
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));
          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <span ref={elementRef}>
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
