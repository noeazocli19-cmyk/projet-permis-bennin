"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/constants";

import fr from "../../messages/fr.json";
import en from "../../messages/en.json";
import fon from "../../messages/fon.json";

export type Messages = typeof fr;

const MESSAGE_MAP: Record<Locale, Messages> = { fr, en, fon };

function isLocale(v: string | null | undefined): v is Locale {
  return !!v && (LOCALES as string[]).includes(v);
}

/** Deeply read a dotted key from a messages object. */
function lookup(obj: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

const STORAGE_KEY = "ppb-locale";
/** Custom event fired when the locale changes in the current tab. */
const LOCALEChangeEvent = "ppb-locale-change";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(LOCALEChangeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCALEChangeEvent, callback);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

/** Server snapshot — always the default so SSR matches the first client render. */
function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Translate a dotted key. Falls back to FR, then to the key itself. */
  t: (key: string) => string;
  /** Full messages object for the active locale. */
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore keeps SSR and the first client render consistent
  // (both use DEFAULT_LOCALE via getServerSnapshot), then React reconciles to
  // the persisted client value without any hydration mismatch or
  // setState-in-effect.
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((l: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(LOCALEChangeEvent));
      if (typeof document !== "undefined") {
        document.documentElement.lang = l === "fon" ? "fon" : l;
      }
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return (
        lookup(MESSAGE_MAP[locale] as unknown as Record<string, unknown>, key) ??
        lookup(MESSAGE_MAP.fr as unknown as Record<string, unknown>, key) ??
        key
      );
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, messages: MESSAGE_MAP[locale] }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}

/** Convenience hook returning only the translate function. */
export function useT() {
  return useI18n().t;
}
