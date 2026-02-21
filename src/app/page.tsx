"use client";

import HeroMatrix from "@/components/sections/HeroMatrix";
import SEOBlock from "@/components/sections/SEOBlock";
import ActionsGrid from "@/components/sections/ActionsGrid";
import DonationPortal from "@/components/sections/DonationPortal";
import VolunteerSection from "@/components/sections/VolunteerSection";
import SponsorSection from "@/components/sections/SponsorSection";
import AboutSection from "@/components/sections/AboutSection";
import InteractiveMap from "@/components/sections/InteractiveMap";
import ContactSection from "@/components/sections/ContactSection";
import ScrollReveal3D from "@/components/ui/ScrollReveal3D";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <main id="main" className="relative z-10 pt-16 sm:pt-20 md:pt-24" aria-label="Contenu principal">
        <ScrollReveal3D>
          <HeroMatrix />
        </ScrollReveal3D>

        <SEOBlock />

        <ScrollReveal3D>
          <ActionsGrid />
        </ScrollReveal3D>

        <ScrollReveal3D>
          <DonationPortal />
        </ScrollReveal3D>

        <ScrollReveal3D>
          <VolunteerSection />
        </ScrollReveal3D>

        <ScrollReveal3D>
          <SponsorSection />
        </ScrollReveal3D>

        <ScrollReveal3D>
          <AboutSection />
        </ScrollReveal3D>

        <ScrollReveal3D>
          <InteractiveMap />
        </ScrollReveal3D>

        <ScrollReveal3D>
          <ContactSection />
        </ScrollReveal3D>

        <Footer />
      </main>
    </>
  );
}
