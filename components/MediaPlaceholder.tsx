import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  label?: string;
  aspect?: "square" | "video" | "portrait";
  className?: string;
};

const aspectClass = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

/** Drop-in slot — replace inner content with <Image /> when assets are ready. */
export function MediaPlaceholder({
  label = "Add photo",
  aspect = "video",
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-primary/25 bg-surface/30 text-muted",
        aspectClass[aspect],
        className,
      )}
    >
      <ImageIcon className="h-8 w-8 opacity-40" strokeWidth={1.5} />
      <span className="text-[10px] font-semibold uppercase tracking-widest">{label}</span>
    </div>
  );
}
