import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../App';

interface AnimatedBackgroundProps {
  theme: ThemeMode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulseVal: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isLight = theme === 'clean-light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking state
    const mouse = {
      x: -2000,
      y: -2000,
      active: false,
      radius: 170, // Interaction radius
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      mouse.active = true;
      if ('touches' in e && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      } else if ('clientX' in e) {
        mouse.x = (e as MouseEvent).clientX;
        mouse.y = (e as MouseEvent).clientY;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    let resizeTimer: number;
    const handleResize = () => {
      if (!canvas) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Color palettes based on theme
    const getThemeColors = () => {
      if (isLight) {
        return {
          nodes: ['#0284c7', '#0369a1', '#6366f1', '#0ea5e9'],
          lineRgb: '14, 165, 233',
          mouseLineRgb: '2, 132, 199',
          maxDistance: 110,
          opacityMultiplier: 0.35,
        };
      }
      // deep-midnight
      return {
        nodes: ['#22d3ee', '#38bdf8', '#34d399', '#06b6d4'],
        lineRgb: '34, 211, 238',
        mouseLineRgb: '56, 189, 248',
        maxDistance: 120,
        opacityMultiplier: 0.45,
      };
    };

    let particles: Particle[] = [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initParticles = () => {
      particles = [];
      // Dynamic count based on viewport width: ~30 on desktop, ~16 on mobile for 60fps performance
      const count = width < 768 ? 16 : Math.min(Math.floor(width / 42), 32);
      const palette = getThemeColors();

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 1.2,
          color: palette.nodes[Math.floor(Math.random() * palette.nodes.length)],
          alpha: Math.random() * 0.5 + 0.3,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          pulseVal: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawAtom = (time: number, lineRgb: string, colors: string[]) => {
      const centerX = width * 0.78;
      const centerY = height * 0.74;
      const orbitWidth = Math.min(width * 0.15, 100);
      const orbitHeight = orbitWidth * 0.42;
      const phase = prefersReducedMotion ? 0 : time * 0.00045;
      const rotations = [0, Math.PI / 3, -Math.PI / 3];

      ctx.save();
      ctx.translate(centerX, centerY);

      rotations.forEach((rotation, index) => {
        ctx.save();
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, orbitWidth, orbitHeight, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${lineRgb}, ${isLight ? 0.16 : 0.14})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const direction = index === 1 ? -1 : 1;
        const angle = phase * direction + (index * Math.PI * 2) / 3;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * orbitWidth, Math.sin(angle) * orbitHeight, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = colors[index % colors.length];
        ctx.shadowColor = colors[index % colors.length];
        ctx.shadowBlur = 8;
        ctx.globalAlpha = isLight ? 0.7 : 0.85;
        ctx.fill();
        ctx.restore();
      });

      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = colors[0];
      ctx.shadowColor = colors[0];
      ctx.shadowBlur = 10;
      ctx.globalAlpha = isLight ? 0.5 : 0.65;
      ctx.fill();
      ctx.restore();
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const config = getThemeColors();
      drawAtom(performance.now(), config.lineRgb, config.nodes);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas edges smoothly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Breathing pulse
        p.pulseVal += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.15;

        // Mouse reaction (subtle push away if cursor is very close)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;

            // Draw interactive glowing filament to mouse
            const mouseAlpha = (1 - dist / mouse.radius) * 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${config.mouseLineRgb}, ${mouseAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.fill();

        // Connect nearby particles with subtle glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.maxDistance) {
            const lineAlpha = (1 - dist / config.maxDistance) * config.opacityMultiplier;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${config.lineRgb}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      if (!prefersReducedMotion && !document.hidden) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    // Pause when tab is not visible to conserve battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLight]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none transition-colors duration-700"
    >
      {/* 0. Software Engineering & Global Cloud Architecture Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70"
          alt="Abstract software engineering and distributed cloud network infrastructure"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover object-center scale-105 transition-all duration-1000 ${
            isLight
              ? 'opacity-[0.06] mix-blend-multiply filter contrast-125 grayscale'
              : 'opacity-[0.14] mix-blend-screen filter brightness-95 contrast-125'
          }`}
        />
        {/* Soft edge vignetting and gradient blending into canvas */}
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            isLight
              ? 'bg-linear-to-b from-slate-50/75 via-transparent to-slate-50/90'
              : 'bg-linear-to-b from-slate-950/65 via-transparent to-slate-950/85'
          }`}
        />
      </div>

      {/* 1. Animated Radial Dot Matrix Grid Overlay */}
      <div
        className="absolute inset-0 bg-dot-pattern transition-opacity duration-700"
        style={{
          opacity: isLight ? 0.38 : 0.25,
          backgroundImage: isLight
            ? 'radial-gradient(rgba(14, 165, 233, 0.20) 1.2px, transparent 1.2px)'
            : 'radial-gradient(rgba(56, 189, 248, 0.16) 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2. Cyber Data Streams / Horizontal Light Pulses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          className="absolute top-[22%] left-0 w-[40vw] h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-cyber-beam-1"
          style={{ opacity: isLight ? 0.25 : 0.4 }}
        />
        <div
          className="absolute top-[58%] left-0 w-[50vw] h-px bg-linear-to-r from-transparent via-indigo-400 to-transparent animate-cyber-beam-2"
          style={{ opacity: isLight ? 0.2 : 0.35 }}
        />
        <div
          className="absolute top-[84%] left-0 w-[35vw] h-px bg-linear-to-r from-transparent via-sky-400 to-transparent animate-cyber-beam-3"
          style={{ opacity: isLight ? 0.25 : 0.4 }}
        />
      </div>

      {/* 3. Floating Luminous Gradient Ambient Orbs */}
      <div className="relative w-full h-full">
        {/* Orb 1: Primary Top-Center Ambient Glow */}
        <div
          className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-212.5 h-137.5 rounded-full blur-[140px] opacity-80 animate-ambient-orb-1 transition-all duration-700"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(251, 191, 36, 0.20) 0%, rgba(56, 189, 248, 0.30) 40%, rgba(14, 165, 233, 0.14) 65%, transparent 75%)'
              : 'radial-gradient(circle, var(--ambient-1) 0%, transparent 70%)',
          }}
        />

        {/* Orb 2: Top-Right Sapphire / Indigo Floating Orb */}
        <div
          className="absolute top-[18%] right-[-5%] w-162.5 h-162.5 rounded-full blur-[160px] opacity-75 animate-ambient-orb-2 transition-all duration-700"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(129, 140, 248, 0.25) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 70%)'
              : 'radial-gradient(circle, var(--ambient-2) 0%, transparent 70%)',
          }}
        />

        {/* Orb 3: Mid-Left Cyan Floating Orb */}
        <div
          className="absolute top-[48%] left-[-8%] w-170 h-170 rounded-full blur-[170px] opacity-75 animate-ambient-orb-3 transition-all duration-700"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(45, 212, 191, 0.26) 0%, rgba(6, 182, 212, 0.14) 50%, transparent 70%)'
              : 'radial-gradient(circle, var(--ambient-3) 0%, transparent 70%)',
          }}
        />

        {/* Orb 4: Bottom-Right Violet Warm Accent Orb */}
        <div
          className="absolute bottom-[10%] right-[10%] w-150 h-150 rounded-full blur-[150px] opacity-70 animate-ambient-orb-4 transition-all duration-700"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(244, 114, 182, 0.18) 0%, rgba(192, 132, 252, 0.12) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)',
          }}
        />

        {/* Orb 5: Center subtle breathing aura */}
        <div
          className="absolute top-[35%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-[180px] opacity-50 animate-pulse-glow transition-all duration-700"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.20) 0%, transparent 70%)'
              : 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* 4. Interactive Constellation & Neural Mesh Canvas (High-Performance 60FPS) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};
