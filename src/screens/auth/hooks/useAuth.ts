import { apiService } from '@api';
import { useMutation, useQuery, UseMutationOptions } from '@tanstack/react-query';
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

// API endpoints
const sendOtp = (data: SendOtpRequest) => apiService.post<SendOtpResponse>('/api/v1/customer/auth/send-otp', data);
const verifyOtp = (data: VerifyOtpRequest) => apiService.post<VerifyOtpResponse>('/api/v1/customer/auth/verify-otp', data);
const getMe = () => apiService.get<ProfileResponse>('/api/v1/customer/auth/me');
const updateLocation = (data: OnboardingLocationRequest) => apiService.post('/api/v1/customer/onboarding/location', data);
const updateProfile = (data: OnboardingProfileRequest) => apiService.post('/api/v1/customer/onboarding/profile', data);
const getBrands = () => apiService.get<{ success: boolean; data?: Brand[]; brands?: Brand[] }>('/api/v1/customer/onboarding/brands');
const getModels = (brandId: string) => apiService.get<{ success: boolean; data?: Model[]; models?: Model[] }>(`/api/v1/customer/onboarding/brands/${brandId}/models`);
const addVehicle = (data: OnboardingVehicleRequest) => apiService.post('/api/v1/customer/onboarding/vehicle', data);

// Auth Hooks
export const useSendOtp = (options?: UseMutationOptions<SendOtpResponse, Error, SendOtpRequest>) => 
  useMutation({ mutationFn: sendOtp, ...options });

export const useVerifyOtp = (options?: UseMutationOptions<VerifyOtpResponse, Error, VerifyOtpRequest>) => 
  useMutation({ mutationFn: verifyOtp, ...options });

export const useGetMe = () => useQuery({ queryKey: ['me'], queryFn: getMe });

// Onboarding Hooks
export const useUpdateLocation = (options?: UseMutationOptions<any, Error, OnboardingLocationRequest>) =>
  useMutation({ mutationFn: updateLocation, ...options });

export const useUpdateProfile = (options?: UseMutationOptions<any, Error, OnboardingProfileRequest>) => 
  useMutation({ mutationFn: updateProfile, ...options });

export const useBrands = () => useQuery({ queryKey: ['brands'], queryFn: getBrands });

export const useModels = (brandId: string) => useQuery({
  queryKey: ['models', brandId],
  queryFn: () => getModels(brandId),
  enabled: !!brandId,
});

export const useAddVehicle = (options?: UseMutationOptions<any, Error, OnboardingVehicleRequest>) => 
  useMutation({ mutationFn: addVehicle, ...options });
