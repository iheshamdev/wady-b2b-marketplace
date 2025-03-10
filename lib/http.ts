import { toast } from "sonner";

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
  showGlobalError?: boolean; // Control whether to show global error toast
}

export interface ApiError {
  message: string;
  code: number;
}

interface ApiCallResponse<T> {
  response: T | null;
  error: ApiError | null;
}

// Map of status codes to user-friendly messages
const ERROR_MESSAGES: Record<number, string> = {
  400: "Bad request. Please check your input.",
  401: "Your session has expired. Please login again.",
  403: "You don't have permission to access this resource.",
  404: "The requested resource was not found.",
  500: "Something went wrong on our server. Please try again later.",
  502: "Server is temporarily unavailable. Please try again later.",
  503: "Service unavailable. Please try again later.",
};

// Get a user-friendly error message based on status code
function getErrorMessage(status: number, serverMessage?: string): string {
  if (serverMessage) return serverMessage;
  return ERROR_MESSAGES[status] || `An error occurred (${status})`;
}

// Handle global errors with toast notifications
function handleGlobalError(status: number, message: string) {
  // Handle unauthorized access (401)
  if (status === STATUS_CODES.UNAUTHORIZED) {
    toast.error(ERROR_MESSAGES[status]);

    if (isBrowser) {
      deleteCookie(TOKEN_KEY);
      deleteCookie(USER_KEY);
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return;
  }

  // Show toast for other errors
  toast.error(message);
}

async function apiCall<T>({
  method,
  endpoint,
  body = {},
  auth = true,
  contentType = "application/json",
  headers = {},
  showGlobalError = true,
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
    const jsonResponse = await response.json();

    // Handle non-OK responses
    if (!response.ok) {
      const errorMessage = getErrorMessage(
        response.status,
        jsonResponse?.message,
      );

      // Show global error toast if enabled
      if (showGlobalError) {
        handleGlobalError(response.status, errorMessage);
      }

      return {
        response: null,
        error: {
          message: errorMessage,
          code: response.status,
        },
      };
    }

    // Return successful response
    return {
      response: jsonResponse,
      error: null,
    };
  } catch (error) {
    console.error("API Request Failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Show global error toast for network errors if enabled
    if (showGlobalError) {
      toast.error("Network error. Please check your connection.");
    }

    return {
      response: null,
      error: {
        message: errorMessage,
        code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      },
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
