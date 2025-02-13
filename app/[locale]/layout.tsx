import { Footer } from "@/components/ui/footer";
import { I18nProviderClient } from "@/locales/client";
import { getStaticParams } from "@/locales/server";
import { ReactElement } from "react";

export function generateStaticParams() {
  return getStaticParams();
}

export default async function SubLayout({
  children,
}: {
  children: ReactElement;
}) {
  console.log("Rendering Layout /app/[locale]/layout.tsx");

  return <>{children}</>;
}
