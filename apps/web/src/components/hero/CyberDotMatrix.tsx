import { useEffect, useRef, useState } from "react";
import brandIconWhite from "../../assets/brand/sea-kers-icon-color.svg";
import type { Theme } from "../../types";
import {
  mapParticleSampleToCanvas,
  selectParticleSamples,
  type ParticleSample,
} from "../../utils/particleSampling";

interface CyberDotMatrixProps {
  theme?: Theme;
}

interface NetworkInformationLike extends EventTarget {
  downlink?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  saveData?: boolean;
}

interface NavigatorWithCapabilities extends Navigator {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
}

interface Particle extends ParticleSample {
  baseX: number;
  baseY: number;
  size: number;
  phase: number;
}

const getParticleBudget = () => {
  const capabilities = navigator as NavigatorWithCapabilities;
  const connection = capabilities.connection;
  const cores = capabilities.hardwareConcurrency || 4;
  const memory = capabilities.deviceMemory || 4;

  if (
    connection?.saveData ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  ) {
    return 800;
  }

  // Generous particle budget for high dot density ("more dots, not thicker dots")
  let budget = 1400;
  if (cores >= 4 && memory >= 4) budget = 1600;
  if (cores >= 8 && memory >= 8) budget = 1800;

  return budget;
};

export default function CyberDotMatrix({ theme: _theme }: CyberDotMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const canvasSize = 512;
    const frameInterval = 1000 / 30;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    let particles: Particle[] = [];
    let animationFrameId: number | null = null;
    let idleCallbackId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastFrame = 0;
    let elapsed = 0;
    let isIntersecting = true;
    let disposed = false;
    const pointer = { x: -1000, y: -1000, active: false };
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const draw = (timestamp: number) => {
      if (disposed) return;
      animationFrameId = window.requestAnimationFrame(draw);
      if (
        document.hidden ||
        !isIntersecting ||
        timestamp - lastFrame < frameInterval
      ) {
        return;
      }

      elapsed += (timestamp - lastFrame) / 1000;
      lastFrame = timestamp;
      context.clearRect(0, 0, canvasSize, canvasSize);

      const caretColor = "#ffffff";
      const arcColor = "#1e40af";

      for (const particle of particles) {
        const isArc = particle.kind === "arc";
        const horizontalMotion =
          Math.sin(elapsed * 1.6 + particle.phase) * 4.5;
        const verticalMotion =
          Math.cos(elapsed * 1.3 + particle.phase) * 3.5;
        let targetX = particle.baseX + horizontalMotion;
        let targetY = particle.baseY + verticalMotion;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 80) {
            const force = (80 - distance) / 80;
            targetX += (dx / distance) * force * 16;
            targetY += (dy / distance) * force * 16;
          }
        }

        particle.x += (targetX - particle.x) * 0.12;
        particle.y += (targetY - particle.y) * 0.12;
        context.fillStyle = isArc ? arcColor : caretColor;
        context.globalAlpha = isArc ? 0.95 : 0.92;
        context.fillRect(
          particle.x,
          particle.y,
          particle.size,
          particle.size,
        );
      }
      context.globalAlpha = 1;
    };

    const startParticleUpgrade = () => {
      if (disposed) return;
      const image = new Image();
      image.src = brandIconWhite;
      image.onload = () => {
        if (disposed) return;

        const sampleSize = 224;
        const offscreen = document.createElement("canvas");
        const offscreenContext = offscreen.getContext("2d", {
          willReadFrequently: true,
        });
        if (!offscreenContext) return;

        offscreen.width = sampleSize;
        offscreen.height = sampleSize;
        offscreenContext.drawImage(image, 0, 0, sampleSize, sampleSize);
        const pixels = offscreenContext.getImageData(
          0,
          0,
          sampleSize,
          sampleSize,
        ).data;
        const sampled: ParticleSample[] = [];

        for (let y = 0; y < sampleSize; y += 1) {
          for (let x = 0; x < sampleSize; x += 1) {
            const index = (y * sampleSize + x) * 4;
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const alpha = pixels[index + 3];
            if (alpha < 50) continue;

            sampled.push({
              x,
              y,
              kind:
                red > 205 && green > 205 && blue > 205 ? "caret" : "arc",
            });
          }
        }

        if (sampled.length === 0) return;

        const particleBudget = Math.min(getParticleBudget(), sampled.length);
        const points = selectParticleSamples(sampled, particleBudget);

        particles = points.map((point, index) => {
          const mappedPoint = mapParticleSampleToCanvas(
            point,
            sampleSize,
            canvasSize,
          );
          const baseX = mappedPoint.x;
          const baseY = mappedPoint.y;
          return {
            x: baseX,
            y: baseY,
            baseX,
            baseY,
            kind: point.kind,
            // Fine, crisp star-dots ("more dots, not thicker dots")
            size: Math.max(2.8, mappedPoint.scale * 1.1),
            phase: (index * 0.618) % (Math.PI * 2),
          };
        });

        setIsAnimated(true);
        animationFrameId = window.requestAnimationFrame(draw);
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? true;
        if (!isIntersecting) return;
        if (particles.length > 0) return;

        const schedule =
          "requestIdleCallback" in window
            ? window.requestIdleCallback
            : null;

        if (schedule) {
          idleCallbackId = schedule(startParticleUpgrade, { timeout: 1200 });
        } else {
          timeoutId = setTimeout(startParticleUpgrade, 150);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scale = canvasSize / rect.width;
      pointer.x = (event.clientX - rect.left) * scale;
      pointer.y = (event.clientY - rect.top) * scale;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    if (finePointer) {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      disposed = true;
      observer.disconnect();
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="relative aspect-square w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] md:w-[410px] md:h-[410px] lg:w-[452px] lg:h-[452px] shrink-0 overflow-hidden rounded-2xl md:rounded-3xl bg-[#030624] p-5 shadow-2xl flex items-center justify-center ml-auto">
      <img
        src={brandIconWhite}
        width="512"
        height="512"
        fetchPriority="high"
        alt="Team SEA-KERS caret above a single ocean arc"
        aria-hidden={isAnimated || undefined}
        className={`absolute inset-5 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] object-contain transition-opacity duration-200 ${isAnimated ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Animated Team SEA-KERS caret above an ocean arc"
        aria-hidden={!isAnimated || undefined}
        className={`relative aspect-square h-auto w-full transition-opacity duration-200 ${isAnimated ? "opacity-100" : "opacity-0"}`}
      >
        Team SEA-KERS caret logo above one ocean arc.
      </canvas>
    </div>
  );
}
