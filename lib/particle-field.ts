import type { TextZoneRect } from "@/lib/particle-text-zones";

export type ParticleFieldOptions = {
  /** Particles per 9000px² (capped by maxParticles) */
  densityDivisor?: number;
  maxParticles?: number;
  particleColor?: string;
  lineColor?: string;
  lineColorNearMouse?: string;
  mouseRadius?: number;
  /** If false, canvas is cleared each frame (for overlay on site bg) */
  paintBackground?: string | false;
  particleSizeMin?: number;
  particleSizeMax?: number;
  /** Smaller = more/longer connection threads (default 7, try 4–5) */
  connectAreaDivisor?: number;
  lineWidth?: number;
  lineAlphaBoost?: number;
  lineAlphaBoostNearMouse?: number;
  connectionDistanceFalloff?: number;
  /** Screen-space rects (viewport coords) to keep particles away from */
  getTextZones?: () => TextZoneRect[];
  textRepelPadding?: number;
  textRepelStrength?: number;
  textEdgeRepelStrength?: number;
  mouseRepelStrength?: number;
  maxParticleSpeed?: number;
  onReady?: (api: { redistribute: () => void }) => void;
};

const defaultOpts: Required<ParticleFieldOptions> = {
  densityDivisor: 9000,
  maxParticles: 140,
  particleColor: "rgba(45, 140, 255, 0.75)",
  lineColor: "rgba(45, 140, 255, 0.22)",
  lineColorNearMouse: "rgba(255, 255, 255, 0.35)",
  mouseRadius: 220,
  paintBackground: false,
  particleSizeMin: 0.8,
  particleSizeMax: 2.2,
  connectAreaDivisor: 7,
  lineWidth: 0.85,
  lineAlphaBoost: 0.32,
  lineAlphaBoostNearMouse: 0.45,
  connectionDistanceFalloff: 20000,
  getTextZones: () => [] as TextZoneRect[],
  textRepelPadding: 64,
  textRepelStrength: 5.5,
  textEdgeRepelStrength: 1.8,
  mouseRepelStrength: 3.2,
  maxParticleSpeed: 0.42,
  onReady: () => {},
};

