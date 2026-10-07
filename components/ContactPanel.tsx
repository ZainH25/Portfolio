"use client";

import { useState } from "react";
import { ArrowUpRight, Code2, Copy, Link2, Mail, Phone } from "lucide-react";
import { contactSection, site } from "@/lib/content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

const links = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    icon: Mail,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    external: false,
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "Profile",
    href: site.linkedin,
    external: true,
    icon: Link2,
  },
  {
    label: "GitHub",
    value: "Repositories",
    href: site.github,
    external: true,
    icon: Code2,
  },
  {
    label: "Instagram",
    value: "@zain.h____",
    href: site.instagram,
    external: true,
    icon: InstagramIcon,
  },
] as const;

export function ContactPanel() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="contact" className="border-t border-border/50 px-6 py-16 md:py-24">
      <div data-fade-up className="section-shell">
        <div data-aether-avoid className="mx-auto flex max-w-md flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {contactSection.eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight text-foreground md:text-3xl">
            {contactSection.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contactSection.body}</p>
          <p className="mt-3 text-xs text-muted">{contactSection.note}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border bg-background/50 px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40"
          >
            <Copy className="h-3.5 w-3.5" strokeWidth={2} />
            {copied ? "Email copied" : "Copy email address"}
          </button>

          <ul className="mt-8 w-full space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-xl border border-border/80 bg-surface/40 px-4 py-3.5 transition-colors hover:border-primary/35 hover:bg-primary/5 md:px-5"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-background"
                    >
                      {item.label === "Instagram" ? (
                        <InstagramIcon className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      )}
                    </span>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                        {item.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      strokeWidth={2}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="mt-12 flex flex-col items-center gap-3 border-t border-border/50 pt-8 text-center text-[11px] text-muted sm:flex-row sm:justify-center sm:gap-6">
          <p>© {new Date().getFullYear()} {site.name} · {site.role}</p>
          <a href="#hero" className="inline-flex items-center gap-1 transition-colors hover:text-primary">
            Back to top
            <span aria-hidden>↑</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
