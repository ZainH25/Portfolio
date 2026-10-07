"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "@/components/ProjectCard";
import { enterpriseProjects, type Project } from "@/lib/content";
import { AetherFlowBackdrop } from "@/components/ui/aether-flow-backdrop";
import { isCoarsePointer } from "@/lib/coarse-pointer";
import { enterpriseScrollMotion } from "@/lib/mobile-motion";
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
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (isCoarsePointer()) return;

    const motion = enterpriseScrollMotion(false);

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const slides = gsap.utils.toArray<HTMLElement>("[data-enterprise-slide]");
    const count = slides.length;
    if (count === 0) return;

    const slideSpan = () => window.innerHeight * motion.slideSpan;

    slides.forEach((slide, i) => {
      gsap.set(slide, {
        autoAlpha: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : motion.yIn,
        scale: i === 0 ? 1 : 0.97,
        filter: i === 0 ? "blur(0px)" : motion.blur,
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
          `+=${Math.max(1, count - 1) * slideSpan() + slideSpan() * 0.35}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: motion.scrub,
        invalidateOnRefresh: true,
        snap:
          motion.snap && count > 1
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
          const steps = Math.max(1, count - 1);
          const idx = Math.min(
            count - 1,
            Math.max(0, Math.round(self.progress * steps)),
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
          y: motion.yOut,
          scale: 0.98,
          filter: motion.blur,
          duration: 0.45,
        },
        i,
      ).fromTo(
        slides[i + 1],
        {
          autoAlpha: 0,
          y: motion.yIn,
          scale: 0.97,
          filter: motion.blur,
        },
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

  useEffect(() => {
    const carousel = mobileCarouselRef.current;
    if (!carousel || !isCoarsePointer()) return;

    const syncFromScroll = () => {
      const children = Array.from(carousel.children) as HTMLElement[];
      if (!children.length) return;
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      if (best !== activeIndexRef.current) {
        activeIndexRef.current = best;
        setActiveIndex(best);
      }
      const steps = Math.max(1, enterpriseProjects.length - 1);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${best / steps})`;
      }
    };

    carousel.addEventListener("scroll", syncFromScroll, { passive: true });
    syncFromScroll();
    return () => carousel.removeEventListener("scroll", syncFromScroll);
  }, []);

  const selectSlide = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const scrollToSlide = (index: number) => {
    if (isCoarsePointer()) {
      const carousel = mobileCarouselRef.current;
      const child = carousel?.children[index] as HTMLElement | undefined;
      child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      selectSlide(index);
      const steps = Math.max(1, enterpriseProjects.length - 1);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${index / steps})`;
      }
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.getAll().find((t) => t.trigger === section);
    if (!st) {
      selectSlide(index);
      return;
    }

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
      className="relative z-[1] overflow-x-clip border-y border-border/50 max-lg:overflow-y-visible lg:min-h-[100dvh] lg:overflow-hidden"
    >
      <AetherFlowBackdrop />

      <div
        className="relative z-[1] flex min-h-0 items-start justify-center px-4 py-10 sm:px-8 sm:py-12 md:items-center md:px-10 lg:min-h-[100dvh] lg:py-10 lg:px-12 xl:px-16"
      >
        <div
          className="flex w-full max-w-[70rem] flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:max-w-[74rem] xl:gap-16"
        >
          <header className="flex w-full shrink-0 flex-col justify-center lg:max-w-[20rem] xl:max-w-[22rem]">
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
                <span className="lg:hidden">
                  Swipe the cards for full details, or tap a tab to jump.
                </span>
                <span className="hidden lg:inline">
                  Three production Flutter apps — scroll or pick a tab to explore each one.
                </span>
              </p>
            </div>

            <div
              className="mt-6 h-0.5 w-full overflow-hidden rounded-full bg-border/60 lg:mt-8"
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
              className="mt-6 hidden flex-col gap-2 lg:flex"
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

          </header>

          <div
            ref={stageRef}
            data-aether-ignore
            className="relative flex w-full max-w-[34rem] shrink-0 flex-col gap-4 lg:items-center lg:justify-center"
          >
            <nav
              data-aether-ignore
              className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 lg:hidden"
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
                      "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                      isActive
                        ? "border-primary bg-primary text-background shadow-md shadow-primary/20"
                        : "border-border/70 bg-background/60 text-foreground/80",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {tabLabel(project)}
                  </button>
                );
              })}
            </nav>

            <div
              ref={mobileCarouselRef}
              className="scrollbar-hide -mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:hidden"
              aria-label="Enterprise app details"
            >
              {enterpriseProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-[min(92vw,22rem)] shrink-0 snap-center"
                >
                  <ProjectCard
                    project={project}
                    variant="rail"
                    active={index === activeIndex}
                  />
                </div>
              ))}
            </div>
            <div className="relative hidden h-[min(72dvh,42rem)] w-full lg:block">
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
