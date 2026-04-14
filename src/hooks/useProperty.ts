import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@api';

export const useProperties = (params?: any) => {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => apiService.get<any[]>('/properties', params),
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => apiService.get<any>(`/properties/${id}`),
    enabled: !!id,
  });
};

export const useCreateProperty = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => apiService.post('/properties', data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

export const useUpdateProperty = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiService.put(`/properties/${id}`, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

export const useDeleteProperty = (options?: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiService.delete(`/properties/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};

export const useUpdatePropertyStatus = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      apiService.put(`/properties/${id}`, { isActive }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};
