import { create } from "zustand";

import { TOKEN_KEY, USER_KEY } from "@/lib/constants";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";

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
  setToken: (token: Token) => Promise<void>;
  setUser: (user: User | null) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
};

const useUserStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setToken: async (token) => {
    if (token) {
      await setCookie(TOKEN_KEY, token, { maxAge: 7 * 24 * 60 * 60 });
    } else {
      await deleteCookie(TOKEN_KEY);
    }
    set({ token });
  },

  setUser: async (user) => {
    if (user) {
      await setCookie(USER_KEY, JSON.stringify(user), {
        maxAge: 7 * 24 * 60 * 60,
      });
    } else {
      await deleteCookie(USER_KEY);
    }
    set({ user });
  },

  initializeAuth: async () => {
    const token = await getCookie(TOKEN_KEY);
    const userCookie = await getCookie(USER_KEY);
    const user = userCookie ? JSON.parse(userCookie) : null;
    set({ token, user });
  },
}));

export default useUserStore;
