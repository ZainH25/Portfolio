"use client";

import AetherFlowHero from "@/components/ui/aether-flow-hero";
import { site } from "@/lib/content";

export function SiteIntroHero() {
  return (
    <AetherFlowHero
      id="hero"
      badge={`${site.role} at ${site.employer}`}
      subtitle={site.subtitle}
      title={site.name}
      description={`${site.intro} ${site.headline}.`}
      primaryCta={{ label: "About me", href: "#about" }}
      secondaryCta={{ label: "View projects", href: "#projects" }}
      className="border-b border-border/40"
    />
  );
}
