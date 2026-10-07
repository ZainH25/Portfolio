import gsap from "gsap";
import { scrollRevealMotion } from "@/lib/mobile-motion";

type Reveal = ReturnType<typeof scrollRevealMotion>;

/** Story-style scrub reveals on touch; toggle reveals on desktop. */
export function bindPortfolioScrollReveals(coarse: boolean, reveal: Reveal) {
  /** Shorter scrub = quicker settle; no Y travel on coarse (see mobile-motion). */
  const scrub = coarse ? 0.45 : 0.62;

  gsap.utils.toArray<HTMLElement>("[data-fade-up]").forEach((el, i) => {
    if (el.closest("#story")) return;

    if (coarse) {
      gsap.fromTo(
        el,
        { y: reveal.y, opacity: 0, filter: reveal.blur },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 94%",
            end: "top 78%",
            scrub,
            invalidateOnRefresh: true,
          },
        },
      );
      return;
    }

    gsap.from(el, {
      y: reveal.y,
      opacity: 0,
      filter: reveal.blur,
      duration: reveal.duration,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: reveal.toggleActions,
      },
      delay: (i % 4) * 0.06,
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-stagger-group]").forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
    if (!items.length) return;

    if (coarse) {
      gsap.fromTo(
        items,
        { y: reveal.y, opacity: 0, filter: reveal.blur },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: reveal.stagger,
          ease: "none",
          scrollTrigger: {
            trigger: group,
            start: "top 92%",
            end: "top 68%",
            scrub,
            invalidateOnRefresh: true,
          },
        },
      );
      return;
    }

    gsap.from(items, {
      y: reveal.y,
      opacity: 0,
      filter: "blur(4px)",
      duration: reveal.duration,
      stagger: reveal.stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
        toggleActions: reveal.toggleActions,
      },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((el, i) => {
    if (coarse) {
      gsap.fromTo(
        el,
        { y: reveal.y, opacity: 0, scale: reveal.scale, filter: reveal.blur },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 93%",
            end: "top 76%",
            scrub,
            invalidateOnRefresh: true,
          },
        },
      );
      return;
    }

    gsap.from(el, {
      y: reveal.y,
      opacity: 0,
      scale: reveal.scale,
      duration: reveal.duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: reveal.toggleActions,
      },
      delay: (i % 2) * 0.08,
    });
  });
}
