import { notFound } from "next/navigation";
import { AbstractIntlMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Toaster } from "sonner";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import ClientLayout from "./client-layout";

const locales = ["en", "ar"] as const;
type Locale = (typeof locales)[number];

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

type Params = Promise<{ locale: string }>;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages: AbstractIntlMessages = await getMessages();

  return (
    <ClientLayout locale={locale} messages={messages}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <Toaster />
    </ClientLayout>
  );
}
