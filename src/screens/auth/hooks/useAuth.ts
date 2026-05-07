import { apiService } from '@api';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ProfileResponse,
  OnboardingLocationRequest,
  OnboardingProfileRequest,
  OnboardingVehicleRequest,
  Brand,
  Model
} from '@appTypes/api.types';

// ==============================
// 🚀 API FUNCTIONS
// ==============================

const sendOtp = (data: SendOtpRequest) => apiService.post<SendOtpResponse>('/auth/customer/send-otp', data);
const verifyOtp = (data: VerifyOtpRequest) => apiService.post<VerifyOtpResponse>('/auth/customer/verify-otp', data);
const getMe = () => apiService.get<ProfileResponse>('/auth/customer/me');
const updateLocation = (data: OnboardingLocationRequest) => apiService.post('/customer/onboarding/location', data);
const updateProfile = (data: OnboardingProfileRequest) => apiService.post('/customer/onboarding/profile', data);
const getBrands = () => apiService.get<{ success: boolean; ok?: boolean; data?: Brand[]; brands?: Brand[] }>('/customer/onboarding/brands');
const getModels = (brandId: string) => apiService.get<{ success: boolean; ok?: boolean; data?: Model[]; models?: Model[] }>(`/customer/onboarding/brands/${brandId}/models`);
const addVehicle = (data: OnboardingVehicleRequest) => apiService.post('/customer/onboarding/vehicle', data);

// ==============================
// 🎣 AUTH HOOKS
// ==============================

export const useSendOtp = (
  options?: UseMutationOptions<SendOtpResponse, Error, SendOtpRequest>
) => {
  return useMutation({
    mutationFn: sendOtp,
    ...options,
  });
};

export const useVerifyOtp = (
  options?: UseMutationOptions<VerifyOtpResponse, Error, VerifyOtpRequest>
) => {
  const setTokens = useAuthStore(state => state.setTokens);
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (...args) => {
      const [data] = args;
      setTokens(data.accessToken, data.refreshToken);
      let userData = data.user || data.data?.user || data.customer || data.data?.customer;
      if (userData) {
        userData = { ...userData, _id: userData.id || userData._id };
        console.log('--- useVerifyOtp: Setting User ---', userData);
        setUser(userData);
      }
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useGetMe = () => {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  useEffect(() => {
    let userData = query.data?.user || query.data?.customer;
    if (userData) {
      userData = { ...userData, _id: userData.id || userData._id };
      console.log('--- useGetMe: Updating User ---', userData);
      useAuthStore.getState().updateUser(userData);
    }
  }, [query.data]);

  return query;
};

// ==============================
// 🎣 ONBOARDING HOOKS
// ==============================

export const useUpdateLocation = (
  options?: UseMutationOptions<any, Error, OnboardingLocationRequest>
) => {
  return useMutation({
    mutationFn: updateLocation,
    ...options,
  });
};

export const useUpdateProfile = (
  options?: UseMutationOptions<any, Error, OnboardingProfileRequest>
) => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (...args) => {
      const [response] = args;
      const updateUser = useAuthStore.getState().updateUser;
      const userData = response.user || response.data?.user || response.customer || response.data?.customer;
      if (userData) {
        updateUser(userData);
      }
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useBrands = () => useQuery({ queryKey: ['brands'], queryFn: getBrands });

export const useModels = (brandId: string) => useQuery({
  queryKey: ['models', brandId],
  queryFn: () => getModels(brandId),
  enabled: !!brandId
});

export const useAddVehicle = (
  options?: UseMutationOptions<any, Error, OnboardingVehicleRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVehicle,
    onSuccess: (...args) => {
      const [response] = args;
      console.log('Vehicle add success, response:', response);
      const state = useAuthStore.getState();
      const user = state.user;

      if (user?._id) {
        // Invalidate the vehicles list for this customer
        queryClient.invalidateQueries({ queryKey: ['vehicles', user._id] });

        // Optionally update the local store as well
        const newVehicle = response.vehicle || response.data?.vehicle;
        const currentTractors = user.tractors || [];

        const updatedUser = {
          ...user,
          onboardingCompleted: true,
          tractors: newVehicle ? [...currentTractors, newVehicle] : currentTractors,
        };
        state.setUser(updatedUser);
      }
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
