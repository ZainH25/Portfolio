"use client";

import { useEffect, useRef } from "react";
import { attachParticleField } from "@/lib/particle-field";
import {
  collectVisibleTextZones,
  refreshParticleTextZoneNodes,
} from "@/lib/particle-text-zones";
import { isCoarsePointer } from "@/lib/coarse-pointer";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/** Aether mesh — fixed behind page content (sibling layers use z-10+). */
export function GlobalParticleField({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const redistributeRef = useRef<((ratio?: number) => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    refreshParticleTextZoneNodes();

    const observer = new MutationObserver(() => {
      refreshParticleTextZoneNodes();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onResize = () => refreshParticleTextZoneNodes();
    window.addEventListener("resize", onResize, { passive: true });

    const destroyParticles = attachParticleField(canvas, {
      maxParticles: 170,
      densityDivisor: 5000,
      mouseRadius: 200,
      paintBackground: false,
      particleColor: "rgba(45, 140, 255, 0.7)",
      particleSizeMin: 0.9,
      particleSizeMax: 2.2,
      connectAreaDivisor: 6,
      lineWidth: 0.78,
      lineAlphaBoost: 0.34,
      lineAlphaBoostNearMouse: 0.48,
      connectionDistanceFalloff: 24000,
      getTextZones: () => collectVisibleTextZones(),
      textRepelPadding: 54,
      textRepelStrength: 2.4,
      textEdgeRepelStrength: 0.9,
      mouseRepelStrength: 1.8,
      maxParticleSpeed: 0.3,
      onReady: ({ redistribute }) => {
        redistributeRef.current = redistribute;
      },
    });

    const coarse = isCoarsePointer();
    let scrollTick = 0;
    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < 8) return;

      scrollTick += 1;
      const stride = coarse ? 14 : 4;
      if (scrollTick % stride !== 0) return;

      refreshParticleTextZoneNodes();
      const scatter = document.querySelector<HTMLElement>("[data-aether-scatter]");
      if (!scatter) return;
      const r = scatter.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh * 0.92 && r.bottom > vh * 0.08) {
        redistributeRef.current?.(coarse ? 0.08 : 0.22);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("portfolio-scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("portfolio-scroll", onScroll);
      destroyParticles();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-0 h-full w-full",
        className,
      )}
      aria-hidden
    />
  );
}
