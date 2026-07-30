import React, { useEffect, useRef, useState } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
  particleColor?: string;
  particleSize?: number;
  hoverRadius?: number;
  particleDensity?: number;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export default function ParticleText({
  text,
  className = '',
  particleColor = '#E2E8F0',
  hoverRadius = 90,
  particleDensity = 3,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const initParticles = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = Math.max(rect.height, 120);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Offscreen canvas for sampling
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      // Calculate font size dynamically based on container width & text length
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      let baseFontSize = width / (text.length * 0.62);
      if (isMobile) {
        baseFontSize = Math.min(Math.max(baseFontSize, 32), 64);
      } else if (isTablet) {
        baseFontSize = Math.min(Math.max(baseFontSize, 56), 96);
      } else {
        baseFontSize = Math.min(Math.max(baseFontSize, 80), 130);
      }

      offCtx.font = `900 ${baseFontSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#ffffff';

      // Render text on offscreen canvas
      offCtx.fillText(text, width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const particles: Particle[] = [];

      // Step size based on density and screen size
      const step = isMobile ? Math.max(particleDensity, 3) : Math.max(particleDensity, 2);

      const colors = [particleColor, '#F1F5F9', '#CBD5E1', '#94A3B8'];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const randColor = colors[Math.floor(Math.random() * colors.length)];
            const size = isMobile ? (Math.random() * 0.8 + 0.8) : (Math.random() * 1.2 + 1.0);

            // Start with a slight explosion/fade-in offset
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;

            particles.push({
              x: x + offsetX,
              y: y + offsetY,
              originX: x,
              originY: y,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              size,
              color: randColor,
              alpha: 0.85 + Math.random() * 0.15,
            });
          }
        }
      }

      particlesRef.current = particles;
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    } else {
      initParticles();
    }

    // Event handlers for mouse & touch
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = touch.clientX - rect.left;
        mouseRef.current.y = touch.clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      const friction = 0.85;
      const spring = 0.08;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Idle floating motion
        const floatX = Math.sin(time + p.originY * 0.05) * 0.3;
        const floatY = Math.cos(time + p.originX * 0.05) * 0.3;

        // Distance from cursor/finger
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hoverRadius && mouse.active) {
          const force = (hoverRadius - dist) / hoverRadius;
          const angle = Math.atan2(dy, dx);
          const push = force * 12;

          p.vx -= Math.cos(angle) * push;
          p.vy -= Math.sin(angle) * push;
        }

        // Return to origin
        const homeDx = p.originX + floatX - p.x;
        const homeDy = p.originY + floatY - p.y;

        p.vx += homeDx * spring;
        p.vy += homeDy * spring;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      initParticles();
    });
    resizeObserver.observe(container);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [text, particleColor, hoverRadius, particleDensity]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center min-h-[120px] sm:min-h-[160px] md:min-h-[200px] select-none cursor-pointer ${className}`}
    >
      <canvas ref={canvasRef} className="block pointer-events-auto z-10" />
      {/* Hidden screen-reader text */}
      <span className="sr-only">{text}</span>
    </div>
  );
}
