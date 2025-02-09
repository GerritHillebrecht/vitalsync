export const locales = {
  en: () => import("./locales/en"),
  de: () => import("./locales/de"),
} as const;
