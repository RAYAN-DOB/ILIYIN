"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import { Check } from "lucide-react";
import { TEXTS } from "@/lib/texts";

/**
 * Section À propos — engagement, vision, principes. Ton sobre et universel.
 */
export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 pattern-oriental">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 section-title uppercase">
          Notre <span className="shimmer-text">engagement</span>
        </h2>
        <p className="font-montserrat text-white/90 text-lg font-medium">
          {TEXTS.about.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <GlassPanel className="text-center px-6 sm:px-8 py-8 sm:py-10">
          <p className="font-montserrat text-gray-800 font-medium leading-[1.75] text-lg">
            Fondée sur des{" "}
            <strong className="text-iliyin-emerald-dark">valeurs humanistes universelles</strong>,{" "}
            l&apos;association ILIYIN agit avec discrétion et respect pour venir en aide aux personnes en situation de précarité.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-10 text-left">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-iliyin-emerald rounded-full flex-shrink-0" />
                <h3 className="font-montserrat font-bold text-xl text-gray-800">
                  {TEXTS.about.visionTitle}
                </h3>
              </div>
              <p className="font-montserrat text-gray-600">{TEXTS.about.visionText}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-iliyin-gold rounded-full flex-shrink-0" />
                <h3 className="font-montserrat font-bold text-xl text-gray-800">
                  {TEXTS.about.principlesTitle}
                </h3>
              </div>
              <ul className="font-montserrat text-gray-600 space-y-2">
                {TEXTS.about.principlesList.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-iliyin-emerald flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="font-montserrat text-gray-700 italic">
              &quot;{TEXTS.about.quote}&quot;
            </p>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
