"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";
import { LanguageSwitcher } from "./LanguageSwitcher";

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    // Defer to allow the sheet to close first on mobile.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-premium"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            handleNav("accueil");
          }}
          className="group flex items-center gap-2.5"
          aria-label={COMPANY.name}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-primary/10 ring-1 ring-primary/20 sm:h-11 sm:w-11">
            <Image
              src="/logo/logo-projet-permis-benin.png"
              alt={`${COMPANY.name} logo`}
              fill
              sizes="44px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-extrabold tracking-tight text-brand-black sm:text-base">
              PROJET PERMIS
            </span>
            <span className="brand-text-gradient font-display text-sm font-extrabold tracking-tight sm:text-base">
              BÉNIN
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t(link.labelKey)}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            asChild
            size="sm"
            className="hidden brand-gradient rounded-full px-5 font-semibold text-white shadow-glow hover:opacity-95 sm:inline-flex"
          >
            <Link
              href="#inscription"
              onClick={(e) => {
                e.preventDefault();
                handleNav("inscription");
              }}
            >
              {t("nav.register")}
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
              <SheetHeader className="px-5 pt-5">
                <SheetTitle className="flex items-center justify-between">
                  <span className="font-display text-base font-extrabold text-brand-black">
                    PROJET PERMIS <span className="brand-text-gradient">BÉNIN</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 py-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-foreground/85 transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    {t(link.labelKey)}
                  </button>
                ))}
              </nav>
              <div className="mt-auto space-y-3 border-t border-border/60 p-5">
                <Button
                  asChild
                  className="brand-gradient w-full rounded-full font-semibold text-white"
                >
                  <Link
                    href="#inscription"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav("inscription");
                    }}
                  >
                    {t("nav.register")}
                  </Link>
                </Button>
                <a
                  href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary"
                >
                  <Phone className="h-4 w-4" /> {COMPANY.phones[0]}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
