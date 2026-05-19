import { apiService } from '@api';
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { AddressResponse, CustomerAddress } from '@appTypes';

// API Endpoints
const createAddress = (data: Partial<CustomerAddress>) =>
  apiService.post<AddressResponse>('/api/v1/customer/addresses/create', data);

const getAllAddresses = () =>
  apiService.get<AddressResponse>('/api/v1/customer/addresses/get-all');

const updateAddress = ({ addressId, data }: { addressId: string; data: Partial<CustomerAddress> }) =>
  apiService.put<AddressResponse>(`/api/v1/customer/addresses/update/${addressId}`, data);

const setDefaultAddress = (addressId: string) =>
  apiService.patch<AddressResponse>(`/api/v1/customer/addresses/set-default/${addressId}`, {});

const deleteAddress = (addressId: string) =>
  apiService.delete<AddressResponse>(`/api/v1/customer/addresses/delete/${addressId}`);

// Address Hooks
export const useGetAllAddresses = () => useQuery({ queryKey: ['addresses'], queryFn: getAllAddresses });

const useAddressMutation = <TVariables>(
  mutationFn: (variables: TVariables) => Promise<AddressResponse>,
  options?: UseMutationOptions<AddressResponse, Error, TVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useCreateAddress = (options?: UseMutationOptions<AddressResponse, Error, Partial<CustomerAddress>>) =>
  useAddressMutation(createAddress, options);

export const useUpdateAddress = (options?: UseMutationOptions<AddressResponse, Error, { addressId: string; data: Partial<CustomerAddress> }>) =>
  useAddressMutation(updateAddress, options);

export const useSetDefaultAddress = (options?: UseMutationOptions<AddressResponse, Error, string>) =>
  useAddressMutation(setDefaultAddress, options);

export const useDeleteAddress = (options?: UseMutationOptions<AddressResponse, Error, string>) =>
  useAddressMutation(deleteAddress, options);
