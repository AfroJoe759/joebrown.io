"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ImpactAnimation = {
  startedAt: number | null;
  reducedMotion: boolean;
};

const ImpactAnimationContext = createContext<ImpactAnimation | null>(null);

export function ImpactMetricGroup({ children }: { children: ReactNode }) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<ImpactAnimation>({
    startedAt: null,
    reducedMotion: false,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setAnimation({ startedAt: null, reducedMotion: true });
      return;
    }

    const group = groupRef.current;
    if (!group) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setAnimation({ startedAt: performance.now(), reducedMotion: false });
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  return (
    <ImpactAnimationContext.Provider value={animation}>
      <div ref={groupRef}>{children}</div>
    </ImpactAnimationContext.Provider>
  );
}

export function useImpactAnimation() {
  const animation = useContext(ImpactAnimationContext);

  if (!animation) {
    throw new Error("ImpactNumber must be rendered inside ImpactMetricGroup");
  }

  return animation;
}
