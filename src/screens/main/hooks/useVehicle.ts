import { apiService } from '@api';
import { useSnackbarStore } from '@store/useSnackbarStore';
import { useAuthStore } from '@store/useAuthStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useUpdateVehicle = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: (response: any, variables) => {
      // Refresh the specific vehicle and the customer's vehicle list
      queryClient.invalidateQueries({ queryKey: ['vehicle', variables.vehicleId] });
      const user = useAuthStore.getState().user;
      if (user?._id) {
        queryClient.invalidateQueries({ queryKey: ['vehicles', user._id] });
      }
      showSnackbar({ 
        type: 'success', 
        title: 'Success', 
        description: response.message || response.data?.message || 'Vehicle updated successfully' 
      });
    },
    onError: (error: any) => {
      showSnackbar({ 
        type: 'error', 
        title: 'Error', 
        description: error.message || 'Failed to update vehicle' 
      });
    }
  });
};

export const useDeleteVehicle = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: (response: any, vehicleId) => {
      const state = useAuthStore.getState();
      const user = state.user;
      
      if (user?._id) {
        // Sync with global user store if needed
        if (user.tractors) {
          const updatedTractors = user.tractors.filter((t: any) => t.id !== vehicleId && t._id !== vehicleId);
          state.setUser({ ...user, tractors: updatedTractors });
        }
        queryClient.invalidateQueries({ queryKey: ['vehicles', user._id] });
      }
      
      showSnackbar({ 
        type: 'success', 
        title: 'Success', 
        description: response.message || response.data?.message || 'Vehicle deleted successfully' 
      });
    },
    onError: (error: any) => {
      showSnackbar({ 
        type: 'error', 
        title: 'Error', 
        description: error.message || 'Failed to delete vehicle' 
      });
    }
  });
};
