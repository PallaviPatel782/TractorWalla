import { apiService } from '@api';
import { useSnackbarStore } from '@store/useSnackbarStore';
import { useMutation } from '@tanstack/react-query';

// ==============================
// 🚀 API FUNCTIONS
// ==============================

const createTractorLead = (data: any) => 
  apiService.post('/v1/customer/tractor-leads', data);

// ==============================
// 🎣 TRACTOR LEAD HOOKS
// ==============================

export const useCreateTractorLead = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  return useMutation({
    mutationFn: createTractorLead,
    onSuccess: (response: any) => {
      showSnackbar({ 
        type: 'success', 
        title: 'Success', 
        description: response.message || response.data?.message || 'Inquiry submitted successfully' 
      });
    },
    onError: (error: any) => {
      showSnackbar({ 
        type: 'error', 
        title: 'Error', 
        description: error.message || 'Failed to submit inquiry' 
      });
    }
  });
};
