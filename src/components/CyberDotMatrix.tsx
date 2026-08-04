import { useEffect, useRef, useState } from "react";
import brandIcon from "../assets/brand/sea-kers-icon-color.svg";
import brandIconDarkCaret from "../assets/brand/sea-kers-icon-dark-caret.svg";
import type { Theme } from "../types";
import {
  mapParticleSampleToCanvas,
  selectParticleSamples,
  type ParticleSample,
} from "../utils/particleSampling";

interface CyberDotMatrixProps {
  theme: Theme;
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

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

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
    return 650;
  }

  let budget = 700;
  if (connection?.effectiveType === "3g") budget += 250;
  if (connection?.effectiveType === "4g") budget += 450;
  if ((connection?.downlink ?? 0) >= 3) budget += 120;
  if ((connection?.downlink ?? 0) >= 10) budget += 130;

  budget += clamp((cores - 2) * 90, 0, 630);
  budget += memory >= 8 ? 400 : memory >= 4 ? 180 : 0;

  if (cores <= 2 || memory <= 2) budget = Math.min(budget, 850);
  if (cores <= 4 || memory <= 4) budget = Math.min(budget, 1600);

  return clamp(Math.round(budget / 50) * 50, 650, 2200);
};

export default function CyberDotMatrix({ theme }: CyberDotMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

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

      const isLight = themeRef.current === "light";
      const caretColor = isLight ? "#11131a" : "#f4f6fb";

      for (const particle of particles) {
        const isArc = particle.kind === "arc";
        const horizontalMotion =
          Math.sin(elapsed * 1.7 + particle.phase) * 6;
        const verticalMotion =
          Math.cos(elapsed * 1.35 + particle.phase) * 4;
        let targetX = particle.baseX + horizontalMotion;
        let targetY = particle.baseY + verticalMotion;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 82) {
            const force = (82 - distance) / 82;
            targetX += (dx / distance) * force * 18;
            targetY += (dy / distance) * force * 18;
          }
        }

        particle.x += (targetX - particle.x) * 0.12;
        particle.y += (targetY - particle.y) * 0.12;
        context.fillStyle = isArc ? "#4361ee" : caretColor;
        context.globalAlpha = isArc ? 0.95 : 0.86;
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
      image.src = brandIcon;
      image.onload = () => {
        if (disposed) return;

        const sampleSize = 192;
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
            if (alpha < 72) continue;

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
            size: Math.max(3.6, mappedPoint.scale * 1.2),
            phase: (index * 0.618) % (Math.PI * 2),
          };
        });

        setIsAnimated(true);
        animationFrameId = window.requestAnimationFrame(draw);
      };
    };

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(startParticleUpgrade, {
        timeout: 1800,
      });
    } else {
      timeoutId = globalThis.setTimeout(startParticleUpgrade, 1200);
    }

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry?.isIntersecting ?? true;
    });
    observer.observe(canvas);

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * canvasSize;
      pointer.y = ((event.clientY - bounds.top) / bounds.height) * canvasSize;
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
      if (idleCallbackId !== null) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) globalThis.clearTimeout(timeoutId);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[12rem] overflow-hidden rounded-2xl p-4 transition-colors duration-200 md:max-w-[25rem] ${
        theme === "light"
          ? "border border-(--border) bg-white shadow-md"
          : "bg-[#0d0d0d]"
      }`}
    >
      <img
        src={theme === "light" ? brandIconDarkCaret : brandIcon}
        width="512"
        height="512"
        fetchPriority="high"
        alt="Team SEA-KERS caret above a single primary-blue arc"
        aria-hidden={isAnimated || undefined}
        className={`absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] transition-opacity duration-200 ${isAnimated ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Animated Team SEA-KERS caret above a primary-blue arc"
        aria-hidden={!isAnimated || undefined}
        className={`relative aspect-square h-auto w-full transition-opacity duration-200 ${isAnimated ? "opacity-100" : "opacity-0"}`}
      >
        Team SEA-KERS caret logo above one primary-blue arc.
      </canvas>
    </div>
  );
}