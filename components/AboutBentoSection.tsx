"use client";

import { CareerRouteChart } from "@/components/CareerRouteChart";
import { BentoCard } from "@/components/ui/bento-card";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import {
  aboutParagraphs,
  atGlance,
  focusAreas,
  site,
  skillCategories,
} from "@/lib/content";

const toolCount = skillCategories.reduce((n, c) => n + c.items.length, 0);

export function AboutBentoSection() {
  return (
    <section id="about" className="relative z-[1] px-6 py-16 md:py-24">
      <div className="section-shell">
        <div data-aether-avoid data-fade-up className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight text-foreground md:text-3xl">
            {site.role} at {site.employer}
          </h2>
          <p className="mt-2 text-sm text-muted">{site.subtitle}</p>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted md:text-base">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>

        <div data-fade-up className="mt-12">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-foreground md:text-2xl">
            {atGlance.title}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted">{atGlance.subtitle}</p>
        </div>

        <div
          className="mt-8 grid gap-3 md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-4"
          data-stagger-group
        >
          <BentoCard className="md:col-span-2 md:row-span-2" glow>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Timeline
            </p>
            <CareerRouteChart />
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 text-center">
              {atGlance.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-[family-name:var(--font-display)] text-lg text-primary md:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </BentoCard>

          <div data-stagger-item className="mx-auto w-full max-w-[200px] md:col-span-1 md:max-w-none">
            <div data-aether-avoid className="overflow-hidden rounded-xl border border-border/70">
              <MediaPlaceholder
                label="Your portrait"
                aspect="portrait"
                className="w-full !aspect-[4/5] !rounded-none border-0"
              />
            </div>
          </div>

          <BentoCard className="md:col-span-1 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Today
            </p>
            <p className="mt-1 text-xs font-medium text-primary">{site.employer}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{atGlance.currentRole}</p>
            <p className="mt-3 text-xs text-muted">{atGlance.focus}</p>
          </BentoCard>

          <BentoCard className="md:col-span-2 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Strengths
            </p>
            <ul className="mt-4 space-y-4">
              {focusAreas.map((area) => (
                <li
                  key={area.title}
                  className="flex flex-col items-center gap-2 border-b border-border/50 pb-4 last:border-0 last:pb-0"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary"
                    aria-hidden
                  >
                    ◆
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{area.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{area.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard className="md:col-span-1 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Stack preview · {toolCount}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {skillCategories
                .flatMap((c) => c.items)
                .slice(0, 18)
                .map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border/80 bg-background/50 px-2 py-0.5 text-[10px] text-muted"
                  >
                    {skill}
                  </span>
                ))}
              {toolCount > 18 ? (
                <span className="rounded-lg border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                  +{toolCount - 18} more
                </span>
              ) : null}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
