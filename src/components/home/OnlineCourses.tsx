"use client";

import { ArrowRight, BookOpen, Smartphone, Timer } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { useI18n } from "@/i18n/provider";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const FEATURES = [
  { icon: BookOpen, titleKey: "online.feature1Title", textKey: "online.feature1Text" },
  { icon: Smartphone, titleKey: "online.feature2Title", textKey: "online.feature2Text" },
  { icon: Timer, titleKey: "online.feature3Title", textKey: "online.feature3Text" },
];

export function OnlineCourses() {
  const { t } = useI18n();

  return (
    <section
      id="cours-en-ligne"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c5a34] via-brand-green to-[#0a4f30]" />
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(242,194,48,0.4) 0, transparent 40%), radial-gradient(circle at 10% 90%, rgba(20,91,154,0.35) 0, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                {t("online.label")}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-[2.75rem]">
                {t("online.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {t("online.subtitle")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                {t("online.description")}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-white font-semibold text-brand-green shadow-glow hover:bg-white/90"
              >
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("contact");
                  }}
                >
                  {t("online.info")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* Features */}
          <Stagger className="grid gap-4 sm:grid-cols-1" stagger={0.08}>
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <StaggerItem key={f.titleKey}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur transition-colors hover:bg-white/[0.1]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-brand-yellow">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        {t(f.titleKey)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">
                        {t(f.textKey)}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
            <Reveal delay={0.1}>
              <p className="rounded-xl bg-white/[0.04] px-4 py-3 text-xs leading-relaxed text-white/55">
                {t("online.note")}
              </p>
            </Reveal>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
