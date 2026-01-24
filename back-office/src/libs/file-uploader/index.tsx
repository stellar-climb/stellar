import { useState, useCallback } from 'react';
import { httpClient } from '../http-client';

export function useFileUpload() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  const uploadFile = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    setError(null);

    try {
      // 1. FormData 생성
      const formData = new FormData();
      formData.append('file', file);

      const { url } = await httpClient.post<{ url: string }>(`/files/upload`, formData);

      return url;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Upload failed');
      setError(errorObj);
      throw errorObj;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { uploadFile, isUploading, error };
}
