import { useEffect, useRef } from "react";

interface Particle {
  radius: number;
  angle: number;
  size: number;
  seed: number;
}

const PARTICLE_COUNT = 650;
const TILT = 0.3;
const ROTATION = (-16 * Math.PI) / 180;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Colour ramp: white-hot inner edge -> cyan -> violet at the outer edge. */
function particleColor(t: number, alpha: number) {
  if (t < 0.5) {
    const k = t / 0.5;
    return `rgba(${lerp(244, 53, k) | 0},${lerp(246, 200, k) | 0},${lerp(250, 244, k) | 0},${alpha})`;
  }
  const k = (t - 0.5) / 0.5;
  return `rgba(${lerp(53, 139, k) | 0},${lerp(200, 124, k) | 0},${lerp(244, 246, k) | 0},${alpha})`;
}

/**
 * Lightweight canvas rendering of an accretion disk: particles spiral slowly toward a black singularity.
 * Pauses off-screen / in background tabs and renders a single static frame under prefers-reduced-motion.
 */
export default function AccretionCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !context || !parent) return;

    const ctx = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let hole = 0;
    let inner = 0;
    let outer = 0;
    let frame = 0;
    let last = 0;
    let visible = true;
    const particles: Particle[] = [];

    const spawn = (initial: boolean): Particle => ({
      radius: initial ? lerp(inner, outer, Math.random() ** 0.8) : outer * lerp(0.9, 1, Math.random()),
      angle: Math.random() * Math.PI * 2,
      size: lerp(0.8, 2.4, Math.random()),
      seed: Math.random(),
    });

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const wide = width > 860;
      const unit = wide ? Math.min(height * 0.5, width * 0.28) : Math.min(width * 0.46, 180);
      centerX = wide ? width * 0.7 : width * 0.5;
      centerY = wide ? height * 0.5 : 150;
      hole = unit * 0.26;
      inner = hole * 1.22;
      outer = unit * 1.05;

      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(spawn(true));
    }

    function project(radius: number, angle: number) {
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * TILT;
      return {
        x: centerX + x * Math.cos(ROTATION) - y * Math.sin(ROTATION),
        y: centerY + x * Math.sin(ROTATION) + y * Math.cos(ROTATION),
      };
    }

    /** Soft luminous bands that define the plane of the disk; one half at a time so the singularity can occlude the back. */
    function drawDiskBands(front: boolean) {
      const start = front ? 0 : Math.PI;
      const end = front ? Math.PI : Math.PI * 2;
      const bands: Array<[number, number, number, string]> = [
        [lerp(inner, outer, 0.55), hole * 0.9, 0.05, "53,200,244"],
        [lerp(inner, outer, 0.22), hole * 0.5, 0.09, "139,124,246"],
        [inner * 1.04, Math.max(1.2, hole * 0.08), 0.75, "244,246,250"],
      ];
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const [radius, lineWidth, alpha, rgb] of bands) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius, radius * TILT, ROTATION, start, end);
        ctx.strokeStyle = `rgba(${rgb},${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawParticles(front: boolean) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const particle of particles) {
        const isFront = Math.sin(particle.angle) >= 0;
        if (isFront !== front) continue;
        const t = (particle.radius - inner) / (outer - inner);
        const { x, y } = project(particle.radius, particle.angle);
        const alpha = lerp(1, 0.22, Math.min(Math.max(t, 0), 1)) * lerp(0.6, 1, particle.seed);
        ctx.fillStyle = particleColor(Math.min(Math.max(t, 0), 1), alpha);
        ctx.fillRect(x, y, particle.size, particle.size);
      }
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(centerX, centerY, hole * 0.8, centerX, centerY, outer * 1.25);
      glow.addColorStop(0, "rgba(53,200,244,0.16)");
      glow.addColorStop(0.45, "rgba(139,124,246,0.06)");
      glow.addColorStop(1, "rgba(6,6,7,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      drawDiskBands(false);
      drawParticles(false);

      // Gravitationally "lensed" light arching over the top of the singularity.
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ROTATION);
      const arc = ctx.createLinearGradient(-inner, 0, inner, 0);
      arc.addColorStop(0, "rgba(139,124,246,0.15)");
      arc.addColorStop(0.5, "rgba(244,246,250,0.5)");
      arc.addColorStop(1, "rgba(53,200,244,0.15)");
      ctx.strokeStyle = arc;
      ctx.lineWidth = Math.max(1.2, hole * 0.07);
      ctx.beginPath();
      ctx.arc(0, 0, hole * 1.18, Math.PI * 1.06, Math.PI * 1.94);
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(centerX, centerY, hole, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.strokeStyle = "rgba(244,246,250,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      drawDiskBands(true);
      drawParticles(true);
    }

    function step(time: number) {
      frame = 0;
      const delta = Math.min((time - last) / 1000, 0.05);
      last = time;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const ratio = particle.radius / inner;
        particle.angle += (0.55 / Math.pow(ratio, 1.5)) * delta;
        particle.radius -= (0.012 + particle.seed * 0.01) * outer * delta;
        if (particle.radius < inner) particles[i] = spawn(false);
      }
      draw();
      schedule();
    }

    function schedule() {
      if (!frame && visible && !document.hidden && !reducedMotion.matches) {
        frame = requestAnimationFrame((time) => step(time));
      }
    }

    function restart() {
      cancelAnimationFrame(frame);
      frame = 0;
      layout();
      draw();
      last = performance.now();
      schedule();
    }

    restart();

    const resizeObserver = new ResizeObserver(restart);
    resizeObserver.observe(parent);
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
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
