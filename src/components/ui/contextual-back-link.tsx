import Link from "next/link";

export function ContextualBackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group mb-8 inline-flex min-h-11 items-center gap-1 rounded text-sm font-semibold text-accent-strong"
    >
      <span
        aria-hidden="true"
        className="transition-transform group-hover:-translate-x-1 group-focus-visible:-translate-x-1"
      >
        ←
      </span>
      {children}
    </Link>
  );
}
