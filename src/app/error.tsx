"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="page-shell flex min-h-[65vh] flex-col justify-center py-24">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="text-5xl font-semibold tracking-tight">
        This page couldn’t load.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-secondary">
        Try again. If the problem continues, use the contact page to let me
        know.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 min-h-11 self-start rounded-lg bg-primary px-5 font-semibold text-background"
      >
        Try again
      </button>
    </section>
  );
}
