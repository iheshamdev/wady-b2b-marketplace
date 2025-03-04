import { cookies } from "next/headers";

type CookieOptions = {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

const isBrowser = typeof window !== "undefined";

export async function getCookie(key: string): Promise<string | undefined> {
  if (isBrowser) {
    const { getCookie } = await import("cookies-next");
    return getCookie(key) as string | undefined;
  } else {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;
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
    const cookieStore = await cookies();
    cookieStore.set(key, "", { ...options, maxAge: 0 });
  }
}
