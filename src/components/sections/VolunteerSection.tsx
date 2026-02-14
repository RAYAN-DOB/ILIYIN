"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import CyberButton from "@/components/ui/CyberButton";
import { HandHelping, CheckCircle2, Loader2 } from "lucide-react";
import { TEXTS } from "@/lib/texts";

const inputClass =
  "w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3 font-montserrat text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-iliyin-emerald/50 focus:border-iliyin-emerald transition-all duration-300";

/**
 * Section Bénévoles — formulaire VolunteerSignup → POST /api/volunteer.
 */
export default function VolunteerSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <section id="volunteer" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 pattern-oriental">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 section-title uppercase">
          Rejoignez <span className="shimmer-text">notre équipe</span>
        </h2>
        <p className="font-montserrat text-white/90 font-medium text-lg">
          {TEXTS.volunteer.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <GlassPanel>
          {sent ? (
            <div className="p-6 bg-iliyin-emerald/10 rounded-2xl border border-iliyin-emerald/30 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-iliyin-emerald-dark" />
                <h3 className="font-montserrat font-bold text-xl text-iliyin-emerald-dark">
                  {TEXTS.volunteer.successTitle}
                </h3>
              </div>
              <p className="font-montserrat text-gray-700">
                {TEXTS.volunteer.successText}
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
                  availability: (form.querySelector('[name="availability"]') as HTMLInputElement).value,
                  message: (form.querySelector('[name="message"]') as HTMLTextAreaElement).value,
                };
                try {
                  const res = await fetch("/api/volunteer", {
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
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Nom complet</label>
                <input name="name" type="text" required className={inputClass} placeholder="Votre nom et prénom" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Email</label>
                <input name="email" type="email" required className={inputClass} placeholder="email@exemple.fr" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Téléphone</label>
                <input name="phone" type="tel" required className={inputClass} placeholder="06 12 34 56 78" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Ville / Secteur</label>
                <input name="city" type="text" required className={inputClass} placeholder="Ville ou département" />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Disponibilités</label>
                <input
                  name="availability"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Ex: week-ends, soirées, jours spécifiques..."
                />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Message (optionnel)</label>
                <textarea name="message" rows={3} className={`${inputClass} resize-none`} placeholder="Vos compétences, motivations ou questions..." />
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
                    <HandHelping className="w-5 h-5" aria-hidden />
                    M&apos;inscrire comme bénévole
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
