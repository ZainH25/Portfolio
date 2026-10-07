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
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
  id?: string;
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15 + 0.35,
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function AetherFlowHero({
  badge,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  className,
  id = "hero",
}: AetherFlowHeroProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-[1] flex h-[min(100dvh,900px)] w-full flex-col items-center justify-center overflow-hidden pt-16",
        className,
      )}
    >
      <AetherFlowBackdrop />

      <div
        data-aether-clear
        className="relative z-[1] isolate rounded-3xl px-6 py-4 text-center"
      >
        {badge && (
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/30 px-4 py-1.5 backdrop-blur-md"
          >
            <Smartphone className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/90">
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
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,10vw,5rem)] leading-[1.02] tracking-tight text-foreground"
        >
          {title}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
        >
          {description}
        </motion.p>

        {(primaryCta || secondaryCta) && (
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {primaryCta && (
              <motion.a
                href={primaryCta.href}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-background shadow-lg shadow-primary/20"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            )}
            {secondaryCta && (
              <motion.a
                href={secondaryCta.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border bg-background/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground backdrop-blur-md hover:border-primary/50"
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
