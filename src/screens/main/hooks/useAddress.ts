import { apiService } from '@api';
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { AddressResponse, CustomerAddress } from '@appTypes';

// ==============================
// 🚀 API FUNCTIONS
// ==============================

const createAddress = (data: Partial<CustomerAddress>) =>
  apiService.post<AddressResponse>('/customer-address/create', data);

const getAllAddresses = () =>
  apiService.get<AddressResponse>('/customer-address/get-all');

const updateAddress = ({ addressId, data }: { addressId: string; data: Partial<CustomerAddress> }) =>
  apiService.put<AddressResponse>(`/customer-address/update/${addressId}`, data);

const setDefaultAddress = (addressId: string) =>
  apiService.patch<AddressResponse>(`/customer-address/set-default/${addressId}`, {});

const deleteAddress = (addressId: string) =>
  apiService.delete<AddressResponse>(`/customer-address/delete/${addressId}`);

// ==============================
// 🎣 ADDRESS HOOKS
// ==============================

export const useGetAllAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: getAllAddresses,
  });
};

export const useCreateAddress = (
  options?: UseMutationOptions<AddressResponse, Error, Partial<CustomerAddress>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useUpdateAddress = (
  options?: UseMutationOptions<AddressResponse, Error, { addressId: string; data: Partial<CustomerAddress> }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddress,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useSetDefaultAddress = (
  options?: UseMutationOptions<AddressResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useDeleteAddress = (
  options?: UseMutationOptions<AddressResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
