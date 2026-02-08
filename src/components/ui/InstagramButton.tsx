"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { playClick } from "@/lib/sound";

interface InstagramButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function InstagramButton({
  href,
  children,
  className = "",
}: InstagramButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playClick()}
        className={`
          inline-flex items-center justify-center gap-2 rounded-2xl font-montserrat font-bold text-lg px-8 py-4
          border-2 border-white text-white
          hover:border-iliyin-emerald hover:text-iliyin-emerald-light hover:bg-white/5
          transition-all duration-300 ${className}
        `}
      >
        <Instagram className="w-6 h-6" />
        {children}
      </Link>
    </motion.div>
  );
}
