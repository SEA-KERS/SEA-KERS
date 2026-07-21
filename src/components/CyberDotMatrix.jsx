import React, { useEffect, useRef } from 'react';

export default function CyberDotMatrix() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = 650);
    const height = (canvas.height = 650);

    let particles = [];
    let time = 0;
    let mouse = { x: -1000, y: -1000, active: false };

    const img = new Image();
    img.src = '/logo-white.png';

    img.onload = () => {
      // Offscreen canvas for pixel sampling
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      const sampleSize = 140;
      offCanvas.width = sampleSize;
      offCanvas.height = sampleSize;

      offCtx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imgData = offCtx.getImageData(0, 0, sampleSize, sampleSize).data;

      // 1. First pass: find exact bounding box of the logo in the image
      let minX = sampleSize, maxX = 0, minY = sampleSize, maxY = 0;
      const rawPoints = [];

      for (let y = 0; y < sampleSize; y += 1) {
        for (let x = 0; x < sampleSize; x += 1) {
          const index = (y * sampleSize + x) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const a = imgData[index + 3];

          // Detect red logo pixels
          const isRedLogo = a > 50 && r > 130 && g < 100 && b < 100;

          if (isRedLogo) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            rawPoints.push({ x, y });
          }
        }
      }

      const logoW = maxX - minX || 1;
      const logoH = maxY - minY || 1;

      // Desired logo rendering box inside canvas (e.g. 520px)
      const renderSize = 520;
      const scale = renderSize / Math.max(logoW, logoH);
      const originX = (width - logoW * scale) / 2;
      const originY = (height - logoH * scale) / 2;

      particles = [];

      for (let i = 0; i < rawPoints.length; i++) {
        const pt = rawPoints[i];
        const targetX = originX + (pt.x - minX) * scale;
        const targetY = originY + (pt.y - minY) * scale;

        // Relative height in logo (0.0 = top apex, 1.0 = bottom legs)
        const relY = (pt.y - minY) / logoH;
        const isBottomLeg = relY > 0.45;
        const isDispersed = isBottomLeg && Math.random() > 0.35;

        particles.push({
          baseX: targetX,
          baseY: targetY,
          x: targetX + (isDispersed ? (Math.random() - 0.5) * 50 : 0),
          y: targetY + (isDispersed ? (Math.random() - 0.5) * 50 : 0),
          size: scale * 0.92,
          alpha: isDispersed ? 0.65 + Math.random() * 0.35 : 0.98,
          speed: 0.04 + Math.random() * 0.04,
          isBottomLeg,
          isDispersed,
          driftX: (Math.random() - 0.5) * (isBottomLeg ? 40 : 10),
          driftY: (Math.random() - 0.5) * (isBottomLeg ? 40 : 10),
          phase: Math.random() * Math.PI * 2
        });
      }

      render();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.035;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let targetX = p.baseX;
        let targetY = p.baseY;

        // Disassemble floating pixels on the bottom disintegrating legs
        if (p.isBottomLeg) {
          const factor = Math.sin(time * 1.5 + p.phase);
          targetX += Math.sin(time + p.phase) * p.driftX * (0.4 + factor * 0.6);
          targetY += Math.cos(time + p.phase) * p.driftY * (0.4 + factor * 0.6);
        } else {
          // Sharp apex peak energy pulse Jitter
          targetX += Math.sin(time * 3 + p.phase) * 0.9;
          targetY += Math.cos(time * 3 + p.phase) * 0.9;
        }

        // Mouse interaction dispersion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;

          if (dist < maxDist) {
            const angle = Math.atan2(dy, dx);
            const force = (maxDist - dist) / maxDist;
            targetX += Math.cos(angle) * force * 60;
            targetY += Math.sin(angle) * force * 60;
          }
        }

        // Smooth position interpolation
        p.x += (targetX - p.x) * p.speed;
        p.y += (targetY - p.y) * p.speed;

        // Opacity pulse
        const pulseAlpha = Math.sin(time * 2 + p.phase);
        const opacity = Math.min(1, Math.max(0.35, p.alpha + pulseAlpha * 0.2));

        // Draw rotated square pixel matching logo's diamond pixel geometry
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = '#da261c';
        ctx.globalAlpha = opacity;

        const half = p.size / 2;
        ctx.fillRect(-half, -half, p.size, p.size);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex justify-center lg:justify-end items-center w-full">
      <canvas
        ref={canvasRef}
        className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] cursor-pointer drop-shadow-[0_0_35px_rgba(218,38,28,0.45)] transition-all"
      />
    </div>
  );
}
