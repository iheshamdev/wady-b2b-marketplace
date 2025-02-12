import Image from "next/image";
import { useTranslations } from "next-intl";

import { LoginForm } from "@/components/forms/login-form";
import { H1 } from "@/components/shared/typography";

export default function LoginPage() {
  const t = useTranslations("login");
  const headings = ["heading1", "heading2", "heading3"] as const;
  return (
    <main className="container flex min-h-screen items-stretch px-0">
      <section className="flex items-center justify-center bg-background px-8 py-6">
        <LoginForm />
      </section>
      <section className="relative flex flex-1 flex-col bg-primary px-12 py-20">
        <header>
          {headings.map((heading: string, index: number) => (
            <H1 key={index} className="text-white">
              {t(`${heading}`)}
            </H1>
          ))}
        </header>
        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/illustrations/login.png"
            alt="Retailers and suppliers connected easily"
            width={694}
            height={468}
            className="mt-10"
            priority
          />
        </div>
        <div className="absolute bottom-0 right-0">
          <svg
            width="198"
            height="198"
            viewBox="0 0 198 198"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M148.791 0H-3.05176e-05V49.5971V148.791L49.5971 198.388V49.5971H198.388L148.791 0ZM198.388 163.737V99.1942H133.846L198.388 163.737ZM99.1942 198.388H162.899L99.1942 134.684V198.388Z"
              fill="#6E112D"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
