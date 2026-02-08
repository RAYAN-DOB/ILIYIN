"use client";

import { useRef, useEffect } from "react";

const PARTICLE_COUNT = 1200;
const COLORS = ["#00ff88", "#3b82f6", "#ff00ff", "#ffd700"];

/**
 * Fond de particules en Canvas 2D (sans Three.js/R3F) pour éviter
 * l'erreur ReactCurrentOwner avec React 19.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    };

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let frame = 0;
    const animate = () => {
      if (!canvas.parentElement) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = frame * 0.01;
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.x * 0.01) * 0.2;
        p.y += p.vy + Math.cos(time + p.y * 0.01) * 0.2;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = (p.x + canvas.width) % canvas.width;
        p.y = (p.y + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.7 + 0.3 * Math.sin(time + p.x * 0.02));
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      frame++;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-space-black pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      />
    </div>
  );
}
