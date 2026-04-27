import { apiService } from '@api';
import { useAuthStore } from '@store/useAuthStore';
import { useSnackbarStore } from '@store/useSnackbarStore';
import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useSendOtp = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  return useMutation({
    mutationFn: sendOtp,
    onSuccess: (response: any) => {
      showSnackbar({ type: 'success', title: 'Success', description: response.message || response.data?.message || 'OTP sent successfully' });
    },
    onError: (error: any) => {
      showSnackbar({ type: 'error', title: 'Error', description: error.message || 'Failed to send OTP' });
    }
  });
};

export const useVerifyOtp = () => {
  const setTokens = useAuthStore(state => state.setTokens);
  const setUser = useAuthStore(state => state.setUser);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data: any) => {
      setTokens(data.accessToken, data.refreshToken);
      let userData = data.user || data.data?.user || data.customer || data.data?.customer;
      if (userData) {
        userData = { ...userData, _id: userData.id || userData._id };
        console.log('--- useVerifyOtp: Setting User ---', userData);
        setUser(userData);
      }
      showSnackbar({ type: 'success', title: 'Welcome', description: data.message || data.data?.message || 'Login successful' });
    },
    onError: (error: any) => {
      showSnackbar({ type: 'error', title: 'Error', description: error.message || 'Invalid OTP' });
    }
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

export const useUpdateLocation = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  return useMutation({
    mutationFn: updateLocation,
    onSuccess: (response: any) => {
      showSnackbar({ type: 'success', title: 'Success', description: response.message || response.data?.message || 'Location updated' });
    },
    onError: (error: any) => showSnackbar({ type: 'error', title: 'Error', description: error.message || 'Update failed' })
  });
};

export const useUpdateProfile = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (response: any) => {
      const updateUser = useAuthStore.getState().updateUser;
      const userData = response.user || response.data?.user || response.customer || response.data?.customer;
      if (userData) {
        updateUser(userData);
      }
      showSnackbar({ type: 'success', title: 'Success', description: response.message || response.data?.message || 'Profile updated' });
    },
    onError: (error: any) => showSnackbar({ type: 'error', title: 'Error', description: error.message || 'Update failed' })
  });
};

export const useBrands = () => useQuery({ queryKey: ['brands'], queryFn: getBrands });

export const useModels = (brandId: string) => useQuery({
  queryKey: ['models', brandId],
  queryFn: () => getModels(brandId),
  enabled: !!brandId
});

export const useAddVehicle = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  return useMutation({
    mutationFn: addVehicle,
    onSuccess: (response: any) => {
      console.log('Vehicle add success, response:', response);
      const state = useAuthStore.getState();
      if (state.user) {
        const newVehicle = response.vehicle || response.data?.vehicle;
        const currentTractors = state.user.tractors || [];

        const updatedUser = {
          ...state.user,
          tractors: newVehicle ? [...currentTractors, newVehicle] : currentTractors,
        };
        console.log('Final Onboarding Update:', updatedUser);
        state.setUser(updatedUser);
      }
      showSnackbar({ type: 'success', title: 'Success', description: response.message || response.data?.message || 'Vehicle added' });
    },
    onError: (error: any) => {
      console.log('Vehicle add error:', error);
      showSnackbar({ type: 'error', title: 'Error', description: error.message || 'Failed to add vehicle' });
    }
  });
};
