"use client";

import { Clock, Globe, MapPin, MonitorPlay, ShieldCheck, Car } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { useI18n } from "@/i18n/provider";

const ITEMS = [
  { icon: ShieldCheck, titleKey: "whyus.item1Title", textKey: "whyus.item1Text" },
  { icon: Car, titleKey: "whyus.item2Title", textKey: "whyus.item2Text" },
  { icon: Clock, titleKey: "whyus.item3Title", textKey: "whyus.item3Text" },
  { icon: MonitorPlay, titleKey: "whyus.item4Title", textKey: "whyus.item4Text" },
  { icon: Globe, titleKey: "whyus.item5Title", textKey: "whyus.item5Text" },
  { icon: MapPin, titleKey: "whyus.item6Title", textKey: "whyus.item6Text" },
];

export function WhyUs() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-brand-black py-20 text-white sm:py-24 lg:py-28">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #16a36a 0, transparent 40%), radial-gradient(circle at 80% 60%, #145b9a 0, transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="whyus.label"
          title="whyus.title"
          subtitle="whyus.subtitle"
          light
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.titleKey}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-light/40 hover:bg-white/[0.07]">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {t(item.textKey)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
