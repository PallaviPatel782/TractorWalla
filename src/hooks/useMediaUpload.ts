import { useMutation } from '@tanstack/react-query';
import { apiService } from '@api';

export interface MediaFile {
  uri: string;
  name: string;
  type: string;
}


const uploadMedia = async (images: MediaFile[] | FormData): Promise<string[]> => {
  let formData: FormData;

  if (images instanceof FormData) {
    formData = images;
  } else {
    formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image as any);
    });
  }


  return apiService.post<string[]>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const useMediaUpload = (options?: {
  onSuccess?: (urls: string[]) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: uploadMedia,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};

export default useMediaUpload;
