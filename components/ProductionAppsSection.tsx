"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "@/components/ProjectCard";
import { enterpriseProjects, type Project } from "@/lib/content";
import { AetherFlowBackdrop } from "@/components/ui/aether-flow-backdrop";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function tabLabel(project: Project) {
  if (project.id === "servicewrk-tech") return "Technician";
  if (project.id === "servicewrk-agent") return "Agent";
  return project.title;
}

export function ProductionAppsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const slides = gsap.utils.toArray<HTMLElement>("[data-enterprise-slide]");
    const count = slides.length;
    if (count === 0) return;

    const slideSpan = () => window.innerHeight * 1.22;

    slides.forEach((slide, i) => {
      gsap.set(slide, {
        autoAlpha: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 36,
        scale: i === 0 ? 1 : 0.97,
        filter: i === 0 ? "blur(0px)" : "blur(10px)",
        zIndex: i + 1,
        pointerEvents: i === 0 ? "auto" : "none",
      });
    });

    const tl = gsap.timeline({
      defaults: { ease: "none", duration: 1 },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () =>
          `+=${Math.max(1, count - 1) * slideSpan() + slideSpan() * 0.4}`,
        pin: true,
        scrub: 0.65,
        invalidateOnRefresh: true,
        snap:
          count > 1
            ? {
                snapTo: 1 / (count - 1),
                duration: { min: 0.15, max: 0.5 },
                delay: 0.02,
                ease: "power2.inOut",
              }
            : undefined,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
          const idx = Math.min(
            count - 1,
            Math.max(0, Math.round(self.progress * (count - 1))),
          );
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
            slides.forEach((slide, i) => {
              slide.style.pointerEvents = i === idx ? "auto" : "none";
            });
          }
        },
      },
    });

    for (let i = 0; i < count - 1; i++) {
      tl.to(
        slides[i],
        {
          autoAlpha: 0,
          y: -28,
          scale: 0.98,
          filter: "blur(12px)",
          duration: 0.45,
        },
        i,
      ).fromTo(
        slides[i + 1],
        { autoAlpha: 0, y: 40, scale: 0.97, filter: "blur(12px)" },
        { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.55 },
        i + 0.12,
      );
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    const t = window.setTimeout(refresh, 400);
    const t2 = window.setTimeout(refresh, 1200);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.getAll().find((t) => t.trigger === section);
    if (!st) return;

    const count = enterpriseProjects.length;
    const progress = count <= 1 ? 0 : index / (count - 1);
    const y = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      id="projects-production"
      ref={sectionRef}
      data-aether-scatter
      className="relative z-[1] overflow-hidden border-y border-border/50"
    >
      <AetherFlowBackdrop />

      <div className="relative z-[1] flex min-h-[100dvh] items-center justify-center px-5 py-10 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div
          className="flex w-full max-w-[70rem] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:max-w-[74rem] xl:gap-16"
        >
        <header className="flex w-full max-w-[22rem] shrink-0 flex-col justify-center lg:max-w-[20rem] xl:max-w-[22rem]">
          <div
            data-aether-clear
            className="relative isolate rounded-3xl px-1 py-4 lg:px-2 lg:py-2"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Production apps
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-foreground md:text-3xl">
              Enterprise apps
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Three production Flutter apps — scroll or pick a tab to explore each one.
            </p>
          </div>

          <div
            className="mt-8 hidden h-0.5 w-full overflow-hidden rounded-full bg-border/60 lg:block"
            aria-hidden
          >
            <div
              ref={progressRef}
              className="h-full w-full origin-left rounded-full bg-primary"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <nav
            data-aether-ignore
            className="mt-6 flex flex-col gap-2"
            aria-label="Production app slides"
          >
            {enterpriseProjects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-[var(--radius-card)] border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 md:py-4",
                    isActive
                      ? "border-primary/60 bg-primary/10 shadow-md shadow-primary/10"
                      : "border-border/60 bg-background/40 hover:border-primary/35 hover:bg-background/70",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] font-mono text-sm font-semibold tabular-nums transition-colors",
                      isActive
                        ? "bg-primary text-background"
                        : "bg-surface text-muted group-hover:text-foreground",
                    )}
                  >
                    {project.index}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-semibold tracking-tight transition-colors",
                        isActive ? "text-foreground" : "text-foreground/75",
                      )}
                    >
                      {tabLabel(project)}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted">
                      {project.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <nav
            data-aether-ignore
            className="mt-5 flex flex-wrap justify-center gap-2 lg:hidden"
            aria-label="Production app slides mobile"
          >
            {enterpriseProjects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`m-${project.id}`}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  className={cn(
                    "rounded-[var(--radius-pill)] border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300",
                    isActive
                      ? "border-primary bg-primary text-background shadow-md shadow-primary/25"
                      : "border-border bg-background/50 text-muted",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {project.index} · {tabLabel(project)}
                </button>
              );
            })}
          </nav>
        </header>

        <div
          ref={stageRef}
          data-aether-ignore
          className="relative flex w-full max-w-[34rem] shrink-0 items-center justify-center"
        >
          <div className="relative h-[min(72dvh,42rem)] w-full">
            {enterpriseProjects.map((project, index) => (
              <div
                key={project.id}
                data-enterprise-slide
                className="absolute inset-0 flex items-center justify-center will-change-[transform,opacity,filter]"
              >
                <ProjectCard
                  project={project}
                  variant="rail"
                  active={index === activeIndex}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
