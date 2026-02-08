"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import CyberButton from "@/components/ui/CyberButton";
import { Send, CheckCircle2, Loader2, Phone, Mail, MapPin } from "lucide-react";
import { TEXTS } from "@/lib/texts";
import { SITE_CONFIG } from "@/lib/constants";

const inputClass =
  "w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3 font-montserrat text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-iliyin-emerald/50 focus:border-iliyin-emerald transition-all duration-300";

/**
 * Section Contact — formulaire ContactMessage (name, email?, phone, city, message).
 */
export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 pattern-oriental">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 section-title uppercase">
          Contactez<span className="shimmer-text">-nous</span>
        </h2>
        <p className="font-montserrat text-white/90 text-lg font-medium mb-10">
          {TEXTS.contact.description}
        </p>
      </motion.div>

      {/* Coordonnées */}
      <motion.div
        className="max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/95 rounded-2xl p-6 text-center glass-panel-light">
            <Phone className="w-8 h-8 text-iliyin-emerald mx-auto mb-4" />
            <h3 className="font-montserrat font-bold text-gray-800 mb-2">{TEXTS.contact.phoneLabel}</h3>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="font-montserrat text-lg text-gray-700 hover:text-iliyin-emerald-dark transition-colors"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <p className="font-montserrat text-sm text-gray-500 mt-2">{TEXTS.contact.phoneNote}</p>
          </div>
          <div className="bg-white/95 rounded-2xl p-6 text-center glass-panel-light">
            <Mail className="w-8 h-8 text-iliyin-emerald mx-auto mb-4" />
            <h3 className="font-montserrat font-bold text-gray-800 mb-2">{TEXTS.contact.emailLabel}</h3>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-montserrat text-lg text-gray-700 hover:text-iliyin-emerald-dark transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
            <p className="font-montserrat text-sm text-gray-500 mt-2">{TEXTS.contact.emailNote}</p>
          </div>
          <div className="bg-white/95 rounded-2xl p-6 text-center glass-panel-light">
            <MapPin className="w-8 h-8 text-iliyin-emerald mx-auto mb-4" />
            <h3 className="font-montserrat font-bold text-gray-800 mb-2">{TEXTS.contact.zoneLabel}</h3>
            <p className="font-montserrat text-lg text-gray-700">{TEXTS.contact.zoneValue}</p>
            <p className="font-montserrat text-sm text-gray-500 mt-2">{TEXTS.contact.zoneNote}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <GlassPanel>
          {sent ? (
            <div className="text-center py-6 px-4" role="status" aria-live="polite">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-iliyin-emerald/20 text-iliyin-emerald-dark mb-4">
                <CheckCircle2 className="w-8 h-8" aria-hidden />
              </div>
              <p className="font-montserrat font-bold text-iliyin-emerald-dark text-lg">
                Message envoyé
              </p>
              <p className="font-montserrat text-gray-600 text-sm mt-2">
                Nous vous recontacterons rapidement.
              </p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                const form = e.currentTarget;
                const data = {
                  name: (form.querySelector('[name="name"]') as HTMLInputElement).value,
                  email: (form.querySelector('[name="email"]') as HTMLInputElement).value,
                  phone: (form.querySelector('[name="phone"]') as HTMLInputElement).value,
                  city: (form.querySelector('[name="city"]') as HTMLInputElement).value,
                  message: (form.querySelector('[name="message"]') as HTMLTextAreaElement).value,
                };
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  const json = await res.json().catch(() => ({}));
                  if (!res.ok) {
                    setError(json.error || "Erreur lors de l'envoi");
                    return;
                  }
                  setSent(true);
                } catch {
                  setError("Erreur réseau. Réessayez.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Nom</label>
                <motion.input name="name" type="text" required className={inputClass} placeholder="Votre nom" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Email</label>
                <motion.input name="email" type="email" className={inputClass} placeholder="vous@exemple.fr" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Téléphone</label>
                <motion.input name="phone" type="tel" required className={inputClass} placeholder="06 12 34 56 78" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Ville</label>
                <motion.input name="city" type="text" required className={inputClass} placeholder="Ville" whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Message</label>
                <motion.textarea name="message" required rows={4} className={`${inputClass} resize-none`} placeholder="Votre message..." whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} />
              </div>
              {error && (
                <p className="font-montserrat text-red-600 text-sm font-medium py-2 px-3 rounded-lg bg-red-50 border border-red-200" role="alert">
                  {error}
                </p>
              )}
              <CyberButton type="submit" className="w-full justify-center gap-2 min-h-[48px]" disabled={loading} aria-busy={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden />
                    Envoyer
                  </>
                )}
              </CyberButton>
            </form>
          )}
        </GlassPanel>
      </motion.div>
    </section>
  );
}
