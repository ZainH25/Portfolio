import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import type { Project } from "@/lib/content";
import { getProjectImageSrc } from "@/lib/project-images";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  variant?: "rail" | "grid";
  active?: boolean;
};

export function ProjectCard({ project, variant = "grid", active = false }: ProjectCardProps) {
  const isRail = variant === "rail";
  const imageSrc = getProjectImageSrc(project.id);

  return (
    <article
      {...(isRail ? { "data-aether-ignore": true } : { "data-aether-avoid": true })}
      className={
        isRail
          ? cn(
              "group flex w-full max-w-[34rem] flex-col rounded-[var(--radius-card)] border p-4 backdrop-blur-md transition-[border-color,box-shadow] duration-500 max-lg:overflow-visible sm:p-5 lg:max-h-[min(72dvh,42rem)] lg:overflow-hidden lg:p-6",
              active
                ? "border-primary/50 bg-background/95 shadow-2xl shadow-primary/15 ring-1 ring-primary/20"
                : "border-border/80 bg-background/90",
            )
          : cn(
              "group bento-surface mx-auto flex w-full max-w-[23rem] flex-col overflow-hidden p-5 transition-transform duration-500 hover:-translate-y-1 md:max-w-[24rem] md:p-6",
            )
      }
    >
      <MediaPlaceholder
        src={imageSrc}
        alt={`${project.title} app`}
        label={`${project.title} screenshot`}
        aspect="square"
        fit={imageSrc ? "contain" : "cover"}
        sizes={isRail ? "(max-width: 1024px) 100vw, 34rem" : "(max-width: 768px) 40vw, 9rem"}
        className={cn(
          "shrink-0 transition-opacity group-hover:opacity-90",
          isRail &&
            "!aspect-auto mb-3 h-[7.5rem] w-full shrink-0 bg-background/50 max-lg:h-[7.5rem] sm:h-[10.5rem] md:h-[10.5rem]",
          !isRail &&
            "mx-auto mb-3 aspect-square w-[42%] min-w-[7rem] max-w-[10rem] rounded-lg",
        )}
      />

      <div
        className={cn(
          "flex min-h-0 flex-col",
          isRail &&
            "flex flex-col lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-1 lg:[-webkit-overflow-scrolling:touch]",
        )}
      >
        <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-primary">
          {project.category === "enterprise" ? "Production" : "Independent"} · {project.index}
        </p>
        <h3
          className={cn(
            "mt-2 font-[family-name:var(--font-display)] leading-tight text-foreground",
            isRail ? "text-xl md:text-2xl" : "text-xl md:text-2xl",
          )}
        >
          {project.title}
        </h3>
        {project.subtitle ? (
          <p
            className={cn(
              "mt-1 text-foreground/75",
              isRail ? "text-sm md:text-base" : "line-clamp-2 text-sm",
            )}
          >
            {project.subtitle}
          </p>
        ) : null}
        {isRail ? (
          <p className="mt-2 text-xs leading-relaxed text-foreground/65 md:text-sm">{project.stack}</p>
        ) : null}
        {isRail ? (
          <p className="mt-2.5 text-sm leading-relaxed text-foreground/95 md:text-[15px] md:leading-7">
            {project.summary}
          </p>
        ) : (
          <>
            <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">{project.stack}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{project.summary}</p>
          </>
        )}
        <ul
          className={cn(
            "border-t border-border/60 text-muted",
            isRail
              ? "mt-3 space-y-2 pt-3 text-sm leading-relaxed text-foreground/85 md:text-[14px] md:leading-6"
              : "mt-3 space-y-1.5 pt-3 text-xs leading-relaxed md:text-sm",
          )}
        >
          {(isRail ? project.highlights : project.highlights.slice(0, 3)).map((h) => (
            <li key={h} className="flex gap-2 text-left">
              <span className="shrink-0 text-primary" aria-hidden>—</span>
              <span className={!isRail ? "line-clamp-2" : undefined}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
