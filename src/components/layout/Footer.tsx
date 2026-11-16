"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-brand-black text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15">
                <Image
                  src="/logo/logo-projet-permis-benin.png"
                  alt={`${COMPANY.name} logo`}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div className="leading-none">
                <p className="font-display text-lg font-extrabold text-white">PROJET PERMIS</p>
                <p className="brand-text-gradient font-display text-lg font-extrabold">BÉNIN</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              {t("footer.about")}
            </p>
            <p className="mt-4 font-display text-base font-semibold text-white">
              « {t("footer.tagline")} »
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.id);
                    }}
                    className="text-white/65 transition-colors hover:text-brand-yellow"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
              {t("footer.contact")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {COMPANY.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-white/70 transition-colors hover:text-brand-yellow"
                  >
                    <Phone className="h-4 w-4 text-brand-green-light" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={buildWhatsAppLink(`Bonjour PROJET PERMIS BÉNIN, je souhaite des informations.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 transition-colors hover:text-brand-yellow"
                >
                  <MessageCircle className="h-4 w-4 text-brand-green-light" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-light" />
                <span>{COMPANY.localities.slice(0, 4).join(" · ")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {COMPANY.name}. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1.5">
            {t("footer.madeIn")} <span className="text-brand-yellow">★</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
