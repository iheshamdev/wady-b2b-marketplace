"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user-store";

export default function useAuthRedirect() {
  const router = useRouter();
  const { token } = useUserStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate before checking token
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !token) {
      router.replace("/login");
    }
  }, [token, isHydrated, router]);
}
