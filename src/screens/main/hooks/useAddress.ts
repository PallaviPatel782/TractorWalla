import { apiService } from '@api';
import { useSnackbarStore } from '@store/useSnackbarStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useCreateAddress = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        description: response.message || response.data?.message || 'Address created successfully'
      });
    },
    onError: (error: any) => {
      showSnackbar({
        type: 'error',
        title: 'Error',
        description: error.message || 'Failed to create address'
      });
    }
  });
};

export const useUpdateAddress = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddress,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        description: response.message || response.data?.message || 'Address updated successfully'
      });
    },
    onError: (error: any) => {
      showSnackbar({
        type: 'error',
        title: 'Error',
        description: error.message || 'Failed to update address'
      });
    }
  });
};

export const useSetDefaultAddress = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        description: response.message || response.data?.message || 'Default address set successfully'
      });
    },
    onError: (error: any) => {
      showSnackbar({
        type: 'error',
        title: 'Error',
        description: error.message || 'Failed to set default address'
      });
    }
  });
};

export const useDeleteAddress = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        description: response.message || response.data?.message || 'Address deleted successfully'
      });
    },
    onError: (error: any) => {
      showSnackbar({
        type: 'error',
        title: 'Error',
        description: error.message || 'Failed to delete address'
      });
    }
  });
};
