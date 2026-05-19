import { apiService } from '@api';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQuery, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

// API Endpoints
const getSingleVehicle = (vehicleId: string) =>
  apiService.get(`/api/v1/customer/vehicles/get-single/${vehicleId}`);

const updateVehicle = ({ vehicleId, data }: { vehicleId: string; data: any }) =>
  apiService.put(`/api/v1/customer/vehicles/update/${vehicleId}`, data);

const deleteVehicle = (vehicleId: string) =>
  apiService.delete(`/api/v1/customer/vehicles/delete/${vehicleId}`);

const getAllVehicles = () =>
  apiService.get('/api/v1/customer/vehicles/get-all');

// Vehicle Hooks
export const useGetSingleVehicle = (vehicleId: string) => useQuery({
  queryKey: ['vehicle', vehicleId],
  queryFn: () => getSingleVehicle(vehicleId),
  enabled: !!vehicleId,
});

export const useGetAllVehicles = () => useQuery({
  queryKey: ['vehicles'],
  queryFn: getAllVehicles,
});

export const useGetVehiclesByCustomerId = () => useQuery({
  queryKey: ['vehicles'],
  queryFn: getAllVehicles,
});

export const useUpdateVehicle = (options?: UseMutationOptions<any, Error, { vehicleId: string; data: any }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: (data, variables, ...args) => {
      queryClient.invalidateQueries({ queryKey: ['vehicle', variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      const user = useAuthStore.getState().user;
      if (user?._id) {
        queryClient.invalidateQueries({ queryKey: ['vehicles', user._id] });
      }
      options?.onSuccess?.(data, variables, ...args);
    },
    ...options,
  });
};

export const useDeleteVehicle = (options?: UseMutationOptions<any, Error, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: (data, vehicleId, ...args) => {
      const state = useAuthStore.getState();
      const user = state.user;
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      if (user?._id) {
        if (user.tractors) {
          const updatedTractors = user.tractors.filter((t: any) => t.id !== vehicleId && t._id !== vehicleId);
          state.setUser({ ...user, tractors: updatedTractors });
        }
        queryClient.invalidateQueries({ queryKey: ['vehicles', user._id] });
      }
      options?.onSuccess?.(data, vehicleId, ...args);
    },
    ...options,
  });
};
