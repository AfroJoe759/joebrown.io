"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavigationLinkProps = ComponentProps<typeof Link>;

export function NavigationLink({ href, ...props }: NavigationLinkProps) {
  const pathname = usePathname();
  const hrefPath = typeof href === "string" ? href : href.pathname;
  const isCurrent =
    hrefPath === "/"
      ? pathname === hrefPath
      : Boolean(
          hrefPath &&
          (pathname === hrefPath || pathname.startsWith(`${hrefPath}/`)),
        );

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      {...props}
    />
  );
}
