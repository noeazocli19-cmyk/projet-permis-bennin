"use client";

import { Check, Globe } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS, type Locale } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 rounded-full border border-border/60 px-3 font-medium hover:bg-primary/5 hover:text-primary"
          aria-label={t("language.switch")}
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide">{LOCALE_FLAGS[locale]}</span>
          {!compact && (
            <span className="hidden text-xs sm:inline">{LOCALE_LABELS[locale]}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {t("language.switch")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LOCALES.map((l: Locale) => (
          <DropdownMenuItem
            key={l}
            onSelect={() => setLocale(l)}
            className="flex cursor-pointer items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <span className="w-7 text-center text-xs font-bold">{LOCALE_FLAGS[l]}</span>
              <span>{LOCALE_LABELS[l]}</span>
            </span>
            {l === locale && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <p className="px-2 py-1.5 text-[11px] leading-snug text-muted-foreground">
          {t("language.note")}
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
