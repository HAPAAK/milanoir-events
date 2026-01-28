"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, Locale, locales } from "@/i18n/locales";
import { messagesByLocale, Messages } from "@/i18n/messages";

interface I18nContextValue {
  locale: Locale;
  locales: readonly Locale[];
  messages: Messages;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem("locale");
    if (stored && locales.includes(stored as Locale)) {
      setLocale(stored as Locale);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const messages = messagesByLocale[locale] ?? messagesByLocale[defaultLocale];
  const value = useMemo(
    () => ({ locale, locales, messages, setLocale }),
    [locale, messages]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function useMessages() {
  return useI18n().messages;
}
