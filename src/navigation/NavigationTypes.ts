import React from 'react';
import { LocationData } from '@utils/locationHelper';

export type RootStackParamList = {
  // Auth & Onboarding
  Loading: undefined;
  Login: undefined;
  OtpVerification: { mobileNumber: string };
  LocationAccess: undefined;
  ProfileDetails: { location: LocationData };
  TractorBrand: undefined;
  TractorBrandRegister: { brandId: string; brandName: string; model: string };
  
  // Main
  Main: undefined;
  MyTractors: undefined;
  MainTractorBrand: undefined;
  TractorDetails: { tractor: any };
  AddTractorDetails: { brandId: string; brandName: string; model: string; tractor?: any };
  ManageAddress: { 
    isSelectionMode?: boolean; 
    selectedAddressId?: string;
    serviceId?: string;
    category?: string;
  } | undefined;
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
  ServiceCheckout: { 
    serviceId: string; 
    category: string; 
    appliedCoupon?: any;
    selectedAddress?: any;
    selectedTractor?: any;
  };
  BookingStatus: { bookingId: string; paymentType?: 'partial' | 'full' };
  TrackMechanic: { bookingId: string; paymentType?: 'partial' | 'full' };
  ServiceCompletion: { bookingId: string; paymentType?: 'partial' | 'full' };
  EmergencyRoadside: undefined;
  CategoryOverview: { categoryId?: string };
  SearchServices: undefined;
  TractorPurchase: undefined;
  SelectTractor: { brand: string; brandLogo: any };
  ServiceAvailability: undefined;
  ServiceProgress: { bookingId?: string; paymentType?: 'partial' | 'full' };
  ServiceFinalPayment: { bookingId: string };
  ServiceInvoiceSummary: { bookingId: string };
  LeaveReview: { bookingId: string };
};

export type AuthStackParamList = {
  Loading: undefined;
  Login: undefined;
  OtpVerification: { mobileNumber: string };
  LocationAccess: undefined;
  ProfileDetails: { location: LocationData };
  TractorBrand: undefined;
  TractorSelection: { brand: string; brandLogo: React.FC<any> };
  TractorBrandRegister: { brandId: string; brandName: string; model: string };
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Parts: undefined;
  Profile: undefined;
};
