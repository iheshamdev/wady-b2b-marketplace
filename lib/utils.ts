import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isClient(): boolean {
  return typeof window !== "undefined";
}
export const isBrowser = typeof window !== "undefined";

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

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
