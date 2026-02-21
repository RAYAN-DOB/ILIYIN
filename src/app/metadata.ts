import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Association ILIYIN | Solidarité & Parrainage (94) - Île-de-France",
  description:
    "Association ILIYIN (94) : parrainage de familles, aide alimentaire, maraudes et soutien au logement. Aide concrète en Île-de-France et partout en France. Association solidaire sans distinction.",
  keywords: [
    "Association ILIYIN",
    "ILIYIN",
    "association solidarité 94",
    "association Fontenay-sous-Bois",
    "parrainage famille",
    "aide alimentaire",
    "maraudes",
    "entraide",
    "soutien logement",
    "Île-de-France",
    "Val-de-Marne",
    "association humanitaire",
  ],
  authors: [{ name: "Association ILIYIN" }],
  creator: "Association ILIYIN",
  publisher: "Association ILIYIN",
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
    title: "Association ILIYIN | Solidarité & Parrainage (94)",
    description:
      "Association ILIYIN : parrainage de familles, aide alimentaire, maraudes et soutien au logement en Île-de-France. Aide concrète sans distinction.",
    url: "https://association-iliyin.fr",
    siteName: "Association ILIYIN",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Association ILIYIN - Solidarité & Dignité",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Association ILIYIN | Solidarité & Parrainage (94)",
    description:
      "Association ILIYIN : parrainage, aide alimentaire, maraudes. Aide concrète en Île-de-France.",
  },
  alternates: {
    canonical: "https://association-iliyin.fr",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a9d6f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};
