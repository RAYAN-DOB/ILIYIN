"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CyberButton from "@/components/ui/CyberButton";
import Logo from "@/components/ui/Logo";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { TEXTS } from "@/lib/texts";

/**
 * Hero : ton sobre, universel, solidarité & dignité. Parallax au scroll.
 */
export default function HeroMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.6, 1], ["0%", "0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.95], [1, 1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-screen min-h-screen-safe flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Dégradé d'overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(45, 212, 160, 0.2) 0%, transparent 40%, rgba(6, 32, 16, 0.8) 100%)",
        }}
      />
      <div className="curve-shape curve-shape-strong" aria-hidden />
      <div
        className="absolute right-0 top-0 w-[70%] h-[140%] rounded-[50%_0_0_50%] opacity-10 pointer-events-none z-0"
        style={{
          background: "linear-gradient(135deg, #2dd4a0 0%, transparent 70%)",
          transform: "translate(20%, -15%) scale(1.1)",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* Logo avec effet premium */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Logo size="hero" priority className="drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]" />
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          className="font-montserrat font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-4 sm:mb-6 tracking-tighter break-words"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {TEXTS.hero.title}
          <span className="block font-montserrat font-bold text-lg sm:text-xl md:text-2xl text-iliyin-emerald-light mt-3 sm:mt-4 tracking-widest">
            {TEXTS.hero.subtitle}
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="font-montserrat font-medium text-base sm:text-lg md:text-xl text-iliyin-off-white/90 mb-4 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {TEXTS.hero.description}
          <span className="block text-iliyin-emerald-light mt-2">
            {TEXTS.hero.actions}
          </span>
        </motion.p>
        <motion.span
          className="block mb-8 sm:mb-10 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          aria-hidden
        />

        {/* Boutons CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <CyberButton
            href={SITE_CONFIG.donateUrl}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-bold bg-white text-iliyin-green-darker hover:bg-iliyin-off-white hover:scale-105 transition-transform min-h-[48px]"
          >
            Faire un don
          </CyberButton>
          <CyberButton
            href={SITE_CONFIG.social.whatsapp}
            variant="outline"
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-bold border-2 border-white text-white hover:border-iliyin-emerald hover:text-iliyin-emerald-light min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </CyberButton>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-iliyin-emerald/30 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="font-montserrat text-xs sm:text-sm text-iliyin-off-white/80 tracking-wider uppercase max-w-md mx-auto leading-snug">
            <span className="text-iliyin-emerald-light font-bold">✓</span>{" "}
            {TEXTS.hero.trust}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
