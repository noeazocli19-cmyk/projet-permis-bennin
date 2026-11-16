import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyUs } from "@/components/home/WhyUs";
import { FormationSection } from "@/components/home/FormationSection";
import { PricingSection } from "@/components/home/PricingSection";
import { OnlineCourses } from "@/components/home/OnlineCourses";
import { HowToRegister } from "@/components/home/HowToRegister";
import { ZonesSection } from "@/components/home/ZonesSection";
import { InscriptionSection } from "@/components/home/InscriptionSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhyUs />
      <FormationSection />
      <PricingSection />
      <OnlineCourses />
      <HowToRegister />
      <ZonesSection />
      <InscriptionSection />
      <ContactSection />
    </>
  );
}
