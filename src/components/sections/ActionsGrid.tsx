"use client";

import { motion } from "framer-motion";
import HolographicCard from "@/components/cosmic/HolographicCard";
import { Heart, Users, Home, Sparkles } from "lucide-react";
import { TEXTS } from "@/lib/texts";

const actions = [
  {
    title: TEXTS.actions.items[0].title,
    description: TEXTS.actions.items[0].description,
    icon: Users,
    gradient: "from-iliyin-emerald to-iliyin-emerald-dark",
  },
  {
    title: TEXTS.actions.items[1].title,
    description: TEXTS.actions.items[1].description,
    icon: Heart,
    gradient: "from-iliyin-gold to-amber-600",
  },
  {
    title: TEXTS.actions.items[2].title,
    description: TEXTS.actions.items[2].description,
    icon: Home,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: TEXTS.actions.items[3].title,
    description: TEXTS.actions.items[3].description,
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
  },
];

/**
 * Grille d'actions : ton sobre, actions concrètes.
 */
export default function ActionsGrid() {
  return (
    <section
      id="actions"
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 pattern-oriental"
    >
      <motion.div
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-tight section-title uppercase">
          Nos <span className="shimmer-text">actions</span> concrètes
        </h2>
        <p className="font-montserrat text-white/90 text-lg leading-relaxed max-w-xl mx-auto font-medium">
          {TEXTS.actions.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {actions.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <HolographicCard className="h-full p-5 sm:p-6 md:p-7">
              <div
                className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${item.gradient} text-white mb-5 transition-transform duration-300 hover:scale-105 shadow-lg`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-iliyin-card-header mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="font-montserrat text-gray-600 text-sm leading-[1.65] font-medium">
                {item.description}
              </p>
            </HolographicCard>
          </motion.div>
        ))}
      </div>
      <p className="text-center font-montserrat text-lg text-white/80 italic mt-12 max-w-2xl mx-auto">
        {TEXTS.actions.conclusion}
      </p>
    </section>
  );
}
