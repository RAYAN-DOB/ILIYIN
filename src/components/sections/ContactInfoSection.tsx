"use client";

import { motion } from "framer-motion";
import { CONTACT_CONFIG } from "@/lib/constants";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import DonateButton from "@/components/ui/DonateButton";
import InstagramButton from "@/components/ui/InstagramButton";
import CopyButton from "@/components/ui/CopyButton";
import GlassPanel from "@/components/ui/GlassPanel";
import { Clock } from "lucide-react";

export default function ContactInfoSection() {
  const { page } = CONTACT_CONFIG;

  return (
    <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 pattern-oriental">
      <div className="max-w-3xl mx-auto w-full">
        {/* Titre */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 section-title uppercase">
            {page.title}
          </h1>
          <p className="font-montserrat text-iliyin-off-white/90 text-base sm:text-lg font-medium">
            {page.subtitle}
          </p>
        </motion.div>

        {/* Phrase inclusivité */}
        <motion.p
          className="text-center font-montserrat text-iliyin-emerald-light/95 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {page.inclusivity}
        </motion.p>

        {/* Numéro + badge + copier */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <p className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-2">
            {CONTACT_CONFIG.phone}
          </p>
          <span className="inline-block font-montserrat font-medium text-xs uppercase tracking-widest text-iliyin-gold border border-iliyin-gold/50 rounded-lg px-3 py-1.5 mb-4">
            {page.badgeSmsWhatsapp}
          </span>
          <div className="flex justify-center">
            <CopyButton
              value={CONTACT_CONFIG.copyValue}
              label="Copier le numéro"
              size="md"
            />
          </div>
        </motion.div>

        {/* 3 boutons premium */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-10 sm:mb-14 w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <WhatsAppButton href={CONTACT_CONFIG.whatsappUrl} className="w-full sm:w-auto justify-center min-h-[48px]">
            Ouvrir WhatsApp
          </WhatsAppButton>
          <DonateButton href={CONTACT_CONFIG.donateUrl} className="w-full sm:w-auto justify-center min-h-[48px]">
            Faire un don
          </DonateButton>
          <InstagramButton href={CONTACT_CONFIG.instagramUrl} className="w-full sm:w-auto justify-center min-h-[48px]">
            Voir Instagram
          </InstagramButton>
        </motion.div>

        {/* Mini phrase don */}
        <motion.p
          className="text-center font-montserrat text-iliyin-off-white/80 text-sm md:text-base mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {page.donatePhrase}
        </motion.p>

        {/* Carte Horaires / Disponibilités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <GlassPanel hoverEffect={false} className="rounded-2xl">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-iliyin-gold/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-iliyin-gold" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-iliyin-card-header text-lg mb-1">
                  {page.availabilityTitle}
                </h3>
                <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
                  {page.availabilityText}
                </p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Infos officielles (texte discret) */}
        <motion.div
          className="mt-12 text-center font-montserrat text-iliyin-off-white/50 text-xs md:text-sm space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <p>{CONTACT_CONFIG.associationName}</p>
          <p>{CONTACT_CONFIG.zone}</p>
          <p>{CONTACT_CONFIG.contactNotice}</p>
        </motion.div>
      </div>
    </section>
  );
}
