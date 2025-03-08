import { BASE_URL, STATUS_CODES, TOKEN_KEY, USER_KEY } from "./constants";
import { deleteCookie, getCookie } from "./cookies";
import { isBrowser } from "./utils";

interface ApiCallProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  body?: any;
  auth?: boolean;
  contentType?: string;
  headers?: Record<string, string>;
}

interface ApiCallResponse<T> {
  response: T | null;
  error: string | null;
  status: number;
}

async function apiCall<T>({
  method,
  endpoint,
  body = {},
  auth = true,
  contentType = "application/json",
  headers = {},
}: ApiCallProps): Promise<ApiCallResponse<T>> {
  try {
    const token = await getCookie(TOKEN_KEY);
    console.log("Calling a new api...", method, endpoint, token);

    const requestHeaders: Record<string, string> = {
      "Content-Type": contentType,
      ...(auth && token && { Authorization: `Bearer ${token}` }),
      ...headers,
    };

    const url = `${BASE_URL}/${endpoint}`;

    const requestInit: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (method !== "GET" && body) {
      requestInit.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, requestInit);
    const jsonRes = await response.json();
    // console.log("apiCall -> ", method, endpoint, responseData);

    // Handle specific status codes
    if (!response.ok) {
      // Handle unauthorized access (401)
      if (response.status === STATUS_CODES.UNAUTHORIZED) {
        console.error("Unauthorized access, redirecting to login");
        // if (isBrowser) {
        //   deleteCookie(TOKEN_KEY);
        //   deleteCookie(USER_KEY);
        //   window.location.reload();
        // } else {
        //   // ? How to Handle unauthorized access in server-side rendering
        // }

        return {
          response: null,
          error: jsonRes?.message || "Unauthorized access",
          status: STATUS_CODES.UNAUTHORIZED,
        };
      }

      // Handle forbidden access (403)
      if (response.status === STATUS_CODES.FORBIDDEN) {
        console.error("Forbidden access");
        // handle forbidden access logic here

        return {
          response: null,
          error: jsonRes?.message || "Access forbidden",
          status: STATUS_CODES.FORBIDDEN,
        };
      }

      // Handle other error responses
      return {
        response: null,
        error:
          jsonRes?.message || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    // Return successful response
    return {
      response: jsonRes,
      error: null,
      status: response.status,
    };
  } catch (error) {
    console.error("API Request Failed:", error);

    return {
      response: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    };
  }
}

// Utility functions for different HTTP methods

export const getApi = <T>(
  endpoint: string,
  options?: Omit<ApiCallProps, "method" | "endpoint">,
): Promise<ApiCallResponse<T>> =>
  apiCall<T>({ method: "GET", endpoint, ...options });

export const postApi = <T>(
  endpoint: string,
  body: any,
  options?: Omit<ApiCallProps, "method" | "endpoint" | "body">,
): Promise<ApiCallResponse<T>> =>
  apiCall<T>({ method: "POST", endpoint, body, ...options });

export const putApi = <T>(
  endpoint: string,
  body: any,
  options?: Omit<ApiCallProps, "method" | "endpoint" | "body">,
): Promise<ApiCallResponse<T>> =>
  apiCall<T>({ method: "PUT", endpoint, body, ...options });

export const deleteApi = <T>(
  endpoint: string,
  options?: Omit<ApiCallProps, "method" | "endpoint">,
): Promise<ApiCallResponse<T>> =>
  apiCall<T>({ method: "DELETE", endpoint, ...options });

export const patchApi = <T>(
  endpoint: string,
  body: any,
  options?: Omit<ApiCallProps, "method" | "endpoint" | "body">,
): Promise<ApiCallResponse<T>> =>
  apiCall<T>({ method: "PATCH", endpoint, body, ...options });
