import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "ILIYIN - Solidarité & Dignité",
  description:
    "Association humanitaire œuvrant pour l'entraide et la dignité de chacun, sans aucune distinction. Parrainage, aide alimentaire, soutien d'urgence, actions de terrain.",
  keywords: [
    "solidarité",
    "entraide",
    "aide humanitaire",
    "parrainage",
    "dons",
    "association",
    "ILIYIN",
    "dignité",
  ],
  authors: [{ name: "ILIYIN" }],
  creator: "ILIYIN",
  publisher: "ILIYIN",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "ILIYIN - Solidarité & Dignité",
    description:
      "Association humanitaire pour l'entraide et la dignité. Parrainage, aide alimentaire, actions de terrain.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a9d6f",
  width: "device-width",
  initialScale: 1,
};
