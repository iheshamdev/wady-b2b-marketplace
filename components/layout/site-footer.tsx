import Link from "next/link";

import { P, Small } from "../shared/typography";
import { Icons } from "../ui/icons";

const footerLinks = {
  aboutUs: {
    title: "About us",
    links: [
      { label: "About Wady", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Brands", href: "/brands" },
    ],
  },
  helpSupport: {
    title: "Help & Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  termsPolicy: {
    title: "Terms & Policies",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
};

export function SiteFooter() {
  return (
    <footer className="bg-neutral-50">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Logo */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-4">
              <Icons.Logo size={60} className="fill-primary" />
              <span className="text-xl font-bold text-primary">Wady</span>
            </Link>
          </div>

          {/* Links Sections */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6">
            {/* About Us */}
            <div className="space-y-2">
              <Small>{footerLinks.aboutUs.title}</Small>
              <ul className="space-y-1">
                {footerLinks.aboutUs.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help & Support */}
            <div className="space-y-2">
              <Small>{footerLinks.helpSupport.title}</Small>
              <ul className="space-y-1">
                {footerLinks.helpSupport.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms & Policies */}
            <div className="space-y-2">
              <Small>{footerLinks.termsPolicy.title}</Small>
              <ul className="space-y-1">
                {footerLinks.termsPolicy.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Help Section */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-end gap-2 text-sm">
              <P className="cursor-pointer text-primary">
                Have a question? We are here to help
              </P>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary">
                <Icons.MessageCircleMore className="fill-white text-transparent" />
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center justify-end gap-2">
              <Link
                href="#"
                className="flex size-10 items-center justify-center rounded bg-white hover:text-foreground"
                aria-label="Facebook"
              >
                <Icons.Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="flex size-10 items-center justify-center rounded bg-white hover:text-foreground"
                aria-label="Twitter"
              >
                <Icons.XTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="flex size-10 items-center justify-center rounded bg-white hover:text-foreground"
                aria-label="Instagram"
              >
                <Icons.Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
