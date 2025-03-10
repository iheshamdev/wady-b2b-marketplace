import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
  name?: string;
  businessProfile?: any;
}
type Token = string | null;
type AuthStore = {
  token: Token;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setToken: (token: Token) => void;
  setUser: (user: User | null) => void;
  // setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
};

const useUserStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoading: false,
      error: null,
      token: Cookies.get("auth_token") || null,
      user: Cookies.get("user")
        ? JSON.parse(Cookies.get("user") || "null")
        : null,

      // setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setToken: (token) => {
        if (token) {
          Cookies.set("auth_token", token, { expires: 7 });
        } else {
          Cookies.remove("auth_token");
        }
        set({ token });
      },
      setUser: (user) => {
        if (user) {
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
        } else {
          Cookies.remove("user");
        }
        set({ user });
      },

      logout: () => {
        Cookies.remove("auth_token");
        Cookies.remove("user");
        set({ token: null, user: null, error: null, isLoading: false });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },
    }),
    {
      name: "user-store",
    },
  ),
);

export default useUserStore;
