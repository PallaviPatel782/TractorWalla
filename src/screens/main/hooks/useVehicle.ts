import { apiService } from '@api';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

// ==============================
// 🚀 API FUNCTIONS
// ==============================

const getSingleVehicle = (vehicleId: string) =>
  apiService.get(`/customer-vehicle/get-single/${vehicleId}`);

const updateVehicle = ({ vehicleId, data }: { vehicleId: string; data: any }) =>
  apiService.put(`/customer-vehicle/update/${vehicleId}`, data);

const deleteVehicle = (vehicleId: string) =>
  apiService.delete(`/customer-vehicle/delete/${vehicleId}`);

const getVehiclesByCustomerId = (customerId: string) =>
  apiService.get(`/customer-vehicle/by-customer-id/${customerId}`);

// ==============================
// 🎣 VEHICLE HOOKS
// ==============================

export const useGetSingleVehicle = (vehicleId: string) => {
  return useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => getSingleVehicle(vehicleId),
    enabled: !!vehicleId,
  });
};

export const useGetVehiclesByCustomerId = (customerId: string) => {
  return useQuery({
    queryKey: ['vehicles', customerId],
    queryFn: () => getVehiclesByCustomerId(customerId),
    enabled: !!customerId,
  });
};

export const useUpdateVehicle = (
  options?: UseMutationOptions<any, Error, { vehicleId: string; data: any }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: (...args) => {
      const [, variables] = args;
      queryClient.invalidateQueries({ queryKey: ['vehicle', variables.vehicleId] });
      const user = useAuthStore.getState().user;
      if (user?._id) {
        queryClient.invalidateQueries({ queryKey: ['vehicles', user._id] });
      }
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useDeleteVehicle = (
  options?: UseMutationOptions<any, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: (...args) => {
      const [, variables] = args;
      const state = useAuthStore.getState();
      const user = state.user;

      if (user?._id) {
        if (user.tractors) {
          const updatedTractors = user.tractors.filter((t: any) => t.id !== variables && t._id !== variables);
          state.setUser({ ...user, tractors: updatedTractors });
        }
        queryClient.invalidateQueries({ queryKey: ['vehicles', user._id] });
      }
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
