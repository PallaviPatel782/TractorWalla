import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { useAuthStore } from '@store/useAuthStore';
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

const RootNavigator = () => {
  const auth = useAuthStore();
  const token = auth.token;
  const user = auth.user;
  
  // The condition to enter the app: must have at least one tractor OR onboardingCompleted flag is true
  const hasVehicle = !!(user?.tractors && user.tractors.length > 0) || !!user?.onboardingCompleted;
  const isAuthenticated = !!token;
  const isOnboarded = isAuthenticated && hasVehicle;

  const logout = auth.logout;

  React.useEffect(() => {
    // If we have a token but the user is not onboarded, 
    // we clear the token to force a fresh login/onboarding flow as requested.
    if (isAuthenticated && !isOnboarded && user && !user.onboardingCompleted) {
      console.log('--- RootNavigator: Forcing logout because not onboarded ---');
      logout();
    }
  }, [isAuthenticated, isOnboarded, user, logout]);

  console.log('--- RootNavigator Render ---', {
    isAuthenticated,
    isOnboarded,
    hasVehicle,
    user_id: user?._id || user?.id,
    onboardingCompleted: user?.onboardingCompleted
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          // AUTH & ONBOARDING STACK
          // Shown if user is not fully authenticated OR doesn't have a vehicle
          <>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="LocationAccess" component={LocationAccess} />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
            <Stack.Screen name="TractorBrand" component={TractorBrand} />
            <Stack.Screen name="TractorBrandRegister" component={TractorBrandRegister} />
          </>
        ) : (
          // MAIN APP STACK
          // Only shown when token exists AND at least one tractor exists
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
