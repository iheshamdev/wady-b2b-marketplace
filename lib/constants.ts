// Authentication constants
export const TOKEN_KEY = "auth_token";
export const USER_KEY = "user";

// Cookie options
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60, // 7 days
  path: "/",
  sameSite: "lax" as const,
};

// API response status codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// API base URL
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
