"use client";

import { Check, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CATEGORY_PRICING, PRICING_PLANS } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";

function formatAmount(n: number) {
  return n.toLocaleString("fr-FR").replace(/\u00A0/g, " ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PricingSection() {
  const { t } = useI18n();

  return (
    <section id="tarifs" className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="pricing.label"
          title="pricing.title"
          subtitle="pricing.subtitle"
        />

        {/* Main plans */}
        <Stagger className="mt-14 grid gap-6 lg:grid-cols-2" stagger={0.1}>
          {PRICING_PLANS.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
                  plan.highlighted
                    ? "border-primary/40 bg-gradient-to-b from-primary/[0.06] to-background ring-1 ring-primary/20"
                    : "border-border/60 bg-card"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute right-5 top-5 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-black">
                    {t("pricing.popular")}
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-brand-black">
                  {t(plan.labelKey)}
                </h3>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
                    {formatAmount(plan.total)}
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {plan.currency}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("pricing.perPlan")}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.installments.map((inst) => (
                    <li key={inst.labelKey} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3 w-3" />
                        </span>
                        {t(inst.labelKey)}
                      </span>
                      <span className="font-display text-sm font-bold text-brand-black">
                        {formatAmount(inst.amount)} {plan.currency}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-7 rounded-full font-semibold ${
                    plan.highlighted
                      ? "brand-gradient text-white shadow-glow"
                      : "border border-primary/30 bg-background text-primary hover:bg-primary/5"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  <Link
                    href="#inscription"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("inscription");
                    }}
                  >
                    {t("pricing.register")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Category pricing */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-border/60 bg-brand-gray p-7">
            <h3 className="font-display text-lg font-bold text-brand-black">
              {t("pricing.categoryTitle")}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {CATEGORY_PRICING.map((cat) => (
                <div
                  key={cat.categories.join("-")}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5"
                >
                  <div>
                    <p className="font-display text-sm font-bold text-brand-black">
                      {cat.categories.join(" · ")}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {cat.categories.join(",") === "A1,A2,A3"
                        ? t("pricing.categoryANote")
                        : t("pricing.categoryCNote")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-extrabold text-primary">
                      {formatAmount(cat.amount)}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">{cat.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Disclaimer */}
        <Reveal delay={0.15}>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-yellow/40 bg-brand-yellow/[0.07] p-4 text-sm text-foreground/80">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#a37e0a]" />
            <p>{t("pricing.note")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
