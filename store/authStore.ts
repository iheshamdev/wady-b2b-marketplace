import { create } from "zustand";

type AuthStore = {
  phoneNumber: string;
  otp: string;
  loading: boolean;
  error: string | null;
  token: string | null;
  setPhoneNumber: (phoneNumber: string) => void;
  setOTP: (otp: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  phoneNumber: "",
  otp: "",
  loading: false,
  error: null,
  token: null,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setOTP: (otp) => set({ otp }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setToken: (token) => set({ token }),
}));
