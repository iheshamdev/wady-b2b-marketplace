"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OTPSchema, phoneNumberSchema } from "@/schemas/auth";
import useAuthStore from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";

import { formatPhoneNumber } from "@/lib/utils";
import { Button, Input } from "@/components/ui";

import { H2, P } from "../shared/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import PhoneInput from "../ui/phone-input";

interface GenerateOTPProps {
  onNext: () => void;
}

export const GenerateOTPForm = ({ onNext }: GenerateOTPProps) => {
  const { isLoading, generateOTP } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: { phoneNumber: localStorage.getItem("phoneNumber") || "" },
  });

  const onSubmit = async (data: any) => {
    const formattedPhoneNumber = "+974" + data.phoneNumber;
    await generateOTP(formattedPhoneNumber);
    onNext();
    localStorage.setItem("phoneNumber", data.phoneNumber);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[420px] max-w-full"
      >
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={37}
          height={37}
          className="mb-5"
          priority
        />
        <H2 className="mb-3">Login</H2>
        <P>Add your phone number, we will send you a verification code.</P>
        <div className="my-6 h-[1px] w-full bg-neutral-200"></div>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? "Sending OTP ..." : "Send OTP"}
        </Button>
      </form>
    </Form>
  );
};

interface VerifyOTPProps {
  onBack: () => void;
}

export const VerifyOTPForm = ({ onBack }: VerifyOTPProps) => {
  const [otp, setOtp] = useState("");
  const { isLoading, generateOTP, verifyOTP } = useAuthStore();
  const router = useRouter();
  const phoneNumber = localStorage.getItem("phoneNumber") || "";

  const form = useForm({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async () => {
    const verified = await verifyOTP(formatPhoneNumber(phoneNumber), otp);
    if (verified) {
      router.push("/");
      setTimeout(() => {
        localStorage.removeItem("phoneNumber");
      }, 2000);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[420px] max-w-full text-center"
      >
        <H2 className="mb-3">Enter OTP Code</H2>
        <div className="space-y-1">
          <P>Code has been sent to {phoneNumber}</P>
          <Button type="button" variant="link" onClick={() => onBack()}>
            Edit Phone Number
          </Button>
        </div>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <OtpInput
                  containerStyle={{
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: "12px",
                  }}
                  inputStyle={{ width: "44px" }}
                  renderInput={(props) => <Input {...props} />}
                  {...field}
                  onChange={(value: string) => {
                    setOtp(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>

        <div className="mt-5 flex items-center justify-center">
          <P>Didn&apos;t get the code?</P>
          <Button
            type="button"
            variant="link"
            onClick={async () =>
              await generateOTP(formatPhoneNumber(phoneNumber))
            }
          >
            Resend OTP
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const LoginForm = () => {
  const [step, setStep] = useState<"generateOTP" | "verifyOTP">("generateOTP");

  return (
    <div className="flex items-center justify-center">
      {step === "generateOTP" ? (
        <GenerateOTPForm
          onNext={() => {
            setStep("verifyOTP");
          }}
        />
      ) : (
        <VerifyOTPForm onBack={() => setStep("generateOTP")} />
      )}
    </div>
  );
};
