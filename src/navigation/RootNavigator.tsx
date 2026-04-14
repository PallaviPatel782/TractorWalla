import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, AuthStackParamList } from '@navigation/NavigationTypes';
import {
  Loading,
  LoginScreen,
  OtpVerification,
  LocationAccess,
  ProfileDetails,
  TractorBrand,
  TractorSelection,
  TractorBrandRegister,
} from '@screens/auth';

import TabNavigator from '@navigation/TabNavigator';
import { useAppSelector } from '@store';

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
    <AuthStack.Screen name="TractorSelection" component={TractorSelection} />
    <AuthStack.Screen name="TractorBrandRegister" component={TractorBrandRegister} />
  </AuthStack.Navigator>
);

const RootNavigator = () => {
  // const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={TabNavigator} />
        {/* {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
