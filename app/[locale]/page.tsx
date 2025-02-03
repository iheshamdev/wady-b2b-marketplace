"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { P } from "@/components/shared/typography";

export default function HomePage() {
  const t = useTranslations("");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.push(`/${newLocale}${pathname}`);
  };

  return (
    <>
      <h1>Good Morning </h1>
      <Button
        variant="white"
        onClick={toggleLocale}
        className="flex items-center gap-2"
      >
        {locale === "ar" ? "EN" : "ع"}
      </Button>
    </>
  );
}
