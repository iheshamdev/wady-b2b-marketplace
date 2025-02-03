import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
}

type AuthStore = {
  loading: boolean;
  error: string | null;
  token: string | null;
  user: User | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const useUserStore = create<AuthStore>()(
  persist(
    (set) => ({
      loading: false,
      error: null,
      token: null,
      user: null,

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      logout: () => {
        set({ token: null, user: null, error: null, loading: false });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },
    }),
    {
      name: "user-store",
      // storage: createJSONStorage(() => localStorage), // Ensures correct storage
      // partialize: (state) => ({ token: state.token, user: state.user }), // Only persist needed fields
    },
  ),
);

export default useUserStore;
