"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

import { Small } from "../shared/typography";
import { UserAvatar } from "../ui/avatar";
import { Icons } from "../ui/icons";
import NavMenu from "./nav-menu";

export function SiteHeader() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    router.push(`/${newLocale}${pathname}`);
  };
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
            onClick={toggleLocale}
            className="flex cursor-pointer items-center gap-2 border-s border-neutral-400 bg-transparent px-4 text-sm text-white"
          >
            {locale === "ar" ? "EN" : "عربي"}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <NavMenu />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
