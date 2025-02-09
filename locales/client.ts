"use client";
import { createI18nClient } from "next-international/client";
import { locales } from "./locales";

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient(locales);
