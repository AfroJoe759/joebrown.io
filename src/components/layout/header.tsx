import Link from "next/link";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavigationLink } from "@/components/layout/navigation-link";
import { ThemeControl } from "@/components/layout/theme-control";
import { ButtonLink } from "@/components/ui/button-link";
import { contactNavigationItem, primaryNavigation } from "@/content/navigation";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-shell items-center gap-5 px-5 sm:px-8">
        <Link
          href="/"
          className="mr-auto rounded font-mono text-sm font-bold tracking-tight"
        >
          JOE BROWN
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {primaryNavigation.map((link) => (
            <NavigationLink
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-secondary hover:bg-surface hover:text-primary aria-[current=page]:bg-surface aria-[current=page]:text-primary"
            >
              {link.label}
            </NavigationLink>
          ))}
        </nav>
        <ThemeControl />
        <ButtonLink
          href={contactNavigationItem.href}
          className="hidden md:inline-flex"
        >
          {contactNavigationItem.label}
        </ButtonLink>
        <MobileMenu />
      </div>
    </header>
  );
}
