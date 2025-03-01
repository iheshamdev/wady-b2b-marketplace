"use client";

import { usePathname } from "next/navigation";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Toaster } from "sonner";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function ClientLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login"];
  const isNoLayoutRoute = noLayoutRoutes.includes(pathname);

  return (
    <DirectionProvider dir={locale === "ar" ? "rtl" : "ltr"}>
      {!isNoLayoutRoute && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {!isNoLayoutRoute && <SiteFooter />}
      <Toaster />
    </DirectionProvider>
  );
}
