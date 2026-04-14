export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Loading: undefined;
  Login: undefined;
  OtpVerification: { mobileNumber: string };
  LocationAccess: undefined;
  ProfileDetails: undefined;
  TractorBrand: undefined;
  TractorSelection: { brand: string; brandLogo: React.FC<any> };
  TractorBrandRegister: { brand: string; brandLogo: React.FC<any>; model: string };
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Parts: undefined;
  Profile: undefined;
};
