import { cn } from "@/lib/utils";

/** Same soft glow as the intro hero — lets GlobalParticleField read clearly on top. */
export function AetherFlowBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgba(45,140,255,0.12),transparent_65%)]",
        className,
      )}
      aria-hidden
    />
  );
}
