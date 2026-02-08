"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/constants";

export default function FloatingWhatsAppButton() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 safe-bottom safe-right"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <Link
        href={CONTACT_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ouvrir WhatsApp"
        className="
          flex items-center justify-center w-14 h-14 min-w-[56px] min-h-[56px] rounded-full
          bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40
          hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/50
          hover:scale-110 active:scale-95
          transition-all duration-300
        "
      >
        <MessageCircle className="w-7 h-7" />
      </Link>
    </motion.div>
  );
}
