"use client";

import useUserStore from "@/store/user-store";

import { H1 } from "@/components/shared/typography";

import OnboardingPage from "./onboarding";

export default function Page() {
  const { user } = useUserStore();

  if (!user?.businessProfile) {
    return <OnboardingPage />;
  }

  return (
    <div>
      {/* Render the rest of your page here */}
      <H1>Welcome to the profile page, user id {user?.id}</H1>
    </div>
  );
}
