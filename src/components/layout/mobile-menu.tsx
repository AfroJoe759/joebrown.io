"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { NavigationLink } from "@/components/layout/navigation-link";
import { contactNavigationItem, primaryNavigation } from "@/content/navigation";

const links = [
  { href: "/", label: "Home" },
  ...primaryNavigation,
  contactNavigationItem,
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const inertElements = [
      document.querySelector<HTMLElement>("[data-skip-link]"),
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
      ...document.querySelectorAll<HTMLElement>(
        "header a, header button:not([aria-controls='mobile-navigation']):not([data-theme-control])",
      ),
    ].filter((element): element is HTMLElement => Boolean(element));
    const previousInertValues = inertElements.map((element) => element.inert);
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    inertElements.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }

      if (event.key === "Tab" && panelRef.current) {
        const themeControl = document.querySelector<HTMLButtonElement>(
          "[data-theme-control]",
        );
        const focusable = [
          themeControl,
          triggerRef.current,
          ...panelRef.current.querySelectorAll<HTMLAnchorElement>("a"),
        ].filter((element): element is HTMLButtonElement | HTMLAnchorElement =>
          Boolean(element),
        );
        const first = focusable[0];
        const last = focusable.at(-1);

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    const desktopViewport = window.matchMedia("(min-width: 768px)");
    desktopViewport.addEventListener("change", handleViewportChange);
    document.addEventListener("keydown", handleKey);

    return () => {
      inertElements.forEach((element, index) => {
        element.inert = previousInertValues[index];
      });
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      desktopViewport.removeEventListener("change", handleViewportChange);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const navigationOverlay = open
    ? createPortal(
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 border-t border-border bg-background md:hidden">
          <nav
            id="mobile-navigation"
            ref={panelRef}
            aria-label="Mobile navigation"
            className="h-full overflow-y-auto px-5 py-6 sm:px-8"
          >
            <div className="mx-auto max-w-shell divide-y divide-border border-y border-border">
              {links.map((link) => (
                <NavigationLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex min-h-16 items-center justify-between px-3 py-4 text-lg font-semibold transition-colors hover:bg-elevated focus-visible:bg-elevated aria-[current=page]:bg-surface aria-[current=page]:text-accent-strong"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="text-secondary transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  >
                    →
                  </span>
                </NavigationLink>
              ))}
            </div>
          </nav>
        </div>,
        document.body,
      )
    : null;

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-lg border border-border transition-colors hover:bg-elevated aria-expanded:bg-elevated"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute bottom-0.5 left-0 h-0.5 w-5 rounded-full bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </span>
      </button>
      {navigationOverlay}
    </div>
  );
}
