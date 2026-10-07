"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { ArrowUp, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrbitRing = "outer" | "inner";

interface OrbitBase {
  ring: OrbitRing;
  angle: number;
}

export interface OrbitAvatarItem extends OrbitBase {
  kind: "avatar";
  src: string;
  alt?: string;
  color: string;
  size?: number;
}

export interface OrbitPillItem extends OrbitBase {
  kind: "pill";
  icon: ReactNode;
  label: string;
}

export interface OrbitCardItem extends OrbitBase {
  kind: "card";
  emoji: string;
  badge?: string | number;
}

export interface OrbitStatusItem extends OrbitBase {
  kind: "status";
  label: string;
}

export interface OrbitCheckItem extends OrbitBase {
  kind: "check";
}

export type OrbitItem =
  | OrbitAvatarItem
  | OrbitPillItem
  | OrbitCardItem
  | OrbitStatusItem
  | OrbitCheckItem;

export interface OrbitStat {
  value: string;
  label: string;
}

export interface OrbitTag {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface OrbitScrollPaging {
  onStep: (direction: 1 | -1) => void;
  /** Shown while the pointer is over the orbit (e.g. "Set 2 of 5") */
  hint?: string;
}

export interface CommunityOrbitProps {
  items: OrbitItem[];
  stats: OrbitStat[];
  headline: ReactNode;
  tags?: OrbitTag[];
  minScale?: number;
  className?: string;
  /** Match site typography (DotGothic + JetBrains) and Nexura colors */
  variant?: "default" | "portfolio";
  /** Changes with each app set — drives enter/exit animation */
  orbitSetKey?: string | number;
  /** Wheel over the orbit steps through app sets instead of crowding the ring */
  scrollPaging?: OrbitScrollPaging;
  /** Visual scale boost for the stage (portfolio default ~1.1) */
  stageScaleBoost?: number;
}

const STAGE_W = 1200;
const STAGE_H = 490;
const CENTER = { x: 600, y: 620 };
const RADIUS: Record<OrbitRing, number> = { outer: 492, inner: 404 };

function formatOrbitPx(value: number) {
  return `${value.toFixed(2)}px`;
}

function positionOnRing(ring: OrbitRing, angle: number): CSSProperties {
  const rad = (angle * Math.PI) / 180;
  const r = RADIUS[ring];
  const left = CENTER.x + r * Math.cos(rad);
  const top = CENTER.y - r * Math.sin(rad);
  return {
    left: formatOrbitPx(left),
    top: formatOrbitPx(top),
  };
}

function arcPath(r: number) {
  const dy = CENTER.y - STAGE_H;
  const dx = Math.sqrt(r * r - dy * dy);
  return `M ${CENTER.x - dx} ${STAGE_H} A ${r} ${r} 0 0 1 ${CENTER.x + dx} ${STAGE_H}`;
}

function OrbitAvatar({ src, alt, color, size = 72 }: OrbitAvatarItem) {
  return (
    <div
      className="rounded-full border border-black/[0.07] bg-white p-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#161616]"
      style={{ width: size, height: size }}
    >
      <div
        className="h-full w-full overflow-hidden rounded-full"
        style={{ backgroundColor: color }}
      >
        <img
          src={src}
          alt={alt ?? ""}
          draggable={false}
          className="h-full w-full translate-y-[8%] scale-[1.08] select-none object-cover object-top"
        />
      </div>
    </div>
  );
}

function OrbitPill({ icon, label, portfolio }: OrbitPillItem & { portfolio?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-h-[27px] items-center gap-2 whitespace-nowrap rounded-full border py-[5px] px-2.5 text-[12.5px] font-medium shadow-[0_2px_6px_rgba(0,0,0,0.05)]",
        portfolio
          ? "border-primary/40 bg-background/95 text-foreground shadow-lg shadow-primary/15 backdrop-blur-sm"
          : "border-black/[0.08] bg-white text-[#6c6c78] dark:border-white/10 dark:bg-[#161616] dark:text-white/60",
      )}
    >
      <span className="flex shrink-0 items-center text-[13px] leading-none">{icon}</span>
      <span className="leading-none">{label}</span>
    </div>
  );
}

