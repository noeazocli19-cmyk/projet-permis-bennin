"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Car, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const stats = [
    { value: t("hero.stat1Value"), label: t("hero.stat1Label") },
    { value: t("hero.stat2Value"), label: t("hero.stat2Label") },
    { value: t("hero.stat3Value"), label: t("hero.stat3Label") },
  ];

  return (
    <section
      id="accueil"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#dff3e7] via-[#eef8f1] to-background pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-70" aria-hidden />
      <div
        className="absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-brand-green-light/30 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-24 top-40 -z-10 h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24">
        {/* Left: copy */}
        <div className="lg:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-black text-balance sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="brand-gradient rounded-full px-7 font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Link
                href="#formations"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("formations");
                }}
              >
                {t("hero.discover")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-primary/30 bg-white/80 px-7 font-semibold text-primary backdrop-blur hover:bg-primary/5"
            >
              <Link
                href="#inscription"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("inscription");
                }}
              >
                {t("hero.register")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/60 bg-white/70 p-3 text-center shadow-sm backdrop-blur"
              >
                <div className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px] font-medium leading-tight text-muted-foreground sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: car visual */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[16/10] w-full max-w-2xl"
          >
            {/* Glow behind car */}
            <div
              className="absolute inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-brand-green-light/25 to-brand-yellow/20 blur-2xl"
              aria-hidden
            />
            {/* Premium frame */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/40 shadow-glow backdrop-blur-sm">
              <Image
                src="/images/hero-car.png"
                alt="Voiture blanche moderne sur la route"
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
              {/* Subtle gradient veil for text legibility on edges */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black/20 via-transparent to-transparent"
                aria-hidden
              />
            </div>

            {/* Floating badge: speed gauge */}
            <motion.div
              animate={
                reduce
                  ? undefined
                  : { y: [0, -10, 0] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-6 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-premium backdrop-blur sm:right-2"
            >
              <Car className="h-5 w-5 text-primary" />
              <div className="leading-none">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {COMPANY.country}
                </p>
                <p className="text-sm font-bold text-brand-black">Premium</p>
              </div>
            </motion.div>

            {/* Floating badge: slogan */}
            <motion.div
              animate={
                reduce
                  ? undefined
                  : { y: [0, 8, 0] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-3 left-2 max-w-[230px] rounded-2xl border border-white/70 bg-white/90 px-4 py-2.5 shadow-premium backdrop-blur sm:left-6"
            >
              <p className="font-display text-xs font-bold leading-snug text-brand-black">
                « {t("footer.tagline")} »
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom road divider */}
      <div className="h-12 w-full bg-gradient-to-b from-transparent to-background">
        <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </section>
  );
}
