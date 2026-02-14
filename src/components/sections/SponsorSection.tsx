"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import CyberButton from "@/components/ui/CyberButton";
import { Heart, MessageCircle, ArrowRight } from "lucide-react";
import { TEXTS } from "@/lib/texts";
import { CONTACT_CONFIG } from "@/lib/constants";

const inputClass =
  "w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3 font-montserrat text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-iliyin-emerald/50 focus:border-iliyin-emerald transition-all duration-300";

/**
 * Section Parrainage — formulaire SponsorshipRequest (option 1 ou 2) → POST /api/sponsor.
 */
export default function SponsorSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState<1 | 2>(1);

  return (
    <section id="sponsor" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 pattern-oriental">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 section-title uppercase">
          Parrainez <span className="shimmer-text">une famille</span>
        </h2>
        <p className="font-montserrat text-white/90 font-medium text-lg">
          {TEXTS.sponsor.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        {/* Options parrainage */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-iliyin-emerald/20 flex items-center justify-center flex-shrink-0">
              <span className="font-montserrat font-bold text-iliyin-emerald-dark">1</span>
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                {TEXTS.sponsor.option1Title}
              </h3>
              <p className="font-montserrat text-white/90 text-sm">
                {TEXTS.sponsor.option1Text}{" "}
                <span className="block text-iliyin-emerald-light font-medium mt-2">
                  {TEXTS.sponsor.option1Tag}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-iliyin-gold/20 flex items-center justify-center flex-shrink-0">
              <span className="font-montserrat font-bold text-amber-200">2</span>
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-lg text-white mb-2">
                {TEXTS.sponsor.option2Title}
              </h3>
              <p className="font-montserrat text-white/90 text-sm">
                {TEXTS.sponsor.option2Text}{" "}
                <span className="block text-iliyin-gold font-medium mt-2">
                  {TEXTS.sponsor.option2Tag}
                </span>
              </p>
            </div>
          </div>
        </div>

        <GlassPanel>
          {sent ? (
            <div className="p-6 text-center">
              <p className="font-montserrat font-bold text-iliyin-emerald-dark text-lg mb-2">
                Demande enregistrée
              </p>
              <p className="font-montserrat text-gray-600 text-sm">
                Nous vous recontacterons pour finaliser le parrainage.
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
                  fullName: (form.querySelector('[name="fullName"]') as HTMLInputElement).value,
                  email: (form.querySelector('[name="email"]') as HTMLInputElement).value,
                  phone: (form.querySelector('[name="phone"]') as HTMLInputElement).value,
                  city: (form.querySelector('[name="city"]') as HTMLInputElement).value,
                  option,
                  budget: (form.querySelector('[name="budget"]') as HTMLInputElement).value,
                  notes: (form.querySelector('[name="notes"]') as HTMLTextAreaElement).value,
                };
                try {
                  const res = await fetch("/api/sponsor", {
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
                <label className="block font-montserrat font-medium text-gray-700 mb-2">Type de parrainage</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="option"
                      checked={option === 1}
                      onChange={() => setOption(1)}
                      className="accent-iliyin-emerald"
                    />
                    <span className="font-montserrat text-gray-700">Don financier direct</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="option"
                      checked={option === 2}
                      onChange={() => setOption(2)}
                      className="accent-iliyin-emerald"
                    />
                    <span className="font-montserrat text-gray-700">Course solidaire</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Nom complet</label>
                <input name="fullName" type="text" required className={inputClass} placeholder="Nom complet" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Email</label>
                <input name="email" type="email" required className={inputClass} placeholder="vous@exemple.fr" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Téléphone</label>
                <input name="phone" type="tel" required className={inputClass} placeholder="06 12 34 56 78" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Ville</label>
                <input name="city" type="text" required className={inputClass} placeholder="Ville" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Budget (optionnel)</label>
                <input name="budget" type="text" className={inputClass} placeholder="ex: 50 €/mois" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Notes (optionnel)</label>
                <textarea name="notes" rows={3} className={`${inputClass} resize-none`} placeholder="Précisions..." />
              </div>
              {error && (
                <p className="font-montserrat text-red-600 text-sm font-medium py-2 px-3 rounded-lg bg-red-50 border border-red-200" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-6 p-4 bg-iliyin-emerald/10 rounded-xl border border-iliyin-emerald/20">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-iliyin-emerald-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-montserrat font-medium text-gray-800 text-sm">
                      {TEXTS.sponsor.whatsappBanner}
                    </p>
                    <a
                      href={CONTACT_CONFIG.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-montserrat font-bold text-iliyin-emerald-dark hover:text-iliyin-emerald text-sm inline-flex items-center gap-1 mt-1"
                    >
                      {TEXTS.sponsor.whatsappCta}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
              <CyberButton type="submit" className="w-full justify-center gap-2 mt-4 min-h-[48px]" disabled={loading}>
                <Heart className="w-5 h-5" />
                {loading ? "Envoi en cours..." : "Envoyer ma demande"}
              </CyberButton>
            </form>
          )}
        </GlassPanel>
      </motion.div>
    </section>
  );
}
