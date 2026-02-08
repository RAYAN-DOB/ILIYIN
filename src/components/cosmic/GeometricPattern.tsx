"use client";

import { useEffect, useRef } from "react";

/**
 * Motif géométrique islamique animé (SVG avec stroke-dasharray).
 * Octogone et étoiles en rotation subtile, couleurs cyber.
 */
export default function GeometricPattern() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path, line");
    let frame = 0;

    const animate = () => {
      frame += 0.5;
      paths.forEach((path, i) => {
        const length = (path as SVGPathElement).getTotalLength?.() ?? 100;
        const offset = (frame + i * 20) % (length * 2);
        path.setAttribute(
          "stroke-dasharray",
          `${length} ${length * 2}`
        );
        path.setAttribute("stroke-dashoffset", String(offset));
      });
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="patternGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#00ff88" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
      </defs>
      {/* Étoile 8 branches (motif islamique) */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 200 + 180 * Math.cos(angle);
        const y1 = 200 + 180 * Math.sin(angle);
        const x2 = 200 + 180 * Math.cos(angle + Math.PI);
        const y2 = 200 + 180 * Math.sin(angle + Math.PI);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#patternGrad)"
            strokeWidth="1"
            fill="none"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        );
      })}
      {/* Cercle central */}
      <circle
        cx="200"
        cy="200"
        r="60"
        stroke="url(#patternGrad)"
        strokeWidth="1"
        fill="none"
        style={{ strokeDasharray: "377", strokeDashoffset: "0" }}
      />
      <circle
        cx="200"
        cy="200"
        r="120"
        stroke="url(#patternGrad)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}
