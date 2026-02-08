"use client";

import Image from "next/image";

/**
 * Logo ILIYIN avec rendu "détouré" : fond noir du PNG fusionné au fond de la page (mix-blend-mode).
 * Pour un vrai PNG transparent, remplacer public/logo-holographic.png par une version détourée.
 */
export default function Logo({
  className = "",
  width = 220,
  height = 100,
  priority = false,
  size = "hero", // "hero" | "nav"
}: {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  size?: "hero" | "nav";
}) {
  const isNav = size === "nav";
  const w = isNav ? 40 : width;
  const h = isNav ? 40 : height;

  return (
    <span className={`logo-detoure inline-block ${className}`}>
      <Image
        src="/logo-holographic.png"
        alt="ILIYIN"
        width={w}
        height={h}
        className={`object-contain object-center ${isNav ? "h-10 w-10" : "w-[200px] md:w-[280px] h-auto"}`}
        priority={priority}
        unoptimized
      />
    </span>
  );
}
