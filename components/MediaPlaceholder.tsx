import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  label?: string;
  src?: string;
  alt?: string;
  aspect?: "square" | "video" | "portrait";
  /** App icons / screenshots — `contain` keeps full artwork visible */
  fit?: "cover" | "contain";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const aspectClass = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export function MediaPlaceholder({
  label = "Add photo",
  src,
  alt,
  aspect = "video",
  fit = "cover",
  className,
  sizes = "(max-width: 768px) 90vw, 400px",
  priority = false,
}: MediaPlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-card)] border border-border/60 bg-surface/40",
          aspectClass[aspect],
          className,
        )}
      >
        <Image
          src={src}
          alt={alt ?? label}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            fit === "contain" ? "object-contain p-2" : "object-cover",
          )}
        />
      </div>
    );
  }

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
