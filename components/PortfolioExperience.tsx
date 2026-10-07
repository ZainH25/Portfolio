"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "@/components/ProjectCard";
import { AboutBentoSection } from "@/components/AboutBentoSection";
import { ContactPanel } from "@/components/ContactPanel";
import { ProductionAppsSection } from "@/components/ProductionAppsSection";
import { ProjectsOrbitShowcase } from "@/components/ProjectsOrbitShowcase";
import { SiteIntroHero } from "@/components/SiteIntroHero";
import { BentoCard } from "@/components/ui/bento-card";
import {
  certifications,
  education,
  experience,
  independentProjects,
  skillCategories,
  storyBeats,
  storyPinHeadline,
} from "@/lib/content";
import { isCoarsePointer } from "@/lib/coarse-pointer";
import { scrollRevealMotion, storyScrollMotion } from "@/lib/mobile-motion";
import { bindPortfolioScrollReveals } from "@/lib/scroll-reveal-gsap";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const pinTitleRef = useRef<HTMLHeadingElement>(null);
  const storySectionRef = useRef<HTMLElement>(null);
  const beatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const coarse = isCoarsePointer();
      const reveal = scrollRevealMotion(coarse);
      const refresh = () => ScrollTrigger.refresh();

      if (bgRef.current && storySectionRef.current) {
        gsap.fromTo(
          bgRef.current,
          { opacity: 0 },
          {
            opacity: 0.35,
            scrollTrigger: {
              trigger: storySectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: 1.2,
            },
          },
        );
        gsap.to(bgRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: "bottom center",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (pinWrapRef.current && storySectionRef.current) {
        const story = storyScrollMotion(coarse);

        ScrollTrigger.create({
          trigger: storySectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * story.pinDuration}`,
          pin: pinWrapRef.current,
          pinSpacing: false,
        });

        gsap.to(pinWrapRef.current, {
          autoAlpha: 0,
          y: story.headlineY,
          filter: story.headlineBlur,
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * story.headlineFadeDuration}`,
            scrub: coarse ? 0.75 : 1,
          },
        });

        if (pinTitleRef.current) {
          gsap.fromTo(
            pinTitleRef.current,
            { opacity: 0.45, y: coarse ? 0 : 30, scale: coarse ? 1 : 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              scrollTrigger: {
                trigger: storySectionRef.current,
                start: "top 85%",
                end: "top 50%",
                scrub: coarse ? 1 : 1.4,
              },
            },
          );
        }

        const slots = gsap.utils.toArray<HTMLElement>("[data-story-beat-slot]");

        slots.forEach((slot, i) => {
          const beat = slot.querySelector<HTMLElement>("[data-story-beat]");
          if (!beat) return;

          const isLast = i === slots.length - 1;
          const isSecondLast = i === slots.length - 2;
          const slotEnd = isLast
            ? story.slotEndLast
            : isSecondLast
              ? story.slotEndSecondLast
              : story.slotEndDefault;

          gsap.set(beat, {
            transformOrigin: "center center",
            zIndex: i + 1,
            autoAlpha: 0,
            visibility: "hidden",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: slot,
              start: story.slotStart,
              end: slotEnd,
              scrub: story.scrub,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            beat,
            {
              autoAlpha: 0,
              y: story.yIn,
              scale: story.scaleIn,
              filter: story.blurIn,
              visibility: "hidden",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              visibility: "visible",
              duration: 0.22,
              ease: "none",
            },
            story.holdIn,
          )
            .to(beat, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              visibility: "visible",
              duration: story.holdMid,
              ease: "none",
            });

          if (coarse && isLast) {
            return;
          }

          tl.to(beat, {
            autoAlpha: 0,
            y: story.yOut,
            scale: story.scaleOut,
            filter: story.blurOut,
            visibility: "hidden",
            duration: story.holdOut,
            ease: "none",
          });
        });
      }

      bindPortfolioScrollReveals(coarse, reveal);

      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 600);
      const t2 = window.setTimeout(refresh, 1500);

      return () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div className="relative z-[1]">
      <SiteIntroHero />

      <AboutBentoSection />

      <section id="experience" className="border-t border-border/50 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="section-shell">
          <div data-fade-up>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Experience
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-foreground sm:text-2xl md:text-3xl">
              Professional history
            </h2>
          </div>
          <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5" data-stagger-group>
            {experience.map((job) => (
              <article
                key={job.company}
                data-aether-avoid
                data-stagger-item
                className="section-card mx-auto max-w-[40rem] text-left"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg text-foreground md:text-xl">
                  {job.role}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  {job.period}
                </p>
                <p className="mt-2 text-sm text-primary">
                  {job.company} · {job.type} · {job.location}
                </p>
                {"techStack" in job && job.techStack ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-foreground/85">Tech stack: </span>
                    {job.techStack}
                  </p>
                ) : null}
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                  {job.highlights.map((item) => (
                    <li key={item} className="mx-auto max-w-md">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="border-t border-border/50 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="section-shell">
          <div data-fade-up className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Education
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl text-foreground sm:text-2xl md:text-3xl">
              Education & certifications
            </h2>
          </div>

          <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4" data-stagger-group>
            {education.map((entry) => (
              <article
                key={entry.period + entry.school}
                data-aether-avoid
                data-stagger-item
                className="section-card mx-auto w-full max-w-xl text-left"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted sm:text-xs">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg leading-snug text-foreground sm:text-xl">
                  {entry.school}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{entry.degree}</p>
                {entry.detail ? (
                  <p className="mt-2 text-sm text-muted">{entry.detail}</p>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-10 sm:mt-12">
            <p
              data-fade-up
              className="text-center text-xs font-semibold uppercase tracking-widest text-primary sm:text-left"
            >
              Certifications
            </p>
            <ul className="mx-auto mt-4 max-w-xl space-y-2 sm:mt-5" data-stagger-group>
              {certifications.map((cert) => (
                <li
                  key={cert}
                  data-stagger-item
                  className="section-card px-4 py-3 text-left text-xs leading-relaxed text-muted sm:text-sm"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="skills" className="border-t border-border/50 px-6 py-16 md:py-24">
        <div data-fade-up className="section-shell">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Stack
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] text-foreground">
            Tools & platforms
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
            Mobile, cloud, and data — what I use on production apps and experiments.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2" data-stagger-group>
            {skillCategories.map((cat) => (
              <div key={cat.title} data-stagger-item>
              <BentoCard className="h-full text-center">
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-sm font-semibold text-foreground">{cat.title}</h3>
                  <span className="text-[10px] font-semibold tabular-nums text-muted">
                    {String(cat.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                  {cat.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-border/80 bg-background/45 px-2.5 py-1 text-[11px] text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </BentoCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 border-t border-border/50">
      <section id="work" className="px-6 pt-16 md:pt-24">
        <div className="section-shell" data-fade-up>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Selected work
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-foreground md:text-3xl">
            Featured projects
          </h2>
        </div>
        <div className="section-shell mt-8">
          <ProjectsOrbitShowcase />
        </div>
      </section>

      <ProductionAppsSection />

      <section id="projects-personal" className="px-6 py-16 md:py-24">
        <div className="section-shell">
          <div data-fade-up className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Independent
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-foreground md:text-3xl">
              Personal builds
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-8" data-stagger-group>
            {independentProjects.map((project) => (
              <div key={project.id} className="flex" data-project-card>
                <ProjectCard project={project} variant="grid" />
              </div>
            ))}
          </div>
        </div>
      </section>
      </section>

      <section
        id="story"
        ref={storySectionRef}
        className="story-scroll-section relative border-t border-border/50"
        style={{ ["--story-chapters" as string]: storyBeats.length }}
        aria-label="Story"
      >
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-0 -z-10 bg-primary/10 transition-none"
          aria-hidden
        />
        <div
          ref={pinWrapRef}
          className="pointer-events-none z-0 flex h-[min(100dvh,100vh)] items-center px-4 text-center sm:px-6"
        >
          <h2
            ref={pinTitleRef}
            className="section-shell font-[family-name:var(--font-display)] text-[clamp(1.75rem,5.5vw,3.25rem)] leading-[1.1] text-foreground"
          >
            {storyPinHeadline.line1}
            <br />
            <span className="text-primary">{storyPinHeadline.accent}</span>
            <br />
            <span className="text-foreground/80">{storyPinHeadline.line2}</span>
          </h2>
        </div>
        <div
          ref={beatsRef}
          className="relative isolate z-10 mx-auto max-w-2xl px-5 pb-10 pt-4 text-center md:px-6 md:pb-8"
        >
          {storyBeats.map((beat, index) => (
            <div
              key={beat.id}
              data-story-beat-slot
              className={cn(
                "relative flex justify-center max-md:min-h-[88dvh] max-md:items-start max-md:py-6",
                "md:min-h-[100dvh] md:items-center md:py-0",
                index >= storyBeats.length - 2 && "md:min-h-[88dvh]",
              )}
            >
              <div
                className="w-full max-md:sticky max-md:top-[max(4.25rem,env(safe-area-inset-top))] max-md:translate-y-0 md:sticky md:top-[50vh] md:-translate-y-1/2"
              >
                <article
                  data-story-beat
                  style={{ zIndex: index + 1 }}
                  className="relative invisible section-card border-primary/25 bg-background/90 px-5 py-6 opacity-0 shadow-lg shadow-black/20 backdrop-blur-md will-change-[opacity] max-md:max-h-[calc(100dvh-5.5rem-env(safe-area-inset-top))] max-md:overflow-y-auto max-md:overscroll-contain sm:px-6 sm:py-7 md:max-h-none md:overflow-visible md:px-9 md:py-10 md:will-change-[transform,opacity,filter]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    {beat.label}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl leading-snug text-foreground md:text-[1.65rem]">
                    {beat.headline}
                  </h3>
                  <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/85 md:mt-5 md:text-base md:leading-8">
                    {beat.body}
                  </p>
                </article>
              </div>
            </div>
          ))}
          <div className="h-[20vh] shrink-0 md:h-[35vh]" aria-hidden />
        </div>
      </section>

      <ContactPanel />
      </div>
    </div>
  );
}
