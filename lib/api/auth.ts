import { toast } from "sonner";

import { postApi } from "../http";

type GenerateOTPResponse = {
  message: string;
  success: boolean;
};

type VerifyOTPResponse = {
  message: string;
  success: boolean;
  token?: string;
  user?: any;
};

// export const generateOTP = async (
//   phoneNumber: string,
// ): Promise<GenerateOTPResponse> => {
//   console.log(phoneNumber, JSON.stringify({ phoneNumber }));
//   // return http<GenerateOTPResponse>("auth/generate-otp", {
//   //   method: "POST",
//   //   body: JSON.stringify({ phoneNumber }),
//   // });
//   return httpRequest<GenerateOTPResponse>({
//     method: "POST",
//     endpoint: "auth/generate-otp",
//     body: JSON.stringify({ phoneNumber }),
//   });
//   // return POST<GenerateOTPResponse, { phoneNumber: string }>(
//   //   "auth/generate-otp",
//   //   {
//   //     phoneNumber: `+974 ${phoneNumber}`,
//   //   },
//   // );
// };

// export const verifyOTP = async (
//   phoneNumber: string,
//   otp: string,
// ): Promise<VerifyOTPResponse> => {
//   return POST<VerifyOTPResponse>("auth/verify-otp", {
//     method: "POST",
//     body: JSON.stringify({ phoneNumber, otp }),
//   });
// };

export const generateOTP = async (
  phoneNumber: string,
): Promise<GenerateOTPResponse> => {
  try {
    console.log(phoneNumber);
    const data = await postApi<{ message: string }>("auth/generate-otp", {
      phoneNumber,
    });

    console.log("OTP generated successfully:", data);
    toast.success("OTP sent successfully");
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    toast.error((error as any).message || "Failed to generate OTP");
    return {
      success: false,
      message: (error as any).message || "Failed to generate OTP",
    };
  }
};

export const verifyOTP = async (
  phoneNumber: string,
  otp: string,
): Promise<VerifyOTPResponse> => {
  try {
    const data = await postApi<VerifyOTPResponse>("auth/verify-otp", {
      phoneNumber,
      otp,
    });

    console.log("OTP verify successfully:", data);
    toast.success("OTP verified successfully");

    return {
      success: true,
      message: "OTP verified successfully",
      // token: (data as any).token,
      // user: (data as any).user,
    };
  } catch (error) {
    console.log(error instanceof Error, error, Error);
    toast.error((error as any).message || "Failed to verify OTP");
    return {
      success: false,
      message: (error as any).message || "Failed to verify OTP",
    };
  }
};
