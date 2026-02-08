"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { playClick } from "@/lib/sound";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CopyButton({
  value,
  label = "Copier",
  className = "",
  size = "md",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    playClick();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const sizeClass =
    size === "sm" ? "p-2" : size === "lg" ? "p-3.5" : "p-2.5";
  const iconSize = size === "sm" ? 16 : size === "lg" ? 22 : 18;

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 rounded-xl font-montserrat font-medium
        border border-iliyin-gold/50 text-iliyin-gold
        hover:border-iliyin-gold hover:bg-iliyin-gold/10
        transition-all duration-300 ${sizeClass} ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {copied ? (
        <>
          <Check className="flex-shrink-0 text-iliyin-emerald" size={iconSize} />
          <span className="text-iliyin-emerald">Copié</span>
        </>
      ) : (
        <>
          <Copy className="flex-shrink-0" size={iconSize} />
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
}
