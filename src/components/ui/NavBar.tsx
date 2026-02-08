"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { NAV_ITEMS } from "@/lib/constants";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4"
      style={{
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(45, 212, 160, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink-0"
            onClick={handleLinkClick}
          >
            <div className="relative">
              <div
                className="absolute inset-0 bg-iliyin-emerald/20 rounded-full blur-lg group-hover:bg-iliyin-emerald/30 transition-all duration-300"
                aria-hidden
              />
              <div className="relative flex items-center gap-3">
                <Logo size="nav" />
                <span className="font-montserrat font-black text-lg sm:text-xl md:text-2xl text-white tracking-tighter truncate">
                  ILIYIN
                  <span className="block font-montserrat font-medium text-[10px] sm:text-xs text-iliyin-emerald-light tracking-widest">
                    SOLIDARITÉ
                  </span>
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation desktop : liens centrés, espacement homogène */}
          <nav
            className="hidden md:flex items-center justify-center flex-1 min-w-0"
            aria-label="Navigation principale"
          >
            <ul className="flex items-center justify-center gap-1 sm:gap-0 md:gap-2 lg:gap-3 xl:gap-4 flex-wrap">
              {NAV_ITEMS.filter((i) => i.label !== "Faire un don").map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-montserrat font-medium text-xs md:text-sm text-iliyin-off-white/90 hover:text-iliyin-emerald-light transition-colors duration-300 uppercase tracking-wider relative group block py-2.5 px-2 md:px-3 rounded-md hover:bg-white/5 whitespace-nowrap"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                    <span
                      className="absolute bottom-1 left-2 right-2 h-0.5 bg-iliyin-emerald scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-center"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Don : séparé à droite */}
          <div className="hidden md:block shrink-0">
            <Link
              href="/#donation"
              onClick={handleLinkClick}
              className="inline-flex items-center justify-center rounded-2xl font-montserrat font-bold text-sm px-4 py-2.5 md:px-5 md:py-2.5 bg-gradient-to-r from-iliyin-emerald to-iliyin-emerald-dark text-white hover:shadow-lg hover:shadow-emerald-glow transition-all whitespace-nowrap border-l border-iliyin-emerald/30 pl-4 md:pl-5 ml-2"
            >
              Faire un don
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-3 -mr-1 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-iliyin-emerald transition-colors duration-300"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <ul className="px-4 py-4 flex flex-col gap-0" role="list">
              {NAV_ITEMS.filter((i) => i.label !== "Faire un don").map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block font-montserrat font-medium text-white/90 hover:text-iliyin-emerald-light py-3.5 min-h-[44px] flex items-center transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 mt-1 border-t border-white/10">
                <Link
                  href="/#donation"
                  onClick={handleLinkClick}
                  className="block w-full text-center rounded-2xl font-montserrat font-bold py-3.5 px-4 bg-gradient-to-r from-iliyin-emerald to-iliyin-emerald-dark text-white min-h-[48px] flex items-center justify-center"
                >
                  Faire un don
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
