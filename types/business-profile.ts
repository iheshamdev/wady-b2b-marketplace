export interface Address {
  id: number;
  branchName: string;
  branchType: string;
  city: string;
  zoneNumber: string;
  streetNumber: string;
  buildingNumber: string;
  receiverName: string;
  receiverPhoneNumber: string;
  preferredDeliveryTime: "MORNING" | "EVENING";
  createdAt: string;
  updatedAt: string;
}

export interface BusinessProfile {
  id: number;
  businessName: string;
  businessPhoneNumber: string;
  businessType: string;
  email: string;
  commercialRegistrationNumber: string;
  commercialRegistrationCertificate: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusinessProfileRequest {
  businessName: string;
  businessPhoneNumber: string;
  businessType: string;
  email: string;
  commercialRegistrationNumber: string;
  commercialRegistrationCertificate: string;
  address: {
    branchName: string;
    branchType: string;
    city: string;
    zoneNumber: string;
    streetNumber: string;
    buildingNumber: string;
    receiverName: string;
    receiverPhoneNumber: string;
    preferredDeliveryTime: "MORNING" | "AFTERNOON" | "EVENING";
  };
}

export interface BusinessProfileResponse {
  id: number;
  phoneNumber: string;
  name: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  businessProfile: BusinessProfile;
}
