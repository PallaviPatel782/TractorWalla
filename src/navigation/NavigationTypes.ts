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
  ChooseLanguage: undefined;
  SendFeedback: undefined;
  ReportIssue: undefined;
  Invoice: { type: 'General' | 'Inventory'; bookingId: string };
  About: undefined;
  AboutTractorWalla: undefined;
  JoinTeam: undefined;
  PrivacyPolicy: undefined;
  TermsConditions: undefined;
  ContactUs: undefined;
  FAQ: undefined;
  UpdateProfile: undefined;
  BookingDetails: { bookingId?: string };
  NotificationScreen: undefined;
  BuyParts: undefined;
  PartsOverview: { kitId: string };
  BookService: undefined;
  ApplyCoupons: undefined;
  ServiceOverview: { serviceId: string; category: string };
  ServiceCheckout: { serviceId: string; category: string; appliedCoupon?: any };
  EmergencyRoadside: undefined;
  CategoryOverview: { categoryId?: string };
  SearchServices: undefined;
  TractorPurchase: undefined;
  SelectTractor: { brand: string; brandLogo: any };
  ServiceAvailability: undefined;
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
