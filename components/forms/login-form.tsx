"use client";

import { useState } from "react";
import Image from "next/image";
import { otpSchema, phoneSchema } from "@/schemas/auth";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";

import { generateOTP, verifyOTP } from "@/lib/api/auth";
import { Button, Input, Label } from "@/components/ui";

import { H2, P } from "../shared/typography";

export const LoginForm = () => {
  const { phoneNumber, loading, error, setPhoneNumber, setLoading, setError } =
    useAuthStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneNumber ? otpSchema : phoneSchema),
  });

  const [otp, setOtp] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      if (!phoneNumber) {
        // Step 1: Generate OTP
        const phone = "+974" + data.phoneNumber;
        console.log("Sending OTP to:", phone);
        await generateOTP(phone); // Call your API to generate OTP
        setPhoneNumber(phone); // Save the phone number in the store
      } else {
        // Step 2: Verify OTP
        console.log("Verifying OTP:", otp);
        const response = await verifyOTP(phoneNumber, otp); // Call your API to verify OTP
        console.log("OTP verification response:", response);
        if (response.success) {
          // Save the token and redirect
          window.location.href = "/";
          // setToken(response.token);
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[420px] max-w-full">
      {/* {console.log(errors)} */}
      {!phoneNumber ? (
        <>
          <Image
            src="/images/logo.svg"
            alt="Wady's logo"
            width={37}
            height={37}
            className="mb-5"
            priority
          />
          <H2 className="mb-3">Login</H2>
          <P>Add your phone number, we will send you a verification code.</P>
          <div className="my-6 h-[1px] w-full bg-neutral-200"></div>
          <Label className="mb-2 block">Phone Number</Label>
          <div className="flex">
            <div className="flex items-center rounded-l-md border bg-muted px-3">
              <span className="text-sm text-muted-foreground">+974</span>
            </div>
            <Input
              id="phone"
              type="tel"
              {...register("phoneNumber")}
              placeholder="Enter your phone number"
              className="ml-[-1px] rounded-l-none"
              disabled={loading}
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-3 text-red-500">
              {errors.phoneNumber?.message?.toString()}
            </p>
          )}
        </>
      ) : (
        <div className="text-center">
          <H2 className="mb-3">Enter OTP code</H2>
          <P>Code has been sent to {phoneNumber}</P>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <OtpInput
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  field.onChange(value); // Update form state
                }}
                containerStyle={{
                  gap: "12px",
                  justifyContent: "center",
                  marginTop: "12px",
                }}
                inputStyle={{ width: "40px" }}
                renderInput={(props) => <Input {...props} />}
              />
            )}
          />
          {errors.otp && (
            <p className="mt-2 text-sm text-red-500">
              {errors.otp.message?.toString()}
            </p>
          )}
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="mt-6 w-full" disabled={loading}>
        {loading ? "Loading..." : phoneNumber ? "Verify OTP" : "Send OTP"}
      </Button>
      {phoneNumber && (
        <div className="mt-5 flex items-center justify-center gap-2">
          <P>Didn&apos;t get the code?</P>
          <Button
            type="button"
            variant="link"
            onClick={() => console.log("Will resend the code")}
          >
            Resend OTP
          </Button>
        </div>
      )}
    </form>
  );
};
