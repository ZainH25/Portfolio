"use client";

import Link from "next/link";
import { navLinks, site } from "@/lib/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Header() {
  const activeHref = useActiveSection(navLinks);

  return (
    <header className="pointer-events-none fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:top-5">
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full nav-glass px-3 py-2 md:gap-4 md:px-5 md:py-2.5",
        )}
      >
        <Link
          href="#hero"
          className="shrink-0 font-[family-name:var(--font-display)] text-sm tracking-tight text-foreground md:text-base"
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors md:text-xs",
                  active
                    ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(45,140,255,0.35)]"
                    : "text-muted hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-gradient-to-r from-primary to-sky-400 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-background shadow-md shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98] md:text-xs"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
