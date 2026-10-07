"use client";

import { useId } from "react";
import { careerMilestones } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Normalized node positions (viewBox 0 0 100 48) */
const NODE_XY: [number, number][] = [
  [8, 36],
  [28, 22],
  [50, 28],
  [72, 18],
  [92, 24],
];

function buildCurvePath(points: [number, number][]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev[0] + curr[0]) / 2;
    d += ` C ${cx} ${prev[1]}, ${cx} ${curr[1]}, ${curr[0]} ${curr[1]}`;
  }
  return d;
}

function RouteGraphSvg({
  gradientId,
  points,
  className,
  preserveAspectRatio = "none",
}: {
  gradientId: string;
  points: [number, number][];
  className?: string;
  preserveAspectRatio?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 48"
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(45, 140, 255)" stopOpacity="0.35" />
          <stop offset="45%" stopColor="rgb(45, 140, 255)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(56, 189, 248)" stopOpacity="1" />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={buildCurvePath(points)}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.55"
        strokeLinecap="round"
        filter={`url(#${gradientId}-glow)`}
      />
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r="1.35"
            fill="rgb(10, 12, 18)"
            stroke="rgb(45, 140, 255)"
            strokeWidth="0.45"
          />
          <circle cx={x} cy={y} r="0.55" fill="rgb(255, 255, 255)" />
        </g>
      ))}
    </svg>
  );
}

export function CareerRouteChart() {
  const gradientId = useId().replace(/:/g, "");
  const mobileGraphId = `${gradientId}-m`;
  const points = NODE_XY.slice(0, careerMilestones.length);

  return (
    <>
      {/* Mobile: route graph + vertical cards */}
      <div className="mt-3 md:hidden">
        <div
          className="relative overflow-hidden rounded-[var(--radius-control)] border border-border/50 bg-background/30 px-2 py-3"
        >
          <RouteGraphSvg
            gradientId={mobileGraphId}
            points={points}
            className="pointer-events-none h-[6.75rem] w-full"
            preserveAspectRatio="xMidYMid meet"
          />
          <div className="mt-1 flex justify-between gap-1 px-0.5">
            {careerMilestones.map((step, i) => (
              <span
                key={`dot-${step.period}`}
                className={cn(
                  "max-w-[18%] truncate text-center text-[8px] font-semibold tabular-nums text-primary",
                  i === careerMilestones.length - 1 && "text-sky-300",
                )}
              >
                {step.period.split("–")[0]?.trim() ?? step.period}
              </span>
            ))}
          </div>
        </div>

        <ol className="mt-3 flex flex-col gap-2.5">
          {careerMilestones.map((step, i) => (
            <li
              key={step.period + step.title}
              className={cn(
                "timeline-card-in rounded-[var(--radius-control)] border border-border/60 border-l-[3px] border-l-primary/70 bg-background/40 py-3 pl-3.5 pr-3",
                i === careerMilestones.length - 1 && "border-primary/35 bg-primary/[0.06]",
              )}
              style={{ animationDelay: `${100 + i * 75}ms` }}
            >
              <p className="text-[10px] font-semibold tabular-nums tracking-wide text-primary">
                {step.period}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop: curved route with positioned labels */}
      <div className="relative mt-2 hidden min-h-[240px] md:block">
        <RouteGraphSvg
          gradientId={gradientId}
          points={points}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <ul className="relative grid grid-cols-5 gap-2 pt-[4.5rem]">
          {careerMilestones.map((step, i) => {
            const [nx, ny] = points[i] ?? [50, 24];
            return (
              <li
                key={step.period + step.title}
                className="absolute w-[19%] max-w-[9.5rem] text-center"
                style={{
                  top: `${(ny / 48) * 100}%`,
                  left: `${nx}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="text-[10px] font-semibold tabular-nums text-primary">{step.period}</p>
                <p className="mt-1 text-[11px] font-semibold leading-snug text-foreground">
                  {step.title}
                </p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{step.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
