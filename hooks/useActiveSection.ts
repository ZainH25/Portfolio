"use client";

import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/content";

const HEADER_OFFSET = 110;

/** Highlights nav in document order (About → Experience → …) based on scroll position. */
export function useActiveSection(links: NavLink[]) {
  const [activeHref, setActiveHref] = useState(links[0]?.href ?? "");

  useEffect(() => {
    const markers = links
      .map((link) => {
        const id = link.sectionIds[0];
        const el = id ? document.getElementById(id) : null;
        return el ? { href: link.href, el } : null;
      })
      .filter((m): m is { href: string; el: HTMLElement } => Boolean(m));

    if (markers.length === 0) return;

    const update = () => {
      let current = markers[0].href;

      for (const marker of markers) {
        const top = marker.el.getBoundingClientRect().top;
        if (top <= HEADER_OFFSET) {
          current = marker.href;
        }
      }

      setActiveHref(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    const raf = () => {
      update();
      frame = requestAnimationFrame(raf);
    };
    let frame = requestAnimationFrame(raf);

    const t = window.setTimeout(update, 600);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
      window.clearTimeout(t);
    };
  }, [links]);

  return activeHref;
}
