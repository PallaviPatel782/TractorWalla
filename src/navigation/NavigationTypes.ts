import React from 'react';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  MyTractors: undefined;
  MainTractorBrand: undefined;
  TractorDetails: { tractor: any };
  AddTractorDetails: { brand: string; brandLogo: any; model: string; tractor?: any };
  ManageAddress: undefined;
  Bookings: undefined;
  AddLocation: undefined;
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
