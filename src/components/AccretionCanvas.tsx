import { useEffect, useRef, type RefObject } from "react";

interface Particle {
  radius: number;
  angle: number;
  size: number;
  seed: number;
}

interface AccretionCanvasProps {
  /** The official logo element. The environment is centred on its black hole so the logo emerges from it. */
  anchorRef: RefObject<HTMLElement | null>;
  /** Vertical position of the black-hole centre inside the anchor (0-1). */
  anchorCenterY: number;
  className?: string;
}

const TILT = 0.28;
const ROTATION = (-9 * Math.PI) / 180;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

/** Brand heat ramp (inner -> outer): warm white, gold, orange, red-orange, burnt orange. */
const RAMP: ReadonlyArray<readonly [number, number, number]> = [
  [255, 226, 170],
  [255, 176, 0],
  [255, 106, 0],
  [217, 45, 0],
  [150, 52, 0],
];

function heat(t: number, alpha: number) {
  const scaled = clamp01(t) * (RAMP.length - 1);
  const index = Math.min(Math.floor(scaled), RAMP.length - 2);
  const k = scaled - index;
  const [r1, g1, b1] = RAMP[index];
  const [r2, g2, b2] = RAMP[index + 1];
  return `rgba(${lerp(r1, r2, k) | 0},${lerp(g1, g2, k) | 0},${lerp(b1, b2, k) | 0},${alpha})`;
}

/**
 * Brand-aligned accretion environment drawn *around* the official logo: a slow, warm particle disk,
 * faint light trails, stardust and an ember glow. The logo itself supplies the singularity.
 * Particle density scales with the viewport; animation pauses off-screen / in hidden tabs and renders a
 * single static frame under prefers-reduced-motion.
 */
export default function AccretionCanvas({ anchorRef, anchorCenterY, className = "" }: AccretionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const stage = canvas?.parentElement;
    if (!canvas || !context || !stage) return;

    const ctx = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let inner = 0;
    let outer = 0;
    let frame = 0;
    let last = 0;
    let visible = true;
    let particles: Particle[] = [];
    let stars: Array<{ x: number; y: number; size: number; alpha: number }> = [];

    const spawn = (initial: boolean): Particle => ({
      radius: initial ? lerp(inner, outer, Math.random() ** 0.85) : outer * lerp(0.92, 1, Math.random()),
      angle: Math.random() * Math.PI * 2,
      size: lerp(1, 2.6, Math.random()),
      seed: Math.random(),
    });

    function layout() {
      width = stage!.clientWidth;
      height = stage!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const anchor = anchorRef.current;
      const anchorWidth = anchor?.offsetWidth ?? width * 0.7;
      const anchorHeight = anchor?.offsetHeight ?? height * 0.5;
      const anchorLeft = anchor?.offsetLeft ?? (width - anchorWidth) / 2;
      const anchorTop = anchor?.offsetTop ?? (height - anchorHeight) / 2;
      centerX = anchorLeft + anchorWidth / 2;
      centerY = anchorTop + anchorHeight * anchorCenterY;

      // The disk starts just outside the logo's own ring and fades out before the stage edge.
      inner = anchorWidth * 0.3;
      outer = Math.min(anchorWidth * 0.95, width * 0.49);

      const density = width < 600 ? 170 : width < 960 ? 300 : 520;
      particles = Array.from({ length: density }, () => spawn(true));
      const starCount = width < 600 ? 28 : 60;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: lerp(0.6, 1.3, Math.random()),
        alpha: lerp(0.15, 0.5, Math.random()),
      }));
    }

    function project(radius: number, angle: number) {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * TILT;
      return {
        x: centerX + x * Math.cos(ROTATION) - y * Math.sin(ROTATION),
        y: centerY + x * Math.sin(ROTATION) + y * Math.cos(ROTATION),
      };
    }

    function draw(animated: boolean) {
      ctx.clearRect(0, 0, width, height);

      // Ember glow: gravitational ambience that deepens toward the singularity but stays dark at the very centre.
      const glow = ctx.createRadialGradient(centerX, centerY, inner * 0.6, centerX, centerY, outer * 1.15);
      glow.addColorStop(0, "rgba(201,74,0,0)");
      glow.addColorStop(0.35, "rgba(201,74,0,0.16)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (const star of stars) {
        ctx.fillStyle = `rgba(255,226,170,${star.alpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      for (const particle of particles) {
        const t = clamp01((particle.radius - inner) / (outer - inner));
        const { x, y } = project(particle.radius, particle.angle);
        // Relativistic beaming: one side of the disk is brighter than the other.
        const beaming = 0.55 + 0.45 * Math.cos(particle.angle - Math.PI * 0.85);
        const fade = clamp01(t * 6) * clamp01((1 - t) * 2);
        const alpha = lerp(1, 0.55, t) * lerp(0.65, 1, particle.seed) * beaming * fade;
        if (alpha < 0.02) continue;
        ctx.fillStyle = heat(t * 0.9, alpha);
        ctx.fillRect(x, y, particle.size, particle.size);

        if (animated && particle.seed > 0.86 && t < 0.55) {
          // Short light trail along the orbit for the fastest, innermost particles.
          const behind = project(particle.radius, particle.angle - 0.09 / Math.pow(particle.radius / inner, 1.2));
          ctx.strokeStyle = heat(t * 0.7, alpha * 0.45);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(behind.x, behind.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    function step(time: number) {
      frame = 0;
      const delta = Math.min((time - last) / 1000, 0.05);
      last = time;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const ratio = particle.radius / inner;
        particle.angle += (0.32 / Math.pow(ratio, 1.5)) * delta;
        particle.radius -= (0.008 + particle.seed * 0.007) * outer * delta;
        if (particle.radius < inner) particles[i] = spawn(false);
      }
      draw(true);
      schedule();
    }

    function schedule() {
      if (!frame && visible && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame(step);
      }
    }

    function restart() {
      cancelAnimationFrame(frame);
      frame = 0;
      layout();
      draw(false);
      last = performance.now();
      schedule();
    }

    restart();

    const resizeObserver = new ResizeObserver(restart);
    resizeObserver.observe(stage);
    if (anchorRef.current) resizeObserver.observe(anchorRef.current);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
      schedule();
    });
    intersection.observe(canvas);
    const onVisibility = () => {
      last = performance.now();
      schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", restart);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", restart);
    };
  }, [anchorRef, anchorCenterY]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
