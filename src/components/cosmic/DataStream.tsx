"use client";

import { useRef, useEffect } from "react";

/**
 * Lignes de données qui coulent sur les bordures (effet "data stream").
 * Utilisé autour des cartes ou du hero.
 */
export default function DataStream({
  className = "",
  direction = "vertical",
}: {
  className?: string;
  direction?: "vertical" | "horizontal";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lineCount = 5;
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement("div");
      line.className = "absolute";
      if (direction === "horizontal") {
        line.style.width = "8rem";
        line.style.height = "1px";
        line.style.background =
          "linear-gradient(to right, transparent, #00ff88, transparent)";
        line.style.opacity = "0.6";
        line.style.animation = "data-stream 2s linear infinite";
        line.style.animationDelay = `${i * 0.2}s`;
      } else {
        line.style.width = "1px";
        line.style.height = "100%";
        line.style.background =
          "linear-gradient(to bottom, transparent, #00ff88, transparent)";
        line.style.opacity = "0.6";
        line.style.left = `${(i / (lineCount - 1)) * 100}%`;
        line.style.animation = "data-stream 2s linear infinite";
        line.style.animationDelay = `${i * 0.2}s`;
      }
      el.appendChild(line);
    }
    return () => {
      while (el.firstChild) el.removeChild(el.firstChild);
    };
  }, [direction]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
