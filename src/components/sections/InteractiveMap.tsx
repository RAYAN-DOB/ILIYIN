"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

// Fontenay-sous-Bois — siège de l'association
const FONTENAY_LAT = 48.8514;
const FONTENAY_LON = 2.4731;
// Bbox serrée autour de Fontenay pour une carte esthétique
const BBOX = "2.35,48.80,2.60,48.90";
const OSM_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${FONTENAY_LAT},${FONTENAY_LON}`;

export default function InteractiveMap() {
  return (
    <div className="relative py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-3">
            Notre <span className="shimmer-text">siège</span>
          </h3>
          <p className="font-montserrat text-white/80 text-sm md:text-base">
            Fontenay-sous-Bois (94) — Île-de-France
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden border border-iliyin-emerald/30 shadow-2xl shadow-iliyin-emerald/10 bg-iliyin-green-dark/50"
        >
          <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl ring-1 ring-inset ring-white/10" aria-hidden />
          <iframe
            title="Siège ILIYIN - Fontenay-sous-Bois"
            src={OSM_EMBED_URL}
            className="w-full h-[280px] sm:h-[340px] md:h-[380px] block"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin"
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-iliyin-emerald/30">
              <MapPin className="w-5 h-5 text-iliyin-emerald flex-shrink-0" />
              <span className="font-montserrat font-semibold text-sm">Siège — Fontenay-sous-Bois (94)</span>
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${FONTENAY_LAT}&mlon=${FONTENAY_LON}&zoom=14`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-montserrat text-white/90 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors border border-white/20"
            >
              Agrandir
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
