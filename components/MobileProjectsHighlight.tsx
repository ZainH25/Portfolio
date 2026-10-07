"use client";

import Image from "next/image";
import {
  atGlance,
  enterpriseProjects,
  independentProjects,
  projects,
  skillCategories,
} from "@/lib/content";
import { getProjectImageSrc } from "@/lib/project-images";

const toolCount = skillCategories.reduce((c, cat) => c + cat.items.length, 0);

export function MobileProjectsHighlight() {
  const stats = [
    { value: atGlance.stats[0].value, label: atGlance.stats[0].label },
    { value: `${projects.length}+`, label: "Apps & projects" },
    { value: `${toolCount}+`, label: atGlance.stats[2].label },
  ];

  return (
    <div className="font-[family-name:var(--font-mono)] text-foreground" data-aether-avoid>
      <div className="grid grid-cols-3 gap-2 border-y border-border/50 py-5">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl text-primary">{s.value}</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <h3 className="mt-5 text-center font-[family-name:var(--font-display)] text-xl leading-snug">
        Mobile work across{" "}
        <span className="text-primary">production & experiments</span>
      </h3>
      <p className="mt-2 text-center text-[11px] font-medium uppercase tracking-widest text-muted">
        Swipe to browse apps →
      </p>

      <div
        className="scrollbar-hide -mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 pt-1"
        aria-label="All projects"
      >
        {projects.map((project) => {
          const src = getProjectImageSrc(project.id);
          const href =
            project.category === "enterprise" ? "#projects-production" : "#projects-personal";
          return (
            <a
              key={project.id}
              href={href}
              className="flex min-w-[min(84vw,18rem)] shrink-0 snap-center flex-col rounded-[var(--radius-card)] border border-border/60 bg-background/50 p-4 shadow-lg shadow-black/20"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-surface/60">
                  {src ? (
                    <Image src={src} alt="" fill className="object-contain p-1.5" sizes="64px" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-xl">📱</span>
                  )}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {project.category === "enterprise" ? "Production" : "Independent"} ·{" "}
                    {project.index}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-base leading-snug text-foreground">
                    {project.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-left text-xs leading-relaxed text-muted">
                {project.summary}
              </p>
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-primary">
                View details →
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <a
          href="#projects-production"
          className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
        >
          {enterpriseProjects.length} production apps
        </a>
        <a
          href="#projects-personal"
          className="rounded-full border border-border/70 bg-background/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted"
        >
          {independentProjects.length} personal builds
        </a>
      </div>
    </div>
  );
}
