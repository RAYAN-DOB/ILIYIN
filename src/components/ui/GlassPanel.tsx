"use client";

import { motion } from "framer-motion";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  header?: boolean;
  headerTitle?: string;
}

/**
 * Panneau verre premium : blur, ombres, bandeau optionnel, effet brillance.
 */
export default function GlassPanel({
  children,
  className = "",
  hoverEffect = true,
  header = false,
  headerTitle,
}: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(45, 212, 160, 0.3)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`
        relative rounded-3xl overflow-hidden
        bg-white/95 backdrop-blur-xl
        border border-white/30
        shadow-xl shadow-black/10
        ${header ? "border-t-4 border-t-iliyin-emerald" : ""}
        ${className}
      `}
    >
      {header && (
        <div className="card-header-bar px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-iliyin-emerald rounded-full" />
            <span className="font-montserrat font-bold text-sm tracking-wider uppercase">
              {headerTitle ?? "ILIYIN - TRANSACTION SÉCURISÉE"}
            </span>
          </div>
        </div>
      )}

      <div className={header ? "p-4 sm:p-6" : "p-5 sm:p-6 md:p-8"}>{children}</div>

      {/* Effet de brillance */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden
      />
    </motion.div>
  );
}
