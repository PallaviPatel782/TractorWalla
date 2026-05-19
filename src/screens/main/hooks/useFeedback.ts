import { apiService } from '@api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

const submitFeedback = (data: {
  // rating: number;
  message: string;
}) => apiService.post('/api/v1/customer/feedback', data);

export const useSubmitFeedback = (
  options?: UseMutationOptions<any, Error, {
    // rating: number;
    message: string;
  }>
) => {
  return useMutation({
    mutationFn: submitFeedback,
    ...options,
  });
};
