"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollReveal3DProps {
  children: ReactNode;
  className?: string;
}

/**
 * Révélation au scroll sobre : fade-in + léger décalage vertical, sans 3D agressive.
 */
export default function ScrollReveal3D({
  children,
  className = "",
}: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 28 }
      }
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
