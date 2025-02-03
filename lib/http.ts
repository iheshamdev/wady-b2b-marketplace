// import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define types for HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Define the structure for API responses
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Define the structure for API errors
interface ApiError {
  message: string;
  status: number;
}

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  // const token = useAuthStore.getState().token;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // if (token) {
  //   headers["Authorization"] = `Bearer ${token}`;
  // }

  // const locale = Cookies.get("locale") || "en";
  // headers["Accept-Language"] = locale;

  const config: RequestInit = {
    method,
    headers,
    ...options,
  };

  // if (config.body instanceof FormData) {
  //   delete headers["Content-Type"];
  // } else
  if (typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.message || "An error occurred",
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
      message: "Success",
    };
  } catch (error) {
    throw error as ApiError;
  }
}

// Define API methods
export const getApi = <T>(endpoint: string, options?: RequestInit) =>
  apiRequest<T>(endpoint, "GET", options);

export const postApi = <T>(
  endpoint: string,
  body: any,
  options?: RequestInit,
) => apiRequest<T>(endpoint, "POST", { ...options, body });

export const putApi = <T>(endpoint: string, body: any, options?: RequestInit) =>
  apiRequest<T>(endpoint, "PUT", { ...options, body });

export const deleteApi = <T>(endpoint: string, options?: RequestInit) =>
  apiRequest<T>(endpoint, "DELETE", options);

export const patchApi = <T>(
  endpoint: string,
  body: any,
  options?: RequestInit,
) => apiRequest<T>(endpoint, "PATCH", { ...options, body });

// Create a QueryClient instance
// export const queryClient = new QueryClient();

// // Example function using the API methods
// export async function getProducts() {
//   return getApi<Product[]>("/api/products");
// }

// // Define Product type
// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// // Login form schema
// export const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

// export type LoginFormData = z.infer<typeof loginSchema>;

// // Login function
// export async function login(data: LoginFormData) {
//   const response = await postApi<{ token: string }>("/api/login", data);
//   useAuthStore.getState().setToken(response.data.token);
//   return response;
// }

// // Export the auth store hook for use in components
// export { useAuthStore };
