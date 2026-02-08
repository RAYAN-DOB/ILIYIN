"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Logo ILIYIN (or & branche) — détouré (mix-blend), style oriental.
 */
export default function OrbitalLogo({
  size = 200,
  showRings = false,
}: {
  size?: number;
  showRings?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center logo-detoure"
      style={{ width: size, height: size }}
    >
      {!imgError ? (
        <Image
          src="/logo-holographic.png"
          alt="ILIYIN"
          width={size - 24}
          height={size - 24}
          className="object-contain"
          priority
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-orbitron font-semibold text-iliyin-gold text-2xl md:text-4xl">
          ILIYIN
        </span>
      )}
    </div>
  );
}
