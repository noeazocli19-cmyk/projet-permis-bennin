/**
 * Centralised, editable company information for PROJET PERMIS BÉNIN.
 * Only verified information provided by the client is stored here.
 * Do not invent addresses, social accounts, certifications or statistics.
 */

export const COMPANY = {
  name: "PROJET PERMIS BÉNIN",
  slogan: "La route vers votre liberté commence ici.",
  /** Country (for display only — no precise address is published). */
  country: "Bénin",
  /** Configurable WhatsApp number (international format, no "+"). */
  whatsappNumber: "2290196023424",
  /** Public contact phones (as provided by the client). */
  phones: ["01 96 02 34 24", "01 46 87 44 84", "01 97 25 83 71"],
  /** Localities where the school is present (city names only). */
  localities: [
    "Glodjigbé",
    "Parakou",
    "Calavi",
    "Cotonou",
    "Porto-Novo",
    "Pahou",
    "Ouidah",
    "Torri-Bossito",
    "Bohicon",
  ],
  /** Email used for the contact form / Resend integration. Optional. */
  contactEmail: process.env.CONTACT_EMAIL ?? "contact@projetpermisenin.bj",
  /** Optional Resend API key (env-driven). When absent, email sending is disabled. */
  resendApiKey: process.env.RESEND_API_KEY,
} as const;

export type Locale = "fr" | "fon" | "en";

export const LOCALES: Locale[] = ["fr", "fon", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  fon: "Fɔngbè",
  en: "English",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  fr: "FR",
  fon: "BJ",
  en: "EN",
};

/** Driving licence categories offered. */
export type FormationCategory = "A1" | "A2" | "A3" | "B" | "C" | "C1" | "D";

export interface FormationInfo {
  code: FormationCategory;
  vehicleType: "moto" | "voiture" | "camion" | "autocar";
  image: string;
}

export const FORMATIONS: FormationInfo[] = [
  { code: "A1", vehicleType: "moto", image: "/images/formation-moto.png" },
  { code: "A2", vehicleType: "moto", image: "/images/formation-moto.png" },
  { code: "A3", vehicleType: "moto", image: "/images/formation-moto.png" },
  { code: "B", vehicleType: "voiture", image: "/images/formation-voiture.png" },
  { code: "C", vehicleType: "camion", image: "/images/formation-camion.png" },
  { code: "C1", vehicleType: "camion", image: "/images/formation-camion.png" },
  { code: "D", vehicleType: "autocar", image: "/images/formation-autocar.png" },
];

export interface PricingPlan {
  id: string;
  labelKey: string;
  total: number;
  currency: string;
  installmentKey: string;
  installments: { labelKey: string; amount: number }[];
  highlighted?: boolean;
}

/** Verified pricing communicated by the client (in FCFA). */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "francais",
    labelKey: "pricing.francais.label",
    total: 66000,
    currency: "FCFA",
    installmentKey: "pricing.francais.installments",
    installments: [
      { labelKey: "pricing.installment.inscription", amount: 20000 },
      { labelKey: "pricing.installment.first", amount: 20000 },
      { labelKey: "pricing.installment.second", amount: 26000 },
    ],
    highlighted: true,
  },
  {
    id: "fongbe",
    labelKey: "pricing.fongbe.label",
    total: 76000,
    currency: "FCFA",
    installmentKey: "pricing.fongbe.installments",
    installments: [
      { labelKey: "pricing.installment.inscription", amount: 25000 },
      { labelKey: "pricing.installment.first", amount: 25000 },
      { labelKey: "pricing.installment.second", amount: 26000 },
    ],
  },
];

/** Other category pricing (verified). */
export const CATEGORY_PRICING: { categories: FormationCategory[]; amount: number; currency: string }[] = [
  { categories: ["A1", "A2", "A3"], amount: 50000, currency: "FCFA" },
  { categories: ["C", "C1", "D"], amount: 96000, currency: "FCFA" },
];

/** Navigation anchors (single-page app, smooth scroll). */
export const NAV_LINKS: { id: string; labelKey: string }[] = [
  { id: "accueil", labelKey: "nav.home" },
  { id: "apropos", labelKey: "nav.about" },
  { id: "formations", labelKey: "nav.formations" },
  { id: "tarifs", labelKey: "nav.pricing" },
  { id: "cours-en-ligne", labelKey: "nav.online" },
  { id: "inscription", labelKey: "nav.register" },
  { id: "contact", labelKey: "nav.contact" },
];
