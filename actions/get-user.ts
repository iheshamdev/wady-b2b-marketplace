"use server";

import { getApi } from "@/lib/http";

export const getUser = async () => {
  try {
    const response = await getApi<any>("business-profile");
    return response.response;
  } catch (error) {
    return null;
  }
};
