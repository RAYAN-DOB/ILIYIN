import type { Metadata } from "next";
import ContactInfoSection from "@/components/sections/ContactInfoSection";
import Footer from "@/components/ui/Footer";
import { CONTACT_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact & Informations | ${CONTACT_CONFIG.associationName}`,
  description: `${CONTACT_CONFIG.page.subtitle} ${CONTACT_CONFIG.page.inclusivity} Contact : ${CONTACT_CONFIG.phone} - WhatsApp, Instagram, dons PayAsso.`,
  openGraph: {
    title: `Contact & Informations | ${CONTACT_CONFIG.associationName}`,
    description: `${CONTACT_CONFIG.page.subtitle} ${CONTACT_CONFIG.page.inclusivity}`,
  },
};

export default function ContactPage() {
  return (
    <main id="main" className="relative z-10 pt-16 sm:pt-20 md:pt-24 min-h-screen" aria-label="Contenu principal">
      <ContactInfoSection />
      <Footer />
    </main>
  );
}
