import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  GenerateOTPResponse,
  User,
  VerifyOTPResponse,
} from "@/types/auth";
import { TOKEN_KEY } from "@/lib/constants";
import { deleteCookie, setCookie } from "@/lib/cookies";
import { getApi, postApi } from "@/lib/http";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  fetchUserLoading: boolean;
  //   error: { message: string; code: number } | null;

  // Actions
  setUser: (user: User | null) => void;
  setFetchUserLoading: (fetchUserLoading: boolean) => void;
  fetchUser: () => void;
  generateOTP: (phoneNumber: string) => Promise<void>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<boolean>;
  logout: (onSuccess?: () => void) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      fetchUserLoading: false,

      setUser: (user) => {
        set({ user });
      },

      setFetchUserLoading: (fetchUserLoading) => set({ fetchUserLoading }),
      fetchUser: async () => {
        const state = get();
        state.setFetchUserLoading(false);
        state.setFetchUserLoading(true);
        const { response } = await getApi<User>("business-profile");
        console.log("fetching user", response);
        state.setUser(response);
        if (!response?.businessProfile) {
          return false;
        }
        return true;
      },

      generateOTP: async (phoneNumber) => {
        set({ isLoading: true });

        const { response, error } = await postApi<GenerateOTPResponse>(
          "auth/generate-otp",
          { phoneNumber },
          { showGlobalError: true },
        );

        set({ isLoading: false });
        if (error) {
          toast.error(error.message);
          return;
        }
      },

      verifyOTP: async (phoneNumber, otp) => {
        set({ isLoading: true });

        const { response, error } = await postApi<VerifyOTPResponse>(
          "auth/verify-otp",
          { phoneNumber, otp },
          { showGlobalError: false },
        );

        set({ isLoading: false });
        if (error) {
          toast.error(error.message);
          return false;
        }

        if (response?.token && response?.user) {
          // Store token in cookie (not in persist storage for security)
          setCookie(TOKEN_KEY, response.token);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          toast.success("You have successfully logged in");
          return true;
        }
        return false;
      },

      logout: (onSuccess?: () => void) => {
        deleteCookie(TOKEN_KEY);
        set({
          user: null,
          isAuthenticated: false,
        });
        toast.warning("You have been logged out");
        onSuccess && onSuccess();
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);
export default useAuthStore;
