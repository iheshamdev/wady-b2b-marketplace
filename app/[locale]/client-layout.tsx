"use client";

import { useEffect, useState } from "react";
import { Cairo } from "next/font/google";
import { useRouter } from "next/navigation";
import { DirectionProvider } from "@radix-ui/react-direction";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

import { cn } from "@/lib/utils";

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
            {children}
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
