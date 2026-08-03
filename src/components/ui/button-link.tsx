import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const variantClass = {
    primary: "bg-action text-white hover:bg-action-hover",
    secondary:
      "border border-border bg-surface text-primary hover:border-accent hover:bg-elevated hover:text-accent-strong",
  }[variant];
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${variantClass} ${className}`}
      {...props}
    />
  );
}
