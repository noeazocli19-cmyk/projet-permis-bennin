"use client";

import { MapPin } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { COMPANY } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";

export function ZonesSection() {
  const { t } = useI18n();

  return (
    <section id="zones" className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="zones.label"
          title="zones.title"
          subtitle="zones.subtitle"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:items-center">
          {/* Visual map card */}
          <Reveal className="lg:col-span-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/60 bg-brand-gradient shadow-glow">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0, transparent 30%), radial-gradient(circle at 70% 70%, rgba(242,194,48,0.4) 0, transparent 35%)",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                <MapPin className="h-14 w-14 drop-shadow-lg" />
                <p className="mt-4 font-display text-4xl font-extrabold drop-shadow">
                  {COMPANY.localities.length}
                </p>
                <p className="mt-1 text-sm font-medium text-white/85">
                  {t("zones.title")}
                </p>
                <p className="mt-4 text-xs uppercase tracking-widest text-white/70">
                  {COMPANY.country}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Cities grid */}
          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-3" stagger={0.05}>
            {COMPANY.localities.map((city) => (
              <StaggerItem key={city}>
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3.5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-premium">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="truncate text-sm font-semibold text-brand-black">{city}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
