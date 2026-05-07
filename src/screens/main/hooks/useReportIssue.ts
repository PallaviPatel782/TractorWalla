import { apiService } from '@api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

const reportIssue = (data: {
  category: string;
  message: string;
  photos: string[];
  reporterType: string;
}) => apiService.post('/v1/customer/report-issues', data);

export const useReportIssue = (
  options?: UseMutationOptions<any, Error, {
    category: string;
    message: string;
    photos: string[];
    reporterType: string;
  }>
) => {
  return useMutation({
    mutationFn: reportIssue,
    ...options,
  });
};
