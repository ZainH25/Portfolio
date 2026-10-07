"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Header() {
  const activeHref = useActiveSection(navLinks);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className="pointer-events-none fixed left-0 right-0 z-50 flex justify-center px-3 sm:px-4 top-[max(0.75rem,env(safe-area-inset-top))] md:top-5"
    >
      <div className="pointer-events-auto relative w-full max-w-5xl">
        <div
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-full nav-glass px-2.5 py-2 sm:gap-3 sm:px-3 md:px-5 md:py-2.5",
          )}
        >
          <Link
            href="#hero"
            onClick={() => setMenuOpen(false)}
            className="min-w-0 shrink font-[family-name:var(--font-display)] text-xs tracking-tight text-foreground sm:text-sm md:text-base"
          >
            {site.name}
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary">
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

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-foreground transition-colors hover:border-primary/40 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-site-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-primary to-sky-400 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-background shadow-md shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98] sm:px-4 sm:text-[10px] md:text-xs"
            >
              Resume
            </a>
          </div>
        </div>

        {menuOpen ? (
          <>
            <button
              type="button"
              className="pointer-events-auto fixed inset-0 z-[49] bg-black/55 lg:hidden"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="mobile-site-nav"
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[51] flex flex-col gap-0.5 rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl shadow-black/40 backdrop-blur-xl lg:hidden"
              aria-label="Mobile"
            >
              {navLinks.map((link) => {
                const active = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-left text-sm font-semibold tracking-wide transition-colors",
                      active
                        ? "bg-primary/15 text-primary"
                        : "text-foreground/90 hover:bg-surface/80",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </>
        ) : null}
      </div>
    </header>
  );
}
