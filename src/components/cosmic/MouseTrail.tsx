"use client";

import { useEffect } from "react";

/**
 * Traînée de particules colorées qui suit le curseur.
 * Couleurs : vert cyber, bleu, magenta, or.
 */
export function MouseTrail() {
  useEffect(() => {
    const trail: HTMLDivElement[] = [];
    const colors = ["#00ff88", "#3b82f6", "#ff00ff", "#ffd700"];

    for (let i = 0; i < 10; i++) {
      const dot = document.createElement("div");
      dot.className = "fixed w-2 h-2 rounded-full pointer-events-none z-[9999]";
      dot.style.backgroundColor = colors[i % colors.length];
      dot.style.opacity = "0";
      dot.style.transition = "opacity 0.3s ease";
      dot.style.boxShadow = `0 0 10px ${colors[i % colors.length]}`;
      document.body.appendChild(dot);
      trail.push(dot);
    }

    let index = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const dot = trail[index];
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.transform = "translate(-50%, -50%)";
      dot.style.opacity = "0.8";

      setTimeout(() => {
        dot.style.opacity = "0";
      }, 500);

      index = (index + 1) % trail.length;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trail.forEach((d) => d.remove());
    };
  }, []);

  return null;
}
