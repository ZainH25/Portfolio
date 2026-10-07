"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone } from "lucide-react";
import { AetherFlowBackdrop } from "@/components/ui/aether-flow-backdrop";
import { cn } from "@/lib/utils";

export type AetherFlowHeroProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  /** Shorter line under the title on small screens */
  descriptionMobile?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
  id?: string;
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08 + 0.2,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function AetherFlowHero({
  badge,
  title,
  subtitle,
  description,
  descriptionMobile,
  primaryCta,
  secondaryCta,
  className,
  id = "hero",
}: AetherFlowHeroProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-[1] flex min-h-[min(100dvh,900px)] w-full flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-[max(4.25rem,calc(env(safe-area-inset-top)+3rem))] sm:px-6 md:pb-0 md:pt-16",
        className,
      )}
    >
      <AetherFlowBackdrop />

      <div
        data-aether-clear
        className="relative z-[1] isolate flex w-full max-w-3xl flex-col items-center rounded-3xl px-2 py-2 text-center sm:px-6 sm:py-4"
      >
        {badge && (
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/25 bg-background/30 px-3 py-1 backdrop-blur-md sm:mb-6 sm:gap-2 sm:px-4 sm:py-1.5"
          >
            <Smartphone className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
            <span className="text-[10px] font-semibold uppercase leading-snug tracking-wide text-foreground/90 sm:text-xs sm:tracking-widest">
              {badge}
            </span>
          </motion.div>
        )}

        {subtitle && (
          <motion.p
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:mb-3 sm:text-xs sm:tracking-[0.25em]"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,8.5vw,5rem)] leading-[1.08] tracking-tight text-foreground"
        >
          {title}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-4 max-w-[19rem] text-xs leading-relaxed text-muted sm:mt-6 sm:max-w-2xl sm:text-sm md:text-base"
        >
          <span className="md:hidden">{descriptionMobile ?? description}</span>
          <span className="hidden md:inline">{description}</span>
        </motion.p>

        {(primaryCta || secondaryCta) && (
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 flex w-full max-w-[16.75rem] flex-col gap-2.5 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3"
          >
            {primaryCta && (
              <motion.a
                href={primaryCta.href}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-primary px-5 text-[11px] font-semibold uppercase tracking-widest text-background shadow-lg shadow-primary/20 sm:w-auto sm:min-w-[11.5rem] sm:px-8 sm:text-xs"
              >
                {primaryCta.label}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.a>
            )}
            {secondaryCta && (
              <motion.a
                href={secondaryCta.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] border border-border bg-background/40 px-5 text-[11px] font-semibold uppercase tracking-widest text-foreground backdrop-blur-md hover:border-primary/50 sm:w-auto sm:min-w-[11.5rem] sm:px-8 sm:text-xs"
              >
                {secondaryCta.label}
              </motion.a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export { AetherFlowHero as Component };
