"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { Small } from "../shared/typography";
import { Icons } from "../ui/icons";
import NavMenu from "./nav-menu";

export function SiteHeader() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  return (
    <header className="bg-primary">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Wady logo"
              width={46}
              height={46}
              priority
            />
            <span className="text-2xl font-bold text-white">Wady</span>
          </Link>
          <div className="flex items-center gap-2 rounded bg-primary-600 px-3 py-2 text-white">
            <Icons.MapPin size={20} />
            <div className="flex flex-col">
              <Small className="text-xs">Deleiver to</Small>
              <Small>Doha, Qatar</Small>
            </div>
          </div>
          <div
            onClick={() =>
              startTransition(() => {
                setUserLocale((locale === "ar" ? "en" : "ar") as Locale);
              })
            }
            className={cn(
              "flex cursor-pointer items-center gap-2 border-s border-neutral-400 bg-transparent px-4 text-sm text-white",
              isPending && "pointer-events-none opacity-60",
            )}
          >
            {locale === "ar" ? "EN" : "عربي"}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
