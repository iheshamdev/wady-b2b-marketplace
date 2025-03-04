import { clsx, type ClassValue } from "clsx";
import { CookieValueTypes, getCookie } from "cookies-next";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isClient(): boolean {
  return typeof window !== "undefined";
}

// lib/format.ts

export const formatPhoneNumber = (
  phone: string | undefined,
  includeCountryCode: boolean = true,
  countryCode: string = "+974",
): string => {
  if (!phone) return "";

  // Remove non-numeric characters (if any)
  const cleaned = phone.replace(/\D/g, "");

  // Ensure number is valid length
  if (cleaned.length < 8 || cleaned.length > 12) {
    console.warn("Invalid phone number length:", phone);
    return phone; // Return original if invalid
  }

  // Extract number without country code
  const numberWithoutCountryCode = cleaned.startsWith(
    countryCode.replace("+", ""),
  )
    ? cleaned.slice(countryCode.length - 1)
    : cleaned;

  return includeCountryCode
    ? `${countryCode}${numberWithoutCountryCode}`
    : numberWithoutCountryCode;
};

export async function getAuthToken(): Promise<CookieValueTypes | null> {
  if (isClient()) {
    // Server-side: Use cookies
    const { cookies } = require("next/headers");
    const cookieStore = cookies();
    return (await cookieStore).get("auth_token")?.value || null;
  } else {
    // Client-side: Use js-cookie
    return getCookie("auth_token") || null;
  }
}
export function formatCurrency(amount: number, currency = "QAR") {
  return `${amount} ${currency}`;
}
