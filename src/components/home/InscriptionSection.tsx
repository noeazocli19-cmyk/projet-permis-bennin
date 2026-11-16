"use client";

import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { InscriptionForm } from "@/components/forms/InscriptionForm";

export function InscriptionSection() {
  return (
    <section
      id="inscription"
      className="relative scroll-mt-20 overflow-hidden bg-brand-gray py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="inscription.label"
          title="inscription.title"
          subtitle="inscription.subtitle"
        />
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-border/60 bg-background p-6 shadow-premium sm:p-8 lg:p-10">
            <InscriptionForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
