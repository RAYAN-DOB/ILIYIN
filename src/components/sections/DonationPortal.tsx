"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import CyberButton from "@/components/ui/CyberButton";
import { Coins, ShieldCheck } from "lucide-react";
import { TEXTS } from "@/lib/texts";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Portail don — redirection directe vers PayAsso, sans formulaire.
 */
export default function DonationPortal() {
  return (
    <section id="donation" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 pattern-oriental">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 section-title uppercase">
          Soutenez <span className="shimmer-text">nos actions</span>
        </h2>
        <p className="font-montserrat text-white/90 text-lg font-medium">
          {TEXTS.donation.description}
        </p>
      </motion.div>

      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <GlassPanel className="relative overflow-hidden rounded-2.5xl p-0">
          <div className="card-header-bar flex items-center gap-2 px-6 py-3 rounded-t-2xl">
            <ShieldCheck className="w-5 h-5 text-iliyin-emerald" />
            <span className="font-montserrat font-bold text-sm tracking-wider uppercase">
              {TEXTS.donation.security}
            </span>
          </div>
          <div className="p-8 sm:p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-iliyin-emerald/20 text-iliyin-emerald-dark mb-6">
              <Coins className="w-8 h-8" aria-hidden />
            </div>
            <p className="font-montserrat text-gray-700 mb-6">
              {TEXTS.donation.impact}
            </p>
            <CyberButton
              href={SITE_CONFIG.donateUrl}
              variant="emerald"
              className="w-full sm:w-auto min-h-[52px] px-10 py-4 text-lg"
            >
              Faire un don sur PayAsso →
            </CyberButton>
            <p className="mt-6 text-gray-500 text-sm font-montserrat">
              Paiement sécurisé. Vous serez redirigé vers la page officielle PayAsso.
            </p>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
