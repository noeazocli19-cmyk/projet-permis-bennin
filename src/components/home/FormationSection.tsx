"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FORMATIONS } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function FormationSection() {
  const { t } = useI18n();

  return (
    <section id="formations" className="relative scroll-mt-20 bg-brand-gray py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="formations.label"
          title="formations.title"
          subtitle="formations.subtitle"
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {FORMATIONS.map((f) => {
            const isFeatured = f.code === "B";
            return (
              <StaggerItem key={f.code}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow ${
                    isFeatured ? "border-primary/40 ring-1 ring-primary/20" : "border-border/60"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={f.image}
                      alt={t(`formations.${f.code}`)}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-brand-black/10 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 font-display text-sm font-extrabold shadow-sm ${
                          isFeatured
                            ? "bg-brand-yellow text-brand-black"
                            : "bg-white/90 text-brand-black"
                        }`}
                      >
                        {f.code}
                      </span>
                      {isFeatured && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                          {t("pricing.popular")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold leading-snug text-brand-black">
                      {t(`formations.${f.code}`)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t(`formations.${f.code}Desc`)}
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="brand-gradient flex-1 rounded-full font-semibold text-white"
                      >
                        <Link
                          href="#inscription"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToId("inscription");
                          }}
                        >
                          {t("formations.register")}
                          <ArrowUpRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full border-primary/30 text-primary hover:bg-primary/5"
                      >
                        <Link
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToId("contact");
                          }}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="sr-only">{t("formations.contact")}</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}

          {/* CTA tile to fill the grid (8th cell) */}
          <StaggerItem>
            <Reveal className="flex h-full flex-col items-start justify-center rounded-3xl border border-dashed border-primary/30 bg-primary/[0.04] p-6">
              <p className="font-display text-xl font-extrabold text-brand-black">
                {t("hero.title")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t("about.subtitle")}</p>
              <Button
                asChild
                className="mt-5 rounded-full brand-gradient font-semibold text-white"
              >
                <Link
                  href="#inscription"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("inscription");
                  }}
                >
                  {t("nav.register")}
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
