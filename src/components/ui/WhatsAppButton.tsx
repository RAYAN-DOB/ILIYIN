"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { playClick } from "@/lib/sound";

interface WhatsAppButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
}

export default function WhatsAppButton({
  href,
  children,
  className = "",
  variant = "primary",
}: WhatsAppButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-montserrat font-bold text-lg px-8 py-4 transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-[#25D366] text-white hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/30"
      : "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10";

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playClick()}
        className={`${base} ${styles} ${className}`}
      >
        <MessageCircle className="w-6 h-6" />
        {children}
      </Link>
    </motion.div>
  );
}
