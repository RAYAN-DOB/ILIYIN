"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Carte DA Projet Ramadan : fond clair, bords très arrondis, accent vert/doré au survol.
 */
export default function HolographicCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`group/card relative overflow-hidden rounded-3xl glass-panel border-gold-hover ${className}`}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(45, 212, 160, 0.2)",
      }}
      transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(45, 212, 160, 0.06) 50%, transparent 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
