import { createI18nServer } from "next-international/server";
import { locales } from "./locales";

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer(locales);
