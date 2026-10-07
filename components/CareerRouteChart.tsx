"use client";

import { careerMilestones } from "@/lib/content";

/** Normalized node positions (viewBox 0 0 100 48) — gentle upward curve with variation */
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

export function CareerRouteChart() {
  const points = NODE_XY.slice(0, careerMilestones.length);

  return (
    <div className="relative mt-2 min-h-[280px] md:min-h-[240px]">
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 100 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="career-route-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(45, 140, 255)" stopOpacity="0.35" />
            <stop offset="45%" stopColor="rgb(45, 140, 255)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(56, 189, 248)" stopOpacity="1" />
          </linearGradient>
          <filter id="career-route-glow" x="-20%" y="-20%" width="140%" height="140%">
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
          stroke="url(#career-route-stroke)"
          strokeWidth="0.55"
          strokeLinecap="round"
          filter="url(#career-route-glow)"
        />
        {points.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.35" fill="rgb(10, 12, 18)" stroke="rgb(45, 140, 255)" strokeWidth="0.45" />
            <circle cx={x} cy={y} r="0.55" fill="rgb(255, 255, 255)" />
          </g>
        ))}
      </svg>

      {/* Mobile: vertical stepped timeline with curved connector */}
      <svg
        className="pointer-events-none absolute left-3 top-2 bottom-2 w-8 md:hidden"
        viewBox="0 0 8 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M 4 4 C 4 22, 6 38, 4 52 C 2 66, 6 82, 4 96"
          fill="none"
          stroke="rgb(45, 140, 255)"
          strokeWidth="0.5"
          strokeOpacity="0.75"
          strokeLinecap="round"
        />
      </svg>

      <ul className="relative grid gap-8 pl-10 md:grid-cols-5 md:gap-2 md:pl-0 md:pt-[4.5rem]">
        {careerMilestones.map((step, i) => {
          const [nx, ny] = points[i] ?? [50, 24];
          const mdStyle =
            i < points.length
              ? ({
                  top: `${(ny / 48) * 100}%`,
                  left: `${nx}%`,
                  transform: "translate(-50%, -50%)",
                } as const)
              : undefined;

          return (
            <li
              key={step.period + step.title}
              className="relative md:absolute md:w-[19%] md:max-w-[9.5rem] md:text-center"
              style={mdStyle}
            >
              <span
                className="absolute -left-7 top-1.5 flex h-2.5 w-2.5 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(45,140,255,0.5)] md:hidden"
                aria-hidden
              />
              <p className="text-[10px] font-semibold tabular-nums text-primary">{step.period}</p>
              <p className="mt-1 text-xs font-semibold leading-snug text-foreground md:text-[11px]">
                {step.title}
              </p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{step.detail}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
