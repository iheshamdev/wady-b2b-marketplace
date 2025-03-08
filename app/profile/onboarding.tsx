"use client";

import type React from "react";
import { useState } from "react";
import useUserStore from "@/store/user-store";

import { postApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import CompleteProfileCard from "@/components/ui/complete-profile-card";
import { Icons } from "@/components/ui/icons";
import BusinessAddressForm from "@/components/forms/business-address-form";
import BusinessInfoForm from "@/components/forms/business-info-form";
import { H3, Large, P } from "@/components/shared/typography";

type Step = {
  id: number;
  title: string;
  icon: React.ReactNode;
  isCompleted: boolean;
};

interface User {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
  name?: string;
  businessProfile?: any;
}

export default function OnboardingPage() {
  const { setUser } = useUserStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 0,
      title: "Primary login",
      icon: <Icons.Wave size={18} />,
      isCompleted: true,
    },
    {
      id: 1,
      title: "Business Information",
      icon: <Icons.Building2 size={18} />,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Business Address",
      icon: <Icons.MapPin size={18} />,
      isCompleted: false,
    },
  ]);
  const [data, setData] = useState<any>({});

  const progress = (currentStep / (steps.length - 1)) * 60;

  const completeStep = (stepId: number) => {
    setSteps(
      steps.map((step) =>
        step.id === stepId ? { ...step, isCompleted: true } : step,
      ),
    );
    setCurrentStep(stepId + 1);
  };

  const submitBusinessProfile = async (body: any) => {
    const { response } = await postApi<User>("business-profile", {
      ...body,
    });
    response && setUser(response);
  };

  return (
    <div className="">
      <div className="container mx-auto my-6 grid grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="relative rounded bg-primary p-8 text-primary-foreground">
          <div className="sticky top-8 space-y-6">
            <div className="space-y-2 border-b border-border/20 pb-5">
              <H3>Welcome 👋</H3>
              <P className="text-primary-foreground/90">
                Manage your business profile
              </P>
            </div>

            <CompleteProfileCard progress={progress} />

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-4 rounded-lg p-4 transition-colors",
                    currentStep === step.id
                      ? "bg-primary-foreground/10 backdrop-blur-sm"
                      : "opacity-80",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2",
                      step.isCompleted
                        ? "bg-primary-foreground"
                        : "border-primary-foreground/50",
                    )}
                  >
                    {step.isCompleted ? (
                      <Icons.Check size={18} className="text-primary" />
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <Large className="font-medium">{step.title}</Large>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          {currentStep === 1 && (
            <BusinessInfoForm
              onComplete={(businessData) => {
                setData(businessData);
                completeStep(1);
              }}
            />
          )}
          {currentStep === 2 && (
            <BusinessAddressForm
              onComplete={(address) => {
                completeStep(2);
                submitBusinessProfile({ ...data, address });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
