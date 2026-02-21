"use client";

import { motion } from "framer-motion";

/**
 * Bloc SEO pour Google : texte riche avec "Association ILIYIN" pour le référencement.
 * Affiché juste sous le Hero pour maximiser l'indexation.
 */
export default function SEOBlock() {
  return (
    <motion.section
      className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-iliyin-green-deep/50 to-transparent"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="sr-only">Présentation Association ILIYIN</h2>
        <div className="font-montserrat text-white/90 space-y-4">
          <p className="text-base sm:text-lg leading-relaxed">
            <strong className="text-iliyin-emerald-light font-bold">Association ILIYIN</strong> est une association solidaire basée dans le{" "}
            <strong>Val-de-Marne (94)</strong>, active en <strong>Île-de-France</strong> et partout en France selon les urgences.
          </p>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Nos actions : <strong>parrainage de familles</strong>, <strong>aide alimentaire</strong>,{" "}
            <strong>maraudes</strong>, et <strong>soutien au logement</strong>. Aide concrète sans distinction d'origine ou de religion.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
