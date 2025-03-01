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
