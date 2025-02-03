import { toast } from "sonner";

import { postApi } from "../http";

type GenerateOTPResponse = {
  message: string;
  status: number;
  data: any;
};

type VerifyOTPResponse = {
  message: string;
  success: boolean;
  token?: string;
  user?: any;
};

export const generateOTP = async (phoneNumber: string): Promise<any> => {
  try {
    console.log(phoneNumber);
    const response = await postApi<{ message: string }>("auth/generate-otp", {
      phoneNumber,
    });

    console.log("OTP generated successfully:", response);
    toast.success("OTP sent successfully");
    return response;
  } catch (error) {
    toast.error((error as any).message || "Failed to generate OTP");
    return error;
  }
};

export const verifyOTP = async (
  phoneNumber: string,
  otp: string,
): Promise<any> => {
  try {
    const data = await postApi<VerifyOTPResponse>("auth/verify-otp", {
      phoneNumber,
      otp,
    });
    toast.success("OTP verified successfully");

    return data;
  } catch (error) {
    toast.error((error as any).message || "Failed to verify OTP");
    return error;
    // return {
    //   success: false,
    //   message: (error as any).message || "Failed to verify OTP",
    // };
  }
};
