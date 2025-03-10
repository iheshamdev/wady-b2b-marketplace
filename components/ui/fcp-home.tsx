"use client";

import useAuthStore from "@/store/auth";

import { HeroCarousel } from "../shared/hero-carousel";
import { H2, Lead } from "../shared/typography";
import CompleteProfileCard from "./complete-profile-card";

export default function FCPHome() {
  const { user } = useAuthStore();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <H2>
            Welcome
            <span role="img" aria-label="waving hand">
              👋
            </span>
          </H2>
          {/* {console.log("user", user)} */}
          <Lead className="text-neutral-600">
            Start exploring a seamless shopping experience
          </Lead>
        </div>

        {/* Profile Completion */}
        {!user?.businessProfile && <CompleteProfileCard />}
      </div>
      <div className="mb-10 mt-5">
        <HeroCarousel />
      </div>
    </>
  );
}
