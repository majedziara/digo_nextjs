import AboutSection from "@/components/home/AboutSection";
import ClientsSection from "@/components/home/ClientsSection";
import ContactInfoSection from "@/components/home/ContactInfoSection";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ShortServicesSection from "@/components/home/ShortServicesSection";

import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <main className="relative w-screen box-border">
        <HeroSection />
        <ShortServicesSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
        <ContactSection />
        <ContactInfoSection />
      </main>
    </div>
  );
}
