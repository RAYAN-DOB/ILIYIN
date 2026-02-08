"use client";

import { cn } from "@/lib/utils";

/**
 * Texte avec effet shimmer (déplacement de gradient).
 * Utilise la classe shimmer-text du CSS global.
 */
export default function ShimmerText({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={cn("shimmer-text font-orbitron font-bold", className)}>
      {children}
    </Tag>
  );
}
