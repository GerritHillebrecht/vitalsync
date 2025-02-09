import { Footer } from "@/components/ui/footer";
import { I18nProviderClient } from "@/locales/client";
import { getStaticParams } from "@/locales/server";
import { ReactElement } from "react";

export function generateStaticParams() {
  return getStaticParams();
}

export default async function SubLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}) {
  console.log("Rendering Layout /app/[locale]/layout.tsx");
  const { locale } = await params;

  return (
    <I18nProviderClient locale={locale}>
      {children}
      <Footer />
    </I18nProviderClient>
  );
}
