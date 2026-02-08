"use client";

import Link from "next/link";
import { SITE_CONFIG, CONTACT_CONFIG } from "@/lib/constants";
import { TEXTS } from "@/lib/texts";
import { Instagram, MessageCircle, Heart, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const waHref = CONTACT_CONFIG.whatsappUrl;
  const igHref = CONTACT_CONFIG.instagramUrl;
  const donateHref = CONTACT_CONFIG.donateUrl;

  return (
    <footer className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-iliyin-black">
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-iliyin-emerald/60 to-transparent"
        aria-hidden
      />
      <div className="max-w-6xl mx-auto">
        {/* Logo et baseline */}
        <div className="mb-10 sm:mb-12 text-center">
          <span className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl text-white">
            {SITE_CONFIG.name}
          </span>
          <p className="font-montserrat text-iliyin-emerald-light text-xs sm:text-sm tracking-widest mt-2">
            {TEXTS.footer.tagline}
          </p>
        </div>

        {/* 3 colonnes */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12 text-left">
          <div>
            <h4 className="font-montserrat font-bold text-white mb-4 text-lg">
              {TEXTS.footer.missionTitle}
            </h4>
            <p className="font-montserrat text-iliyin-off-white/80 text-sm leading-relaxed">
              {TEXTS.footer.missionText}
            </p>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-white mb-4 text-lg">
              {TEXTS.footer.contactTitle}
            </h4>
            <div className="space-y-3 font-montserrat text-iliyin-off-white/80 text-sm">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-iliyin-emerald-light transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                WhatsApp : {SITE_CONFIG.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-iliyin-emerald-light transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {SITE_CONFIG.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {SITE_CONFIG.address}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-white mb-4 text-lg">
              {TEXTS.footer.transparencyTitle}
            </h4>
            <p className="font-montserrat text-iliyin-off-white/80 text-sm leading-relaxed">
              {TEXTS.footer.transparencyText}
            </p>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-montserrat text-sm mb-8">
          <Link
            href="/contact"
            className="text-iliyin-off-white/80 hover:text-iliyin-emerald-light transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-iliyin-off-white/80 hover:text-iliyin-emerald-light transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={donateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-iliyin-off-white/80 hover:text-iliyin-emerald-light transition-colors flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Faire un don
          </a>
          <a
            href={igHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-iliyin-off-white/80 hover:text-iliyin-emerald-light transition-colors flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        </div>

        <div className="pt-8 sm:pt-10 border-t border-iliyin-emerald/20">
          <p className="font-montserrat text-sm text-iliyin-off-white/60 text-center">
            © {new Date().getFullYear()} {TEXTS.footer.copyright}
          </p>
          <p className="font-montserrat text-xs text-iliyin-off-white/40 mt-2 text-center">
            {TEXTS.footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
