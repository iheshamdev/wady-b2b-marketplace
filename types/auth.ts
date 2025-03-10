import { BusinessProfile } from "./business-profile";

export interface GenerateOTPRequest {
  phoneNumber: string;
}

export interface GenerateOTPResponse {
  message: string; // "OTP generated successfully"
}

export interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
}

export interface VerifyOTPResponse {
  message: string; // "OTP verified successfully"
  token: string;
  user: User;
}

export interface User {
  id: number;
  phoneNumber: string;
  name: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  businessProfile: BusinessProfile | null;
}
