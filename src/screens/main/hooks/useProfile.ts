import { apiService } from '@api';
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { ProfileResponse } from '@appTypes/api.types';

// API Endpoints
const getProfile = () => apiService.get<ProfileResponse>('/api/v1/customer/profile');

const patchProfile = (data: { name?: string; email?: string; latitude?: number; longitude?: number; address?: string; state?: string; pincode?: string }) =>
  apiService.patch<any>('/api/v1/customer/profile', data);

const patchProfilePhoto = (formData: FormData) =>
  apiService.post<any>('/api/v1/customer/profile/photo', formData, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000, // 60s timeout for file uploads on slower networks
  });

// Profile Hooks
export const useGetProfile = () => useQuery({ queryKey: ['profile'], queryFn: getProfile });

export const usePatchProfile = (options?: UseMutationOptions<any, Error, Parameters<typeof patchProfile>[0]>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchProfile,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.(data, ...args);
    },
    ...options,
  });
};

export const usePatchProfilePhoto = (options?: UseMutationOptions<any, Error, FormData>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchProfilePhoto,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.(data, ...args);
    },
    ...options,
  });
};
