import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  badge?: ReactNode;
};

export function BentoCard({ children, className, glow, badge }: BentoCardProps) {
  return (
    <div
      data-aether-avoid
      className={cn(
        "bento-surface rounded-2xl p-3.5 sm:p-4 md:rounded-xl md:p-5",
        glow && "bento-glow",
        className,
      )}
    >
      {badge ? <div className="relative z-[1] mb-4 flex justify-end">{badge}</div> : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

export function LiveBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
      Live
    </span>
  );
}
