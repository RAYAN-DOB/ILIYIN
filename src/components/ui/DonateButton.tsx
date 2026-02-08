"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { playClick } from "@/lib/sound";

interface DonateButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DonateButton({
  href,
  children,
  className = "",
}: DonateButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playClick()}
        className={`
          inline-flex items-center justify-center gap-2 rounded-2xl font-montserrat font-bold text-lg px-8 py-4
          bg-white text-iliyin-green-darker
          hover:bg-iliyin-off-white hover:shadow-lg hover:shadow-iliyin-gold/20
          border border-iliyin-gold/30
          transition-all duration-300 ${className}
        `}
      >
        <Heart className="w-6 h-6 text-iliyin-gold" />
        {children}
      </Link>
    </motion.div>
  );
}
