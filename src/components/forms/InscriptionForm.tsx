"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/ui/motion";
import { COMPANY, FORMATIONS, type FormationCategory } from "@/lib/constants";
import { openWhatsApp } from "@/lib/whatsapp";
import { inscriptionSchema, type InscriptionValues } from "@/lib/validations";
import { useI18n } from "@/i18n/provider";

function buildMessage(v: InscriptionValues, t: (k: string) => string): string {
  const lines = [
    `*PROJET PERMIS BÉNIN — ${t("inscription.title")}*`,
    "",
    `${t("inscription.nom")}: ${v.nom}`,
    `${t("inscription.prenom")}: ${v.prenom}`,
    `${t("inscription.telephone")}: ${v.telephone}`,
    `${t("inscription.ville")}: ${v.ville}`,
    `${t("inscription.categorie")}: ${v.categorie}`,
    `${t("inscription.langue")}: ${v.langue === "francais" ? t("inscription.francais") : t("inscription.fongbe")}`,
  ];
  if (v.message && v.message.trim().length > 0) {
    lines.push("", `${t("inscription.message")}:`, v.message.trim());
  }
  return lines.join("\n");
}

export function InscriptionForm() {
  const { t } = useI18n();
  const [validated, setValidated] = useState<InscriptionValues | null>(null);
  const [emailSending, setEmailSending] = useState(false);

  const form = useForm<InscriptionValues>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      ville: "",
      categorie: undefined,
      langue: undefined,
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (values: InscriptionValues) => {
    setValidated(values);
    // Smooth scroll to the channel area.
    requestAnimationFrame(() => {
      document.getElementById("inscription-channel")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  const handleWhatsApp = () => {
    if (!validated) return;
    openWhatsApp(buildMessage(validated, t));
    toast.success(t("inscription.success"));
  };

  const handleEmail = async () => {
    if (!validated) return;
    if (!COMPANY.resendApiKey) {
      toast.error(t("inscription.emailUnconfigured"));
      return;
    }
    setEmailSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur d'envoi");
      }
      toast.success(t("inscription.emailSuccess"));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("inscription.emailUnconfigured"),
      );
    } finally {
      setEmailSending(false);
    }
  };

  const resetForm = () => {
    setValidated(null);
    form.reset();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Form */}
      <Reveal className="lg:col-span-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-brand-black">
                      {t("inscription.nom")} <span className="text-brand-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="family-name"
                        className="h-11 rounded-xl border-border/70 bg-background"
                        disabled={!!validated}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-brand-black">
                      {t("inscription.prenom")} <span className="text-brand-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="given-name"
                        className="h-11 rounded-xl border-border/70 bg-background"
                        disabled={!!validated}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-brand-black">
                      {t("inscription.telephone")} <span className="text-brand-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="01 ..."
                        className="h-11 rounded-xl border-border/70 bg-background"
                        disabled={!!validated}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ville"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-brand-black">
                      {t("inscription.ville")} <span className="text-brand-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="address-level2"
                        placeholder="Cotonou..."
                        className="h-11 rounded-xl border-border/70 bg-background"
                        disabled={!!validated}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="categorie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-brand-black">
                      {t("inscription.categorie")} <span className="text-brand-red">*</span>
                    </FormLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      disabled={!!validated}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl border-border/70 bg-background">
                          <SelectValue placeholder={t("inscription.selectCategorie")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FORMATIONS.map((f) => (
                          <SelectItem key={f.code} value={f.code}>
                            {f.code} — {t(`formations.${f.code}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="langue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-brand-black">
                      {t("inscription.langue")} <span className="text-brand-red">*</span>
                    </FormLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      disabled={!!validated}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 rounded-xl border-border/70 bg-background">
                          <SelectValue placeholder={t("inscription.selectLangue")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="francais">{t("inscription.francais")}</SelectItem>
                        <SelectItem value="fongbe">{t("inscription.fongbe")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-brand-black">
                    {t("inscription.message")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder={t("inscription.messagePlaceholder")}
                      className="rounded-xl border-border/70 bg-background resize-none"
                      disabled={!!validated}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!validated && (
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full brand-gradient font-semibold text-white shadow-glow transition-transform hover:scale-[1.01]"
              >
                {t("inscription.submit")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {validated && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="w-full rounded-full border-primary/30 text-primary hover:bg-primary/5"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("inscription.submit")}
              </Button>
            )}
          </form>
        </Form>
      </Reveal>

      {/* Summary + channels */}
      <Reveal delay={0.1} className="lg:col-span-2">
        <div
          id="inscription-channel"
          className="sticky top-24 rounded-3xl border border-border/60 bg-brand-gray p-6 shadow-sm"
        >
          {validated ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-display text-sm font-bold uppercase tracking-wide">
                  {t("inscription.summary")}
                </span>
              </div>
              <dl className="space-y-2 rounded-2xl border border-border/60 bg-background p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{t("inscription.nom")}</dt>
                  <dd className="font-semibold text-brand-black">
                    {validated.nom} {validated.prenom}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{t("inscription.telephone")}</dt>
                  <dd className="font-semibold text-brand-black">{validated.telephone}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{t("inscription.ville")}</dt>
                  <dd className="font-semibold text-brand-black">{validated.ville}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{t("inscription.categorie")}</dt>
                  <dd className="font-semibold text-brand-black">
                    {validated.categorie as FormationCategory}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{t("inscription.langue")}</dt>
                  <dd className="font-semibold text-brand-black">
                    {validated.langue === "francais"
                      ? t("inscription.francais")
                      : t("inscription.fongbe")}
                  </dd>
                </div>
              </dl>

              <p className="pt-1 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("inscription.chooseChannel")}
              </p>
              <div className="space-y-2.5">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full rounded-full bg-[#25D366] font-semibold text-white hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("inscription.whatsapp")}
                </Button>
                <Button
                  onClick={handleEmail}
                  disabled={emailSending}
                  className="w-full rounded-full brand-gradient font-semibold text-white"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {emailSending ? t("inscription.sending") : t("inscription.email")}
                </Button>
              </div>
              {!COMPANY.resendApiKey && (
                <p className="text-center text-[11px] text-muted-foreground">
                  {t("inscription.emailUnconfigured")}
                </p>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageCircle className="h-7 w-7" />
              </div>
              <p className="mt-4 font-display text-base font-bold text-brand-black">
                {t("inscription.subtitle")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("inscription.chooseChannel")}
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
