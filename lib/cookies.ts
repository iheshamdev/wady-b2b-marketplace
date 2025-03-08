// import { cookies } from "next/headers";

import { isBrowser } from "./utils";

type CookieOptions = {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

export async function getCookie(key: string): Promise<string | null> {
  if (isBrowser) {
    const { getCookie } = await import("cookies-next");
    return (getCookie(key) as string | undefined) ?? null;
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value ?? null;
  }
}

export async function setCookie(
  key: string,
  value: string,
  options?: CookieOptions,
): Promise<void> {
  if (isBrowser) {
    const { setCookie } = await import("cookies-next");
    setCookie(key, value, options);
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.set(key, value, options);
  }
}

export async function deleteCookie(
  key: string,
  options?: Omit<CookieOptions, "maxAge" | "expires">,
): Promise<void> {
  if (isBrowser) {
    const { deleteCookie } = await import("cookies-next");
    deleteCookie(key, options);
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.set(key, "", { ...options, maxAge: 0 });
  }
}
