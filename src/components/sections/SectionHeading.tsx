"use client";

import { Reveal } from "@/components/ui/motion";
import { useI18n } from "@/i18n/provider";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const { t } = useI18n();
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${
            light
              ? "bg-white/15 text-white"
              : "bg-primary/10 text-primary ring-1 ring-primary/15"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-brand-yellow" : "bg-primary"}`} />
          {t(label)}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={`mt-4 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
            light ? "text-white" : "text-brand-black"
          }`}
        >
          {t(title)}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-base leading-relaxed sm:text-lg ${
              light ? "text-white/70" : "text-muted-foreground"
            }`}
          >
            {t(subtitle)}
          </p>
        </Reveal>
      )}
    </div>
  );
}
