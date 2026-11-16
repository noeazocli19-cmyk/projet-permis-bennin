"use client";

import { Compass, HeartHandshake, Map as MapIcon, Target } from "lucide-react";
import Image from "next/image";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { useI18n } from "@/i18n/provider";

const PILLARS = [
  { icon: Target, titleKey: "about.missionTitle", textKey: "about.missionText", accent: "bg-brand-green/10 text-brand-green" },
  { icon: Compass, titleKey: "about.visionTitle", textKey: "about.visionText", accent: "bg-brand-blue/10 text-brand-blue" },
  { icon: HeartHandshake, titleKey: "about.engagementTitle", textKey: "about.engagementText", accent: "bg-brand-red/10 text-brand-red" },
  { icon: MapIcon, titleKey: "about.accompanimentTitle", textKey: "about.accompanimentText", accent: "bg-brand-yellow/15 text-[#a37e0a]" },
];

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="apropos" className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="about.label"
          title="about.title"
          subtitle="about.subtitle"
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div
                className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl brand-gradient opacity-20 blur-xl"
                aria-hidden
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 shadow-premium">
                <Image
                  src="/images/about-driving.png"
                  alt="Moniteur accompagnant un élève en voiture"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-border/60 bg-background p-4 shadow-premium sm:-right-5">
                <p className="font-display text-2xl font-extrabold text-primary">A1 → D</p>
                <p className="text-xs font-medium text-muted-foreground">
                  {t("hero.stat2Label")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Pillars */}
          <Stagger className="order-1 grid gap-4 sm:grid-cols-2 lg:order-2">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.titleKey}>
                  <div className="group h-full rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-premium">
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${p.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-brand-black">
                      {t(p.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(p.textKey)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
