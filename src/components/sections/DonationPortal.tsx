"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import CyberButton from "@/components/ui/CyberButton";
import { Coins, ShieldCheck, Check, CheckCircle2, Loader2 } from "lucide-react";
import { TEXTS } from "@/lib/texts";
import { SITE_CONFIG } from "@/lib/constants";

const inputClass =
  "w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3 font-montserrat text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-iliyin-emerald/50 focus:border-iliyin-emerald transition-all duration-300";

/**
 * Portail don — envoi vers /api/donation (amount, name?, email?, message?).
 */
export default function DonationPortal() {
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const presets = [5, 10, 25, 50, 100, 200];

  const handleSubmit = async () => {
    const num = parseFloat(amount);
    if (!Number.isFinite(num) || num <= 0) {
      setError("Indiquez un montant valide.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: num,
          currency: "EUR",
          email: email || undefined,
          name: name || undefined,
          message: message || undefined,
        }),
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
  };

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
          <div className="p-6">
          {sent ? (
            <div className="text-center py-6 px-4" role="status" aria-live="polite">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-iliyin-emerald/20 text-iliyin-emerald-dark mb-4">
                <CheckCircle2 className="w-8 h-8" aria-hidden />
              </div>
              <p className="font-montserrat font-bold text-iliyin-emerald-dark text-lg">
                Merci pour votre don
              </p>
              <p className="font-montserrat text-gray-600 text-sm mt-2">
                Nous vous recontacterons si besoin.
              </p>
              <a
                href={SITE_CONFIG.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-6 w-full sm:w-auto px-6 py-3 rounded-xl font-montserrat font-bold bg-gradient-to-r from-iliyin-emerald to-iliyin-emerald-dark text-white hover:shadow-lg transition-all"
              >
                Finaliser le don sur PayAsso →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mb-6">
                <p className="font-montserrat text-gray-700 mb-4">{TEXTS.donation.impact}</p>
                <ul className="font-montserrat text-gray-600 space-y-2 text-sm">
                  {TEXTS.donation.impacts.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-iliyin-emerald flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-2">Montant (€)</label>
                <div className="relative">
                  <motion.input
                    type="number"
                    min={1}
                    step={1}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className={`${inputClass} text-xl font-mono text-iliyin-emerald-dark`}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <Coins className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-iliyin-emerald pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {presets.map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => setAmount(String(value))}
                    className={`min-h-[44px] px-4 py-2 rounded-xl font-montserrat font-medium border-2 transition-all ${
                      amount === String(value)
                        ? "bg-iliyin-emerald/20 border-iliyin-emerald text-iliyin-emerald-dark"
                        : "border-gray-200 text-gray-700 hover:border-iliyin-emerald"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {value} €
                  </motion.button>
                ))}
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Nom (optionnel)</label>
                <motion.input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Votre nom"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Email (optionnel)</label>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="vous@exemple.fr"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              <div>
                <label className="block font-montserrat font-medium text-gray-700 mb-1 text-sm">Message (optionnel)</label>
                <motion.textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Un mot..."
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              {error && (
                <p className="font-montserrat text-red-600 text-sm font-medium py-2 px-3 rounded-lg bg-red-50 border border-red-200" role="alert">
                  {error}
                </p>
              )}
              <CyberButton
                className="w-full justify-center mt-4 min-h-[48px]"
                onClick={handleSubmit}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                    Envoi en cours...
                  </>
                ) : (
                  "Soutenir ILIYIN"
                )}
              </CyberButton>
            </div>
          )}

          {!sent && (
            <>
              <div className="mt-8 p-4 bg-iliyin-emerald/10 rounded-xl border border-iliyin-emerald/20">
                <p className="font-montserrat text-sm text-gray-700 text-center">
                  <span className="font-bold text-iliyin-emerald-dark">Transparence :</span>{" "}
                  Nous privilégions l&apos;aide directe et communiquons régulièrement sur l&apos;utilisation des fonds.
                </p>
              </div>
              <p className="mt-4 text-center text-gray-500 text-sm font-montserrat px-2">
                Paiement sécurisé. Reçu envoyé par email si fourni.
              </p>
            </>
          )}
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
