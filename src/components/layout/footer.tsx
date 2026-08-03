import Link from "next/link";

import { SocialIcon } from "@/components/ui/social-icon";
import { primaryNavigation } from "@/content/navigation";
import { site } from "@/content/site";

const footerLinkClassName =
  "group -mx-2 flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-elevated hover:text-primary focus-visible:bg-elevated focus-visible:text-primary";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-12 sm:px-8 md:grid-cols-2">
        <div>
          <Link
            href="/"
            className="-mx-2 inline-flex rounded-md px-2 py-1.5 font-mono text-sm font-bold transition-colors hover:bg-elevated focus-visible:bg-elevated"
          >
            JOE BROWN
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-secondary">
            Building workflow products, CI systems, developer tools, and
            practical AI features.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="mb-3 font-semibold">Explore</p>
            <div className="flex flex-col gap-2 text-secondary">
              {primaryNavigation.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={footerLinkClassName}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-semibold">Connect</p>
            <div className="flex flex-col gap-2 text-secondary">
              <a
                href={site.githubUrl}
                rel="me noreferrer"
                className={footerLinkClassName}
              >
                <SocialIcon
                  service="github"
                  className="h-4 w-4 transition-colors group-hover:text-accent-strong group-focus-visible:text-accent-strong"
                />
                GitHub
              </a>
              <a
                href={site.linkedinUrl}
                rel="me noreferrer"
                className={footerLinkClassName}
              >
                <SocialIcon
                  service="linkedin"
                  className="h-4 w-4 transition-colors group-hover:text-accent-strong group-focus-visible:text-accent-strong"
                />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-shell border-t border-border px-5 py-5 text-xs text-secondary sm:px-8">
        © {new Date().getFullYear()} Joe Brown.
      </div>
    </footer>
  );
}
