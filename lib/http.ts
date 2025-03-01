import { cookies } from "next/headers";
import { deleteCookie, getCookie } from "cookies-next";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface HttpArgs {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  body?: any;
  auth?: boolean;
  contentType?: string;
  headers?: Record<string, string>;
  options?: {
    throwError?: boolean;
    handlePermissionError?: boolean;
    returnFullResponse?: boolean;
  };
}

// Helper function to handle redirects
const handleRedirect = (path: string) => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname + window.location.search;
    const redirectPath =
      path === "/login"
        ? `${path}?redirect=${encodeURIComponent(currentPath)}`
        : path;
    window.location.href = redirectPath;
  } else {
    // throw new Error("Unauthorized");
  }
};

// Helper function to get the auth token from cookies
const getAuthToken = async (): Promise<string | undefined> => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;
    console.log(
      "window is undefined, It's a server component, so token will be:",
      token,
    );
    return token;
  } else {
    const { getCookie } = await import("cookies-next");
    const token = getCookie("auth_token");
    console.log(
      "window is defined, It's a client component, so token will be:",
      token,
    );
    return token;
  }
};

const apiCall = async ({
  method,
  endpoint,
  body = {},
  auth = true,
  contentType = "application/json",
  headers = {},
  options = {
    throwError: false,
    handlePermissionError: true,
    returnFullResponse: false,
  },
}: HttpArgs): Promise<any> => {
  try {
    const token = await getAuthToken();
    console.log("new api call", method, endpoint, token);

    const requestHeaders: Record<string, string> = {
      "Content-Type": contentType,
      ...(auth && token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    if (body instanceof FormData) {
      delete requestHeaders["Content-Type"];
    }

    const url = `${BASE_URL}/${endpoint}`;

    const requestInit: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (method !== "GET" && body) {
      requestInit.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, requestInit);
    const responseData = await response.json();
    console.log("apiCall -> ", method, endpoint, responseData);

    if (!response.ok) {
      // Handle unauthorized access
      if (response.status === 401) {
        console.log("Unauthorized access");
        // Clear auth token
        const { deleteCookie } = await import("cookies-next");
        deleteCookie("auth_token");
        handleRedirect("/login");
        return response;
      }

      return response;
    }

    return options.returnFullResponse ? response : responseData;
  } catch (error) {
    console.error("API Request Failed:", error);
    if (options.throwError) {
      throw error;
    }
    return error;
  }
};

// Utility functions for different HTTP methods
export const getApi = <T>(
  endpoint: string,
  options?: Omit<HttpArgs, "method" | "endpoint">,
): Promise<T> => apiCall({ method: "GET", endpoint, ...options });

export const postApi = <T>(
  endpoint: string,
  body: any,
  options?: Omit<HttpArgs, "method" | "endpoint" | "body">,
): Promise<T> => apiCall({ method: "POST", endpoint, body, ...options });

export const putApi = <T>(
  endpoint: string,
  body: any,
  options?: Omit<HttpArgs, "method" | "endpoint" | "body">,
): Promise<T> => apiCall({ method: "PUT", endpoint, body, ...options });

export const deleteApi = <T>(
  endpoint: string,
  options?: Omit<HttpArgs, "method" | "endpoint">,
): Promise<T> => apiCall({ method: "DELETE", endpoint, ...options });

export const patchApi = <T>(
  endpoint: string,
  body: any,
  options?: Omit<HttpArgs, "method" | "endpoint" | "body">,
): Promise<T> => apiCall({ method: "PATCH", endpoint, body, ...options });