function OrbitCard({ emoji, badge, portfolio }: OrbitCardItem & { portfolio?: boolean }) {
  const badgeDelay = 0.55;
  return (
    <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-black/[0.08] bg-[#f7f7f8] text-[22px] leading-none shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-[#1c1c1c]">
      <span className="select-none">{emoji}</span>
      {badge !== undefined && (
        <span className="absolute -bottom-[5px] -right-2 flex h-[18px] min-w-[22px] items-center justify-center gap-0.5 rounded-[5px] border border-black/[0.08] bg-white px-1.5 text-[10px] font-medium tabular-nums leading-none text-[#7a7a7a] shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#222] dark:text-white/60">
          <ArrowUp size={9} strokeWidth={2.2} />
          {typeof badge === "number" ? (
            portfolio ? (
              badge
            ) : (
              <CountUp value={String(badge)} delay={badgeDelay} startWhenVisible />
            )
          ) : (
            badge
          )}
        </span>
      )}
    </div>
  );
}

function OrbitStatus({ label }: OrbitStatusItem) {
  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex max-w-[min(280px,70vw)] items-center gap-1.5 rounded-full border border-[#a3d5b3] bg-[#cbe8d3] py-1.5 pl-2.5 pr-3 text-[13px] font-medium text-[#2f5b3a] shadow-[0_2px_6px_rgba(0,0,0,0.05)] dark:border-[#2f5b3a] dark:bg-[#17301f] dark:text-[#a8e0b8]"
    >
      <CircleCheck
        size={15}
        strokeWidth={2.2}
        className="shrink-0 fill-[#2e7d3e] text-[#cbe8d3] dark:fill-[#3fa456] dark:text-[#17301f]"
      />
      <span className="truncate leading-tight">{label}</span>
    </motion.div>
  );
}

function OrbitCheck() {
  return (
    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#a9d8b8] bg-[#c3e5cd] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:border-[#2f5b3a] dark:bg-[#1c3a26]">
      <CircleCheck
        size={17}
        strokeWidth={2.4}
        className="fill-[#2e7d3e] text-[#c3e5cd] dark:fill-[#3fa456] dark:text-[#1c3a26]"
      />
    </div>
  );
}

function renderItem(item: OrbitItem, portfolio?: boolean) {
  switch (item.kind) {
    case "avatar":
      return <OrbitAvatar {...item} />;
    case "pill":
      return <OrbitPill {...item} portfolio={portfolio} />;
    case "card":
      return <OrbitCard {...item} portfolio={portfolio} />;
    case "status":
      return <OrbitStatus {...item} />;
    case "check":
      return <OrbitCheck />;
  }
}

function splitValue(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  const decimals = (raw.split(".")[1] ?? "").length;
  return { prefix: m[1], target: parseFloat(raw), decimals, suffix: m[3] };
}

function CountUp({
  value,
  delay,
  startWhenVisible = false,
}: {
  value: string;
  delay: number;
  startWhenVisible?: boolean;
}) {
  const parts = splitValue(value);
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const shouldRun = !startWhenVisible || inView;

  useEffect(() => {
    if (!parts || !shouldRun) return;
    setN(0);
    const controls = animate(0, parts.target, {
      delay,
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animate when `value` changes
  }, [value, delay, shouldRun]);

  if (!parts) return <>{value}</>;
  return (
    <span ref={ref} className="inline-block tabular-nums">
      {parts.prefix}
      {n.toFixed(parts.decimals)}
      {parts.suffix}
    </span>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function CommunityOrbit({
  items,
  stats,
  headline,
  tags = [],
  minScale = 0.6,
  className,
  variant = "default",
  orbitSetKey = 0,
  scrollPaging,
  stageScaleBoost,
}: CommunityOrbitProps) {
  const isPortfolio = variant === "portfolio";
  const visualBoost = isPortfolio ? (stageScaleBoost ?? 1.1) : 1;
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [orbitMounted, setOrbitMounted] = useState(() => variant === "portfolio");
  const [orbitHovered, setOrbitHovered] = useState(false);
  const [orbitDrift, setOrbitDrift] = useState(() => (variant === "portfolio" ? 12 : 0));
  const wheelAccumRef = useRef(0);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () =>
      setScale(
        Math.min(
          visualBoost,
          Math.max(minScale, (frame.clientWidth / STAGE_W) * visualBoost),
        ),
      );
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [minScale, visualBoost]);

  useLayoutEffect(() => {
    if (!isPortfolio) return;
    let raf = 0;
    const start = performance.now();
    const startOffset = 12;
    const tick = (now: number) => {
      setOrbitDrift(startOffset + ((now - start) / 1000) * 7);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPortfolio]);

  useLayoutEffect(() => {
    setOrbitMounted(true);
  }, []);

  useEffect(() => {
    if (!scrollPaging) return;
    const el = frameRef.current;
    if (!el) return;

    let cooldown = false;
    const threshold = 72;

    const onWheel = (e: WheelEvent) => {
      wheelAccumRef.current += e.deltaY;
      if (cooldown) return;
      if (Math.abs(wheelAccumRef.current) < threshold) return;

      const direction = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;
      cooldown = true;
      scrollPaging.onStep(direction);
      window.setTimeout(() => {
        cooldown = false;
      }, 380);
      e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scrollPaging]);

  const stageScale = scale;

  return (
    <section
      className={cn(
        "w-full px-4 pb-14",
        isPortfolio
          ? "bg-transparent font-[family-name:var(--font-mono)] text-foreground"
          : "bg-white text-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-white",
        className,
      )}
    >
      <div
        ref={frameRef}
        data-aether-avoid
        className={cn(
          "relative mx-auto w-full max-w-[1200px] overflow-hidden transition-[box-shadow]",
          scrollPaging && orbitHovered && "cursor-ns-resize",
        )}
        style={{ height: STAGE_H * stageScale }}
        onMouseEnter={() => setOrbitHovered(true)}
        onMouseLeave={() => {
          setOrbitHovered(false);
          wheelAccumRef.current = 0;
        }}
        suppressHydrationWarning
      >
        <div
          className="absolute left-1/2 top-0"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `translateX(-50%) scale(${stageScale})`,
            transformOrigin: "top center",
          }}
          suppressHydrationWarning
        >
          <svg
            className="pointer-events-none absolute inset-0"
            width={STAGE_W}
            height={STAGE_H}
            viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            fill="none"
            style={{
              maskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
            }}
          >
            <motion.path
              d={arcPath(RADIUS.outer)}
              className="stroke-[#e4e4e4] dark:stroke-white/10"
              strokeWidth={2}
              initial={orbitMounted && !isPortfolio ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: isPortfolio ? 0.2 : 1.4, ease: "easeOut" }}
            />
            <motion.path
              d={arcPath(RADIUS.inner)}
              className="stroke-[#dcdcdc] dark:stroke-white/[0.13]"
              strokeWidth={3}
              initial={orbitMounted && !isPortfolio ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: isPortfolio ? 0.2 : 1.4, ease: "easeOut", delay: isPortfolio ? 0 : 0.1 }}
            />
          </svg>

          {scrollPaging && orbitHovered ? (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted backdrop-blur-sm"
            >
              Scroll to browse apps
              {scrollPaging.hint ? ` · ${scrollPaging.hint}` : null}
            </motion.p>
          ) : null}

          <div
            className="absolute inset-0 z-[2]"
            style={{
              transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
              transform: isPortfolio ? `rotate(${orbitDrift}deg)` : undefined,
            }}
          >
            {isPortfolio
              ? items.map((item, i) => {
                  const pos = positionOnRing(item.ring, item.angle);
                  const itemKey =
                    item.kind === "pill" || item.kind === "status"
                      ? `${item.kind}-${item.angle}-${item.label}`
                      : `${item.kind}-${item.angle}-${i}`;
                  return (
                    <div
                      key={itemKey}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={pos}
                    >
                      {renderItem(item, true)}
                    </div>
                  );
                })
              : null}
            {!isPortfolio ? (
              <AnimatePresence mode="popLayout">
                {orbitMounted
                  ? items.map((item, i) => {
                      const pos = positionOnRing(item.ring, item.angle);
                      const itemKey =
                        item.kind === "pill" || item.kind === "status"
                          ? `${item.kind}-${item.angle}-${item.label}`
                          : `${item.kind}-${item.angle}-${i}`;
                      return (
                        <motion.div
                          key={`${orbitSetKey}-${itemKey}`}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={pos}
                          initial={{ opacity: 0, scale: 0.82, filter: "blur(6px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0.82, filter: "blur(6px)" }}
                          transition={{
                            duration: 0.38,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 4 + (i % 4) * 0.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: (i * 0.4) % 2,
                            }}
                            whileHover={{ scale: 1.06 }}
                          >
                            {renderItem(item, false)}
                          </motion.div>
                        </motion.div>
                      );
                    })
                  : null}
              </AnimatePresence>
            ) : null}
          </div>

          <div className="absolute left-1/2 top-[393px] z-[3] grid -translate-x-1/2 auto-cols-fr grid-flow-col gap-7">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center"
                variants={reveal}
                initial={orbitMounted && !isPortfolio ? "hidden" : false}
                animate="show"
                transition={{
                  duration: isPortfolio ? 0.2 : 0.6,
                  delay: isPortfolio ? 0 : 0.9 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span
                  className={cn(
                    "text-[48px] leading-none tracking-[-0.02em] tabular-nums",
                    isPortfolio
                      ? "font-[family-name:var(--font-display)] font-medium text-primary"
                      : "font-medium text-[#0b2921] dark:text-white",
                  )}
                >
                  {isPortfolio ? (
                    s.value
                  ) : (
                    <CountUp
                      value={s.value}
                      delay={0.9 + i * 0.12}
                      startWhenVisible
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "mt-[15px] text-[14px] leading-none",
                    isPortfolio
                      ? "text-xs font-semibold uppercase tracking-widest text-muted"
                      : "text-[#5e6966] dark:text-white/50",
                  )}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.h2
        className={cn(
          "mx-auto mt-2 max-w-[640px] text-center leading-[1.12]",
          isPortfolio
            ? "font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2rem)] text-foreground"
            : "text-[26px] font-[450] leading-[1.18] tracking-[-0.01em] sm:text-[34px]",
        )}
        variants={reveal}
        initial={orbitMounted && !isPortfolio ? "hidden" : false}
        animate="show"
        transition={{
          duration: isPortfolio ? 0.25 : 0.7,
          delay: isPortfolio ? 0 : 1.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {headline}
      </motion.h2>

      {tags.length > 0 && (
        <div className="mx-auto mt-[35px] flex max-w-[760px] flex-wrap justify-center gap-3">
          {tags.map((t, i) => {
            const Tag = (t.href ? motion.a : motion.button) as typeof motion.a;
            return (
              <Tag
                key={t.label}
                {...(t.href ? { href: t.href } : { type: "button" as const })}
                onClick={t.onClick}
                variants={reveal}
                initial={orbitMounted && !isPortfolio ? "hidden" : false}
                animate="show"
                transition={{
                  duration: isPortfolio ? 0.2 : 0.5,
                  delay: isPortfolio ? 0 : 1.6 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={cn(
                  "group flex h-10 items-center gap-2.5 rounded-full border pl-1.5 pr-4 text-xs font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 active:shadow-none",
                  isPortfolio
                    ? "border-border bg-surface/60 text-foreground hover:border-primary/50 focus-visible:ring-primary/40"
                    : "border-black/[0.08] bg-white text-[14px] font-medium normal-case tracking-normal text-[#3a3a3a] shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] hover:border-black/[0.14] hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.18)] focus-visible:ring-[#2e7d3e]/40 dark:border-white/10 dark:bg-[#161616] dark:text-white/80 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-[#1e1e1e]",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors [&>svg]:h-[15px] [&>svg]:w-[15px]",
                    isPortfolio
                      ? "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-background"
                      : "bg-[#eef4f0] text-[#2e7d3e] group-hover:bg-[#2e7d3e] group-hover:text-white dark:bg-[#1c3a26] dark:text-[#7fd096] dark:group-hover:bg-[#3fa456] dark:group-hover:text-white",
                  )}
                >
                  {t.icon}
                </span>
                {t.label}
              </Tag>
            );
          })}
        </div>
      )}
    </section>
  );
}

export { CommunityOrbit as Component };
