"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isCoarsePointer } from "@/lib/coarse-pointer";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const coarse = isCoarsePointer();

    if (coarse) {
      const onScroll = () => {
        ScrollTrigger.update();
        window.dispatchEvent(new CustomEvent("portfolio-scroll"));
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      let viewportTimer = 0;
      const onViewportResize = () => {
        window.clearTimeout(viewportTimer);
        viewportTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      };
      window.visualViewport?.addEventListener("resize", onViewportResize);

      ScrollTrigger.refresh();

      return () => {
        window.clearTimeout(viewportTimer);
        window.removeEventListener("scroll", onScroll);
        window.visualViewport?.removeEventListener("resize", onViewportResize);
      };
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      overscroll: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      window.dispatchEvent(new CustomEvent("portfolio-scroll"));
    });

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    let viewportTimer = 0;
    const onViewportResize = () => {
      window.clearTimeout(viewportTimer);
      viewportTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 200);
    };
    window.visualViewport?.addEventListener("resize", onViewportResize);

    ScrollTrigger.refresh();

    return () => {
      window.clearTimeout(viewportTimer);
      window.visualViewport?.removeEventListener("resize", onViewportResize);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