export function attachParticleField(
  canvasEl: HTMLCanvasElement,
  options: ParticleFieldOptions = {},
) {
  const opts = { ...defaultOpts, ...options };
  const context = canvasEl.getContext("2d");
  if (!context) return () => {};

  const ctx = context;
  let animationFrameId = 0;
  const mouse = { x: null as number | null, y: null as number | null, radius: opts.mouseRadius };
  const bounds = { w: canvasEl.width, h: canvasEl.height };

  class Particle {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    size: number;
    color: string;
    phase: number;

    constructor(
      x: number,
      y: number,
      directionX: number,
      directionY: number,
      size: number,
      color: string,
    ) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
      this.phase = Math.random() * Math.PI * 2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update(t: number) {
      const wobble = 0.011;
      this.directionX += Math.sin(t * 0.0011 + this.phase) * wobble;
      this.directionY += Math.cos(t * 0.0013 + this.phase * 1.37) * wobble;

      if (this.x >= bounds.w) {
        this.x = bounds.w - 1;
        this.directionX = -Math.abs(this.directionX) - Math.random() * 0.08;
        this.directionY += (Math.random() - 0.5) * 0.12;
      } else if (this.x <= 0) {
        this.x = 1;
        this.directionX = Math.abs(this.directionX) + Math.random() * 0.08;
        this.directionY += (Math.random() - 0.5) * 0.12;
      }
      if (this.y >= bounds.h) {
        this.y = bounds.h - 1;
        this.directionY = -Math.abs(this.directionY) - Math.random() * 0.08;
        this.directionX += (Math.random() - 0.5) * 0.12;
      } else if (this.y <= 0) {
        this.y = 1;
        this.directionY = Math.abs(this.directionY) + Math.random() * 0.08;
        this.directionX += (Math.random() - 0.5) * 0.12;
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceDirectionX * force * opts.mouseRepelStrength;
          this.y -= forceDirectionY * force * opts.mouseRepelStrength;
        }
      }

      applyTextRepulsion(this);

      this.x += this.directionX;
      this.y += this.directionY;

      clampSpeed(this);
      this.draw();
    }
  }

  let particles: Particle[] = [];
  let textZones: TextZoneRect[] = [];

  const clampSpeed = (p: Particle) => {
    const speed = Math.hypot(p.directionX, p.directionY);
    if (speed > opts.maxParticleSpeed) {
      const s = opts.maxParticleSpeed / speed;
      p.directionX *= s;
      p.directionY *= s;
    }
  };

  const zonePad = (z: TextZoneRect, base = opts.textRepelPadding) =>
    base * (z.padScale ?? 1);

  const pointInPaddedZone = (x: number, y: number, z: TextZoneRect, pad: number) => {
    const p = pad * (z.padScale ?? 1);
    return x >= z.left - p && x <= z.right + p && y >= z.top - p && y <= z.bottom + p;
  };

  const applyTextRepulsion = (p: Particle) => {
    let pushX = 0;
    let pushY = 0;

    for (const z of textZones) {
      const pad = zonePad(z);
      const cx = (z.left + z.right) * 0.5;
      const cy = (z.top + z.bottom) * 0.5;
      const halfW = (z.right - z.left) * 0.5 + pad;
      const halfH = (z.bottom - z.top) * 0.5 + pad;
      const dx = p.x - cx;
      const dy = p.y - cy;
      const nx = dx / halfW;
      const ny = dy / halfH;
      const elliptical = nx * nx + ny * ny;
      if (elliptical >= 1.55 * 1.55) continue;

      const dist = Math.hypot(dx, dy) || 1;
      const inside = pointInPaddedZone(p.x, p.y, z, opts.textRepelPadding);
      const proximity = inside ? 1 : Math.max(0, 1.55 - Math.sqrt(elliptical));
      const strength = inside ? opts.textRepelStrength : opts.textEdgeRepelStrength * proximity;

      pushX += (dx / dist) * strength * proximity;
      pushY += (dy / dist) * strength * proximity;
    }

    if (pushX !== 0 || pushY !== 0) {
      p.directionX += pushX * 0.028;
      p.directionY += pushY * 0.028;
      p.x += pushX * 0.06;
      p.y += pushY * 0.06;
    }

    p.directionX *= 0.996;
    p.directionY *= 0.996;
    clampSpeed(p);
  };

  const isClearPoint = (x: number, y: number, padFactor = 0.75) => {
    return !textZones.some((z) =>
      pointInPaddedZone(x, y, z, opts.textRepelPadding * padFactor),
    );
  };

  const spawnOutsideText = (size: number) => {
    const margin = size * 2;
    for (let attempt = 0; attempt < 48; attempt++) {
      const x = Math.random() * (bounds.w - margin * 2) + margin;
      const y = Math.random() * (bounds.h - margin * 2) + margin;
      if (isClearPoint(x, y)) return { x, y };
    }

    return {
      x: Math.random() * (bounds.w - margin * 2) + margin,
      y: Math.random() * (bounds.h - margin * 2) + margin,
    };
  };

  let smoothedZones: TextZoneRect[] = [];
  const smoothZones = (target: TextZoneRect[]) => {
    const alpha = 0.07;
    if (smoothedZones.length !== target.length) {
      smoothedZones = target.map((z) => ({ ...z }));
      return smoothedZones;
    }
    smoothedZones = target.map((t, i) => {
      const s = smoothedZones[i];
      return {
        left: s.left + (t.left - s.left) * alpha,
        top: s.top + (t.top - s.top) * alpha,
        right: s.right + (t.right - s.right) * alpha,
        bottom: s.bottom + (t.bottom - s.bottom) * alpha,
        padScale: t.padScale,
      };
    });
    return smoothedZones;
  };

  const redistributeParticles = (ratio = 0.45) => {
    textZones = opts.getTextZones();
    const toMove = Math.max(1, Math.floor(particles.length * ratio));
    for (let i = 0; i < toMove; i++) {
      const p = particles[Math.floor(Math.random() * particles.length)];
      const outOfView =
        p.x < -20 || p.x > bounds.w + 20 || p.y < -20 || p.y > bounds.h + 20;
      const inText = !isClearPoint(p.x, p.y, 0.9);
      if (!outOfView && !inText && Math.random() > 0.25) continue;
      const pos = spawnOutsideText(p.size);
      p.x = pos.x;
      p.y = pos.y;
      p.directionX = (Math.random() - 0.5) * 0.22;
      p.directionY = (Math.random() - 0.5) * 0.22;
    }
  };

  const init = () => {
    textZones = opts.getTextZones();
    particles = [];
    const count = Math.min(
      opts.maxParticles,
      Math.floor((bounds.h * bounds.w) / opts.densityDivisor),
    );
    for (let i = 0; i < count; i++) {
      const size =
        Math.random() * (opts.particleSizeMax - opts.particleSizeMin) + opts.particleSizeMin;
      const { x, y } = spawnOutsideText(size);
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.14;
      const directionX = Math.cos(angle) * speed;
      const directionY = Math.sin(angle) * speed;
      particles.push(
        new Particle(x, y, directionX, directionY, size, opts.particleColor),
      );
    }
  };

  const resizeCanvas = () => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    bounds.w = canvasEl.width;
    bounds.h = canvasEl.height;
    init();
  };

  const connect = () => {
    const maxLink = Math.min(148, Math.min(bounds.w, bounds.h) * 0.16);
    const maxLinkSq = maxLink * maxLink;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = dx * dx + dy * dy;
        if (distance < maxLinkSq) {
          const mx = (particles[a].x + particles[b].x) * 0.5;
          const my = (particles[a].y + particles[b].y) * 0.5;
          const crossesText = textZones.some((z) => {
            return (
              pointInPaddedZone(mx, my, z, opts.textRepelPadding * 0.55) ||
              pointInPaddedZone(particles[a].x, particles[a].y, z, opts.textRepelPadding * 0.65) ||
              pointInPaddedZone(particles[b].x, particles[b].y, z, opts.textRepelPadding * 0.65)
            );
          });
          if (crossesText) continue;

          const opacityValue = 1 - distance / (maxLinkSq * 1.15);
          const dxMouseA = particles[a].x - (mouse.x ?? 0);
          const dyMouseA = particles[a].y - (mouse.y ?? 0);
          const distanceMouseA = Math.sqrt(dxMouseA * dxMouseA + dyMouseA * dyMouseA);

          const nearMouse =
            mouse.x !== null && mouse.y !== null && distanceMouseA < mouse.radius;
          const lineAlpha = nearMouse
            ? opacityValue * opts.lineAlphaBoostNearMouse
            : opacityValue * opts.lineAlphaBoost;
          ctx.strokeStyle = nearMouse
            ? `rgba(255, 255, 255, ${Math.min(0.95, lineAlpha)})`
            : `rgba(45, 140, 255, ${Math.min(0.85, lineAlpha)})`;

          ctx.lineWidth = opts.lineWidth;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  };

  let frame = 0;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    textZones = smoothZones(opts.getTextZones());
    frame++;

    if (frame % 420 === 0) {
      for (const p of particles) {
        if (p.x < -30 || p.x > bounds.w + 30 || p.y < -30 || p.y > bounds.h + 30) {
          const pos = spawnOutsideText(p.size);
          p.x = pos.x;
          p.y = pos.y;
          p.directionX *= 0.5;
          p.directionY *= 0.5;
        }
      }
    }

    if (opts.paintBackground) {
      ctx.fillStyle = opts.paintBackground;
      ctx.fillRect(0, 0, bounds.w, bounds.h);
    } else {
      ctx.clearRect(0, 0, bounds.w, bounds.h);
    }
    for (let i = 0; i < particles.length; i++) particles[i].update(frame);
    connect();
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  };

  const handleMouseOut = () => {
    mouse.x = null;
    mouse.y = null;
  };

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("mouseout", handleMouseOut);
  resizeCanvas();
  animate();

  opts.onReady?.({
    redistribute: (ratio = 0.1) => redistributeParticles(ratio),
  });

  const onVisibility = () => {
    if (document.visibilityState === "visible") {
      redistributeParticles(0.08);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseout", handleMouseOut);
    cancelAnimationFrame(animationFrameId);
  };
}
