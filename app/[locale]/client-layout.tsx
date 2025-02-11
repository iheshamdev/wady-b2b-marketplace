"use client";

import { useEffect, useState } from "react";
import { Cairo } from "next/font/google";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import { DirectionProvider } from "@radix-ui/react-direction";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function ClientLayout({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  const excludedRoutes = ["/login"];
  const pathname = usePathname();
  const isExcluded = excludedRoutes.includes(pathname);
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(cairo.className)}
    >
      <body className="flex min-h-screen flex-col bg-background antialiased">
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone="Asia/Qatar"
        >
          <DirectionProvider dir={locale === "ar" ? "rtl" : "ltr"}>
            {!isExcluded && <SiteHeader />}
            {/* <main className={cn("flex-1", pathname !== "/" ? "" : "")}>
            </main> */}
            {children}
            {!isExcluded && <SiteFooter />}
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
