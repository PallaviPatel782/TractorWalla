import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, AuthStackParamList } from '@navigation/NavigationTypes';
import { useAppSelector } from '@store';
import {
  Loading,
  LoginScreen,
  OtpVerification,
  LocationAccess,
  ProfileDetails,
  TractorBrand,
  TractorBrandRegister,
} from '@screens/auth';

import {
  MyTractorsScreen,
  AddTractorDetailsScreen,
  MainTractorBrandScreen,
  ManageAddressScreen,
  BookingsScreen,
  AddLocation,
  ChooseLanguageScreen,
  SendFeedbackScreen,
  ReportIssueScreen,
  InvoiceScreen,
  AboutScreen,
  FaqScreen,
  UpdateProfileScreen,
  BookingDetailsScreen,
  AboutTractorWalla,
  JoinTeam,
  PrivacyPolicy,
  TermsConditions,
  ContactUs,
  NotificationScreen,
  BuyPartsScreen,
  PartsOverviewScreen,
  BookServiceScreen,
  ApplyCouponsScreen,
  ServiceOverviewScreen,
  ServiceCheckoutScreen,
  EmergencyRoadsideScreen,
  CategoryOverviewScreen,
  SearchServicesScreen,
  TractorPurchaseScreen,
  SelectTractorScreen,
  ServiceAvailabilityScreen,
  BookingStatusScreen,
  TrackMechanicScreen,
  ServiceCompletionScreen,
  ServiceProgressScreen,
  ServiceFinalPaymentScreen,
  ServiceInvoiceSummaryScreen,
  LeaveReviewScreen,
} from '@screens/main';
import TabNavigator from '@navigation/TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    initialRouteName="Loading"
    screenOptions={{ headerShown: false }}
  >
    <AuthStack.Screen name="Loading" component={Loading} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="OtpVerification" component={OtpVerification} />
    <AuthStack.Screen name="LocationAccess" component={LocationAccess} />
    <AuthStack.Screen name="ProfileDetails" component={ProfileDetails} />
    <AuthStack.Screen name="TractorBrand" component={TractorBrand} />
    <AuthStack.Screen name="TractorBrandRegister" component={TractorBrandRegister} />
  </AuthStack.Navigator>
);

const RootNavigator = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="MyTractors" component={MyTractorsScreen} />
            <Stack.Screen name="MainTractorBrand" component={MainTractorBrandScreen} />
            <Stack.Screen name="ManageAddress" component={ManageAddressScreen} />
            <Stack.Screen name="Bookings" component={BookingsScreen} />
            <Stack.Screen name="TractorDetails" component={AddTractorDetailsScreen} />
            <Stack.Screen name="AddTractorDetails" component={AddTractorDetailsScreen} />
            <Stack.Screen name="AddLocation" component={AddLocation} />
            <Stack.Screen name="ChooseLanguage" component={ChooseLanguageScreen} />
            <Stack.Screen name="SendFeedback" component={SendFeedbackScreen} />
            <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
            <Stack.Screen name="Invoice" component={InvoiceScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="FAQ" component={FaqScreen} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
            <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
            <Stack.Screen name="AboutTractorWalla" component={AboutTractorWalla} />
            <Stack.Screen name="JoinTeam" component={JoinTeam} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="BuyParts" component={BuyPartsScreen} />
            <Stack.Screen name="PartsOverview" component={PartsOverviewScreen} />
            <Stack.Screen name="BookService" component={BookServiceScreen} />
            <Stack.Screen name="ApplyCoupons" component={ApplyCouponsScreen} />
            <Stack.Screen name="ServiceOverview" component={ServiceOverviewScreen} />
            <Stack.Screen name="ServiceCheckout" component={ServiceCheckoutScreen} />
            <Stack.Screen name="EmergencyRoadside" component={EmergencyRoadsideScreen} />
            <Stack.Screen name="CategoryOverview" component={CategoryOverviewScreen} />
            <Stack.Screen name="SearchServices" component={SearchServicesScreen} />
            <Stack.Screen name="TractorPurchase" component={TractorPurchaseScreen} />
            <Stack.Screen name="SelectTractor" component={SelectTractorScreen} />
            <Stack.Screen name="ServiceAvailability" component={ServiceAvailabilityScreen} />
            <Stack.Screen name="BookingStatus" component={BookingStatusScreen} />
            <Stack.Screen name="TrackMechanic" component={TrackMechanicScreen} />
            <Stack.Screen name="ServiceCompletion" component={ServiceCompletionScreen} />
            <Stack.Screen name="ServiceProgress" component={ServiceProgressScreen} />
            <Stack.Screen name="ServiceFinalPayment" component={ServiceFinalPaymentScreen} />
            <Stack.Screen name="ServiceInvoiceSummary" component={ServiceInvoiceSummaryScreen} />
            <Stack.Screen name="LeaveReview" component={LeaveReviewScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
