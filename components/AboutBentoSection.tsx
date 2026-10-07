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
import { cn } from "@/lib/utils";

const toolCount = skillCategories.reduce((n, c) => n + c.items.length, 0);

export function AboutBentoSection() {
  return (
    <section id="about" className="relative z-[1] px-4 py-10 sm:px-6 sm:py-12 md:py-24">
      <div className="section-shell mx-auto w-full max-w-4xl text-center">
        <div data-aether-avoid data-fade-up className="mx-auto max-w-2xl px-0.5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight text-foreground md:text-3xl">
            {site.role} at {site.employer}
          </h2>
          <p className="mt-2 text-sm text-muted">{site.subtitle}</p>
          <div className="mt-5 space-y-3 text-left text-sm leading-relaxed text-muted sm:text-center md:text-base">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>

        <div data-fade-up className="mt-10 px-0.5 md:mt-12">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-foreground md:text-2xl">
            {atGlance.title}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
            {atGlance.subtitle}
          </p>
        </div>

        <div
          className="mt-6 flex w-full max-w-xl flex-col gap-3 sm:max-w-none sm:gap-4 md:mx-auto md:mt-8 md:grid md:max-w-4xl md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-4"
          data-stagger-group
        >
          <div data-stagger-item className="md:col-span-2 md:row-span-2">
          <BentoCard className="overflow-visible" glow>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Timeline
            </p>
            <CareerRouteChart />
            <div
              className={cn(
                "mt-5 grid gap-3 border-t border-border/60 pt-4",
                "grid-cols-1 sm:grid-cols-3 sm:gap-2 sm:text-center",
              )}
            >
              {atGlance.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/40 bg-background/25 px-3 py-2.5 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
                >
                  <p className="font-[family-name:var(--font-display)] text-xl text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase leading-snug tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </BentoCard>
          </div>

          <div
            data-stagger-item
            className="mx-auto w-full max-w-[11.5rem] sm:max-w-[13rem] md:col-span-1 md:max-w-none"
          >
            <div
              data-aether-avoid
              className="overflow-hidden rounded-xl border border-border/70"
            >
              <MediaPlaceholder
                src={site.portraitUrl}
                alt={`${site.name} portrait`}
                label="Portrait"
                aspect="portrait"
                fit="cover"
                priority
                sizes="(max-width: 768px) 11rem, 13rem"
                className="w-full !aspect-[4/5] !rounded-none border-0"
              />
            </div>
          </div>

          <BentoCard className="text-left md:col-span-1 md:text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Today
            </p>
            <p className="mt-1 text-xs font-medium text-primary">{site.employer}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{atGlance.currentRole}</p>
            <p className="mt-3 text-xs text-muted">{atGlance.focus}</p>
          </BentoCard>

          <BentoCard className="text-left md:col-span-2 md:text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Strengths
            </p>
            <ul className="mt-4 space-y-4">
              {focusAreas.map((area) => (
                <li
                  key={area.title}
                  className="flex flex-col gap-2 border-b border-border/50 pb-4 last:border-0 last:pb-0 sm:items-center sm:text-center"
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

          <BentoCard className="text-left md:col-span-1 md:text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Stack preview · {toolCount}
            </p>
            <div className="mt-3 flex flex-wrap justify-start gap-1.5 md:justify-center">
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
