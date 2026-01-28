import en from "@/messages/en.json";
import es from "@/messages/es.json";
import nepali from "@/messages/nepali.json";
import { Locale } from "@/i18n/locales";

export type Messages = typeof en | typeof es | typeof nepali;

export const messagesByLocale: Record<Locale, Messages> = {
  en,
  es,
  nepali,
};
