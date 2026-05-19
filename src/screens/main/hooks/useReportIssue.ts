import { apiService } from '@api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

const reportIssue = (data: FormData) =>
  apiService.post('/api/v1/customer/report-issues', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const useReportIssue = (
  options?: UseMutationOptions<any, Error, FormData>
) => {
  return useMutation({
    mutationFn: reportIssue,
    ...options,
  });
};
