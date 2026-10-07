"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AetherFlowAmbientProps = {
  className?: string;
  /** Stronger glow + lines for pinned sections (e.g. enterprise apps). */
  intensity?: "default" | "strong";
};

/** Soft flowing glow behind sections — pairs with GlobalParticleField + data-aether-clear zones. */
export function AetherFlowAmbient({ className, intensity = "default" }: AetherFlowAmbientProps) {
  const gradientId = useId().replace(/:/g, "");
  const strong = intensity === "strong";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "absolute inset-0",
          strong
            ? "bg-[radial-gradient(ellipse_80%_58%_at_50%_44%,rgba(45,140,255,0.28),transparent_68%)]"
            : "bg-[radial-gradient(ellipse_75%_55%_at_50%_42%,rgba(45,140,255,0.16),transparent_70%)]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,140,255,0.12),transparent_45%)]",
          strong ? "opacity-65" : "opacity-40",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_72%_78%,rgba(45,140,255,0.1),transparent_42%)]",
          strong ? "opacity-55" : "opacity-35",
        )}
      />

      <motion.div
        className={cn(
          "absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]",
          strong
            ? "h-[min(92vw,40rem)] w-[min(100vw,54rem)] bg-primary/[0.16]"
            : "h-[min(85vw,36rem)] w-[min(95vw,48rem)] bg-primary/[0.09]",
        )}
        animate={{
          scale: [1, 1.06, 1],
          opacity: strong ? [0.55, 0.85, 0.55] : [0.45, 0.7, 0.45],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "absolute left-[18%] top-[28%] h-44 w-44 rounded-full blur-[72px] md:h-52 md:w-52",
          strong ? "bg-primary/[0.12]" : "bg-primary/[0.07]",
        )}
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "absolute right-[14%] bottom-[22%] h-48 w-48 rounded-full blur-[80px] md:h-56 md:w-56",
          strong ? "bg-primary/[0.1]" : "bg-primary/[0.06]",
        )}
        animate={{ x: [0, -24, 0], y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      <svg
        className={cn(
          "absolute inset-0 h-full w-full",
          strong ? "opacity-[0.28]" : "opacity-[0.14]",
        )}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(45,140,255,0)" />
            <stop offset="45%" stopColor="rgba(45,140,255,0.55)" />
            <stop offset="100%" stopColor="rgba(45,140,255,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-40 420 C 200 320, 400 520, 600 400 S 1000 280, 1240 380"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.2"
          initial={{ pathLength: 0.3, opacity: 0.4 }}
          animate={{
            pathLength: [0.25, 0.85, 0.25],
            opacity: strong ? [0.35, 0.75, 0.35] : [0.25, 0.55, 0.25],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M-20 520 C 280 440, 480 600, 720 480 S 1080 360, 1220 460"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.9"
          initial={{ pathLength: 0.2, opacity: 0.3 }}
          animate={{
            pathLength: [0.15, 0.75, 0.15],
            opacity: strong ? [0.28, 0.62, 0.28] : [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}
