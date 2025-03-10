"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";

import { H1 } from "@/components/shared/typography";

import OnboardingPage from "./onboarding";

export default function Page() {
  const { user, logout, fetchUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user?.businessProfile) {
    return <OnboardingPage />;
  }

  return (
    <div>
      {/* Render the rest of your page here */}
      <H1>Welcome to the profile page, user id {user?.id}</H1>
      <button onClick={() => logout(() => router.push("/login"))}>
        Logout
      </button>
    </div>
  );
}
