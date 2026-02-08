"use client";

import Link from "next/link";
import { playClick } from "@/lib/sound";

const baseClass =
  "relative overflow-hidden px-8 py-3.5 text-base font-montserrat transition-all duration-300 ease-out-smooth inline-flex items-center justify-center gap-2 rounded-2xl";

const variants = {
  primary:
    "bg-white text-iliyin-green-darker font-bold hover:bg-iliyin-off-white hover:shadow-lg active:scale-[0.98]",
  secondary:
    "border-2 border-white text-white font-semibold bg-transparent hover:bg-white/10",
  outline:
    "border-2 border-white text-white font-bold bg-transparent hover:border-iliyin-emerald hover:text-iliyin-emerald-light",
  ghost:
    "text-white border-2 border-white/50 font-medium hover:border-white hover:bg-white/5",
  emerald:
    "bg-gradient-to-r from-iliyin-emerald to-iliyin-emerald-dark text-white font-bold hover:shadow-lg hover:shadow-emerald-glow",
};

type Variant = keyof typeof variants;

/**
 * Bouton DA Projet Ramadan. Si `href` est fourni, rend un Link ; sinon un button.
 */
export default function CyberButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantClass = variants[variant] ?? variants.primary;
  const combinedClass = `${baseClass} ${variantClass} ${className}`.trim();

  if (href !== undefined) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={combinedClass}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={() => playClick()}
      >
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
      className={combinedClass}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
