export type TextZoneRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  /** Extra repulsion padding multiplier for this zone */
  padScale?: number;
};

/**
 * Headings, cards, orbit stage, and explicit safe zones — not every paragraph.
 */
export const PARTICLE_TEXT_ZONE_SELECTOR = [
  "[data-aether-clear]",
  "[data-aether-avoid]",
  "h1",
  "h2",
  "h3",
  "header a",
  "header button",
].join(",");

let cachedNodes: Element[] = [];

export function refreshParticleTextZoneNodes(root: ParentNode = document) {
  cachedNodes = Array.from(root.querySelectorAll(PARTICLE_TEXT_ZONE_SELECTOR));
}

export function collectVisibleTextZones(viewportPad = 80): TextZoneRect[] {
  const zones: TextZoneRect[] = [];
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  for (const el of cachedNodes) {
    if (!(el instanceof HTMLElement)) continue;
    if (el.closest("[data-aether-ignore]")) continue;
    if (
      (el.matches("h1") || el.matches("h2") || el.matches("h3")) &&
      el.closest("[data-aether-clear]")
    ) {
      continue;
    }
    if (el.getAttribute("aria-hidden") === "true") continue;

    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (parseFloat(style.opacity) < 0.05) continue;

    const r = el.getBoundingClientRect();
    if (r.width < 20 || r.height < 10) continue;
    if (r.bottom < -viewportPad || r.top > vh + viewportPad) continue;
    if (r.right < -viewportPad || r.left > vw + viewportPad) continue;

    const padScale = el.hasAttribute("data-aether-avoid") ? 1.22 : 1;
    zones.push({
      left: r.left,
      top: r.top,
      right: r.right,
      bottom: r.bottom,
      padScale,
    });
  }

  return zones;
}
