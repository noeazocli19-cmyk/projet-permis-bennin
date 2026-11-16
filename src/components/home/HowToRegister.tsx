"use client";

import { ClipboardList, Send, Target, CheckCircle2 } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { useI18n } from "@/i18n/provider";

const STEPS = [
  { icon: Target, titleKey: "howto.step1Title", textKey: "howto.step1Text" },
  { icon: ClipboardList, titleKey: "howto.step2Title", textKey: "howto.step2Text" },
  { icon: Send, titleKey: "howto.step3Title", textKey: "howto.step3Text" },
  { icon: CheckCircle2, titleKey: "howto.step4Title", textKey: "howto.step4Text" },
];

export function HowToRegister() {
  const { t } = useI18n();

  return (
    <section className="relative bg-brand-gray py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="howto.label"
          title="howto.title"
          subtitle="howto.subtitle"
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.titleKey}>
                <div className="group relative h-full rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-premium">
                  {/* Step number */}
                  <div className="absolute -top-4 right-5 flex h-9 w-9 items-center justify-center rounded-full brand-gradient font-display text-sm font-extrabold text-white shadow-glow">
                    {i + 1}
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold leading-snug text-brand-black">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(step.textKey)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Connector hint (desktop) */}
        <Reveal delay={0.2}>
          <div className="mt-8 hidden h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
        </Reveal>
      </div>
    </section>
  );
}
