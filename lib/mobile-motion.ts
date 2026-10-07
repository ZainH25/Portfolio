/** Scroll-reveal: same behavior as desktop, tuned for touch viewports. */
export function scrollRevealMotion(coarse: boolean) {
  return {
    y: coarse ? 0 : 40,
    blur: coarse ? "blur(0px)" : "blur(6px)",
    duration: coarse ? 0.8 : 1.05,
    stagger: coarse ? 0.09 : 0.1,
    toggleActions: "play none none reverse" as const,
    scale: coarse ? 1 : 0.98,
  };
}

/** Pinned story / chapter scroll (GSAP scrub). */
export function storyScrollMotion(coarse: boolean) {
  return {
    scrub: coarse ? 0.85 : 1.2,
    yIn: coarse ? 0 : 52,
    yOut: coarse ? 0 : -56,
    blurIn: coarse ? "blur(0px)" : "blur(14px)",
    blurOut: coarse ? "blur(0px)" : "blur(20px)",
    scaleIn: coarse ? 1 : 0.97,
    scaleOut: coarse ? 1 : 0.96,
    slotStart: coarse ? "top 82%" : "top 78%",
    slotEndDefault: coarse ? "bottom 18%" : "bottom 22%",
    slotEndLast: coarse ? "bottom 6%" : "bottom 22%",
    slotEndSecondLast: coarse ? "bottom 12%" : "bottom 22%",
    holdIn: coarse ? 0.24 : 0.28,
    holdMid: coarse ? 0.52 : 0.34,
    holdOut: coarse ? 0.28 : 0.44,
    pinDuration: coarse ? 0.36 : 0.72,
    headlineFadeDuration: coarse ? 0.3 : 0.45,
    headlineBlur: coarse ? "blur(0px)" : "blur(6px)",
    headlineY: coarse ? 0 : -24,
  };
}

/** Enterprise pinned crossfade on touch — shorter travel than desktop. */
export function enterpriseScrollMotion(coarse: boolean) {
  return {
    slideSpan: coarse ? 0.88 : 1.22,
    scrub: coarse ? 0.72 : 0.65,
    snap: !coarse,
    yIn: coarse ? 28 : 40,
    yOut: coarse ? -22 : -28,
    blur: coarse ? "blur(8px)" : "blur(12px)",
  };
}
