import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wady wholesale B2B marketplace",
  description: "Wady: A wholesale supply chain platform in Qatar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
