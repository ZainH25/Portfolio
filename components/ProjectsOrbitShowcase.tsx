"use client";

import { useMemo } from "react";
import { Apple, Bot, Smartphone } from "lucide-react";
import CommunityOrbit, {
  type OrbitItem,
  type OrbitStat,
  type OrbitTag,
} from "@/components/ui/builders-community-hero";
import { MobileProjectsHighlight } from "@/components/MobileProjectsHighlight";
import { useCoarsePointer } from "@/hooks/useCoarsePointer";
import {
  atGlance,
  enterpriseProjects,
  independentProjects,
  projects,
  skillCategories,
  type Project,
} from "@/lib/content";

function shortAppTitle(title: string, max = 22) {
  if (title.length <= max) return title;
  return `${title.slice(0, max - 1).trim()}…`;
}

function projectIcon(project: Project) {
  return project.category === "enterprise" ? "📲" : "🛠";
}

/** Same order on server and client — varied but stable (no hydration shuffle) */
function orbitProjectOrder(list: Project[]): Project[] {
  const score = (id: string) =>
    id.split("").reduce((acc, ch) => (acc * 33 + ch.charCodeAt(0)) % 997, 0);
  return [...list].sort((a, b) => score(a.id) - score(b.id));
}

function buildOrbitItems(ordered: Project[]): OrbitItem[] {
  const items: OrbitItem[] = [];
  const n = ordered.length;

  ordered.forEach((project, i) => {
    const ring = i % 2 === 0 ? "outer" : "inner";
    const angle = 38 + (104 * i) / Math.max(1, n - 1);
    items.push({
      kind: "pill",
      ring,
      angle,
      icon: projectIcon(project),
      label: shortAppTitle(project.title),
    });
  });

  items.push({
    kind: "status",
    ring: "outer",
    angle: 128,
    label: `${n} apps in orbit`,
  });

  items.push({
    kind: "card",
    ring: "inner",
    angle: 92,
    emoji: "📱",
    badge: n,
  });

  return items;
}

const toolCount = skillCategories.reduce((c, cat) => c + cat.items.length, 0);

export function ProjectsOrbitShowcase() {
  const coarse = useCoarsePointer();
  const items = useMemo(() => buildOrbitItems(orbitProjectOrder(projects)), []);

  const stats: OrbitStat[] = useMemo(
    () => [
      { value: atGlance.stats[0].value, label: atGlance.stats[0].label },
      { value: `${projects.length}+`, label: "Apps & projects" },
      { value: `${toolCount}+`, label: atGlance.stats[2].label },
    ],
    [],
  );

  const tags: OrbitTag[] = useMemo(
    () => [
      {
        icon: <Smartphone strokeWidth={2} />,
        label: `${enterpriseProjects.length} production apps`,
        href: "#projects-production",
      },
      {
        icon: <Apple strokeWidth={2} />,
        label: "Enterprise mobile",
        href: "#projects-production",
      },
      {
        icon: <Bot strokeWidth={2} />,
        label: `${independentProjects.length} personal builds`,
        href: "#projects-personal",
      },
    ],
    [],
  );

  if (coarse) {
    return <MobileProjectsHighlight />;
  }

  return (
    <CommunityOrbit
      variant="portfolio"
      items={items}
      stats={stats}
      headline={
        <>
          Mobile work across
          <br className="hidden sm:block" />
          <span className="text-primary">production & experiments</span>
        </>
      }
      tags={tags}
      className="!px-0 !pb-8"
    />
  );
}
