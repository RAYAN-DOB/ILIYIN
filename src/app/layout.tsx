import { Montserrat, Orbitron, Exo_2 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { MouseGlow } from "@/components/cosmic/MouseGlow";
import { Providers } from "./providers";
import { CyberModeProvider } from "@/contexts/CyberModeContext";
import NavBar from "@/components/ui/NavBar";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { metadata, viewport } from "./metadata";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo",
});

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${orbitron.variable} ${exo2.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen min-h-screen-safe text-white overflow-x-hidden antialiased">
        <OrganizationJsonLd />
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <CyberModeProvider>
          <Providers>
            <ScrollProgress />
            <NavBar />
            {children}
            <MouseGlow />
            <BackToTop />
            <FloatingWhatsAppButton />
            <Analytics />
          </Providers>
        </CyberModeProvider>
      </body>
    </html>
  );
}
