import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { Locale } from "@/i18n/locales";

export type Messages = typeof en;

export const messagesByLocale: Record<Locale, Messages> = {
  en,
  es,
};
