"use client";

import { Clock, MessageCircle, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { COMPANY } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function ContactSection() {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-brand-black py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #16a36a 0, transparent 35%), radial-gradient(circle at 85% 80%, #145b9a 0, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="contact.label"
          title="contact.title"
          subtitle="contact.subtitle"
          light
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Phones */}
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{t("contact.phones")}</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {COMPANY.phones.map((phone) => (
                  <li key={phone} className="flex flex-col gap-2 rounded-2xl bg-white/[0.04] p-3">
                    <span className="font-display text-base font-bold text-white">{phone}</span>
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="rounded-full brand-gradient text-white">
                        <a href={`tel:${phone.replace(/\s/g, "")}`}>
                          <Phone className="mr-1.5 h-3.5 w-3.5" />
                          {t("contact.call")}
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
                      >
                        <a
                          href={buildWhatsAppLink(
                            `Bonjour PROJET PERMIS BÉNIN, je vous contacte au sujet de ${phone}.`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                          {t("contact.whatsapp")}
                        </a>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Localities */}
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{t("contact.localities")}</h3>
              </div>
              <Stagger className="mt-5 grid grid-cols-2 gap-2.5" stagger={0.04}>
                {COMPANY.localities.map((city) => (
                  <StaggerItem key={city}>
                    <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2.5 text-sm text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                      {city}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <p className="mt-4 text-xs text-white/50">{t("contact.locationNote")}</p>
            </div>
          </Reveal>

          {/* Hours + WhatsApp CTA */}
          <Reveal delay={0.16}>
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{t("contact.hours")}</h3>
              </div>
              <p className="mt-5 font-display text-xl font-extrabold text-white">
                {t("contact.hoursValue")}
              </p>
              <div className="mt-auto pt-6">
                <Button
                  asChild
                  className="w-full rounded-full bg-brand-yellow font-bold text-brand-black hover:bg-brand-yellow/90"
                >
                  <a
                    href={buildWhatsAppLink(
                      `Bonjour PROJET PERMIS BÉNIN, je souhaite des informations sur vos formations.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t("contact.whatsapp")}
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
