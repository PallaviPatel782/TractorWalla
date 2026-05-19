import { apiService } from '@api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

// ==============================
// 🚀 API FUNCTIONS
// ==============================

const createTractorLead = (data: any) =>
  apiService.post('/api/v1/customer/tractor-leads', data);

// ==============================
// 🎣 TRACTOR LEAD HOOKS
// ==============================

export const useCreateTractorLead = (
  options?: UseMutationOptions<any, Error, any>
) => {
  return useMutation({
    mutationFn: createTractorLead,
    ...options,
  });
};
