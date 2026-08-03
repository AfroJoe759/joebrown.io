"use client";

import { useEffect, useRef, useState } from "react";

import { NavigationLink } from "@/components/layout/navigation-link";
import { contactNavigationItem, primaryNavigation } from "@/content/navigation";

const links = [...primaryNavigation, contactNavigationItem];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = [
          ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
        ];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 items-center rounded-lg border border-border px-3 text-sm font-semibold"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      {open ? (
        <div
          className="fixed inset-0 top-[73px] z-40 bg-background/95 p-6 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div
            id="mobile-navigation"
            ref={panelRef}
            className="mx-auto flex max-w-shell flex-col gap-2"
          >
            <button
              type="button"
              className="mb-4 inline-flex min-h-11 items-center self-end rounded-lg border border-border px-4 text-sm font-semibold"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              Close menu
            </button>
            {links.map((link) => (
              <NavigationLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-4 text-xl font-semibold hover:bg-surface aria-[current=page]:bg-surface aria-[current=page]:text-accent-strong"
              >
                {link.label}
              </NavigationLink>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
