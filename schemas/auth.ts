import { z } from "zod";

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\d{8}$/,
      "Phone number must be a valid Qatar number (e.g., +974 12345678)",
    ),
});

export const OTPSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

// Infer types from schemas
export type PhoneFormValues = z.infer<typeof phoneNumberSchema>;
export type OtpFormValues = z.infer<typeof OTPSchema>;
