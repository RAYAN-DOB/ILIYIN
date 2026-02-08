"use client";

import { useRef, useEffect } from "react";

const CHARS = "01アイウエオカキクケコｱｲｳｴｵ";

function getColumns(): number {
  if (typeof window === "undefined") return 30;
  return window.innerWidth < 768 ? 20 : 40;
}

/**
 * Effet "Matrix rain" — colonnes de caractères qui tombent (style terminal).
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const columns = getColumns();
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

    let frame = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontSize = 14;
      ctx.font = `${fontSize}px monospace`;

      const columnWidth = canvas.width / columns;
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(frame * 0.1 + i) % CHARS.length];
        const x = i * columnWidth;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "rgba(0, 255, 136, 0.15)";
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += 0.5;
        }
      }
      frame++;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      aria-hidden
    />
  );
}
