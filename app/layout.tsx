import type { Metadata } from "next";

import "./globals.css";

import { Cairo } from "next/font/google";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { cn } from "@/lib/utils";

import ClientLayout from "./client-layout";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wady wholesale B2B marketplace",
  description: "Wady: A wholesale supply chain platform in Qatar",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const messages: AbstractIntlMessages = await getMessages();

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
          <ClientLayout locale={locale}>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
