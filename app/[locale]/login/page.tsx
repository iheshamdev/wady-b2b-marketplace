import Image from "next/image";
import { useTranslations } from "next-intl";

import { LoginForm } from "@/components/forms/login-form";
import { H1 } from "@/components/shared/typography";

export default function LoginPage() {
  const t = useTranslations("login");
  const headings = ["heading1", "heading2", "heading3"] as const;
  return (
    <main className="flex min-h-screen items-stretch">
      <section className="flex items-center justify-center bg-background px-8 py-6">
        <LoginForm />
      </section>
      <section className="flex-1 bg-primary px-12 py-16">
        {headings.map((heading: string, index: number) => (
          <H1 key={index} className="text-white">
            {t(`${heading}`)}
          </H1>
        ))}
        <Image
          src="/illustrations/login.png"
          alt="Retailers and suppliers connected easily"
          width={694}
          height={468}
          className="mt-10"
          priority
        />
        {/* <Image
          src="/images/logo.svg"
          alt="Wady's logo"
          width={37}
          height={37}
          className="mb-5"
          priority
        /> */}
      </section>
    </main>
  );
}
