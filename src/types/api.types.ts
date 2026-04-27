export interface SendOtpRequest {
  phone: string;
  countryCode: string;
  role: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpRequest {
  phone: string;
  countryCode: string;
  role: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  ok?: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user?: any;
  customer?: any;
  data?: {
    user?: any;
    customer?: any;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
}

export interface ProfileResponse {
  success: boolean;
  ok?: boolean;
  user?: any;
  customer?: any;
  data?: {
    user?: any;
    customer?: any;
  };
}

export interface OnboardingLocationRequest {
  latitude: number;
  longitude: number;
}

export interface OnboardingProfileRequest {
  name: string;
  email: string;
  address: string;
  state: string;
  pincode: string;
}

export interface Brand {
  id: string;
  _id?: string;
  name: string;
  logo?: string;
  logoUrl?: string;
}

export interface Model {
  id: string;
  _id?: string;
  name: string;
}

export interface OnboardingVehicleRequest {
  brandId: string;
  modelId: string;
  customBrandName?: string;
  customModelName?: string;
  registrationNo: string;
  yearOfManufacture: number;
  yearOfPurchase: number;
  tractorType: string;
}
