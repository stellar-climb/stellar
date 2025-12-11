import axios from 'axios';

export const httpClient = (() => {
  let _authorization = '';

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_CORE_API_URL,
    headers: {
      Authorization: '',
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    if (_authorization) {
      config.headers.Authorization = _authorization;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data.data;
    },
    (error) => {
      return Promise.reject(error.response.data);
    }
  );

  return {
    setAuthorization: (accessToken: string) => {
      _authorization = accessToken;
    },

    async get<T>(
      url: string,
      options?: {
        params?: any;
        paramsSerializer?: (params: Record<string, any>) => any;
      }
    ): Promise<T> {
      return axiosInstance.get(url, options);
    },
    async post<T>(url: string, data?: any): Promise<T> {
      return axiosInstance.post(url, data);
    },

    async put<T>(url: string, data?: any): Promise<T> {
      return axiosInstance.put(url, data);
    },

    async delete<T>(url: string): Promise<T> {
      return axiosInstance.delete(url);
    },
  };
})();
