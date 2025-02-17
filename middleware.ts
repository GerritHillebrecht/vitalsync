// middleware.ts
import { updateSession } from "@/lib/supabase/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "de"],
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  const redirect = I18nMiddleware(request);
  
  if (redirect.status != 200) {
    return redirect;
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|favicon.svg|favicon-96x96.png|apple-touch-icon.png|apple-touch-icon.png|robots.txt).*)",
  ],
};
