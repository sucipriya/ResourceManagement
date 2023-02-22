import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export const axiosMethod = {
  get: <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> => {
    return instance.get(url, config);
  },

  post: <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): ApiResponse<T> => {
    return instance.post(url, data, config);
  },

  put: <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): ApiResponse<T> => {
    return instance.put(url, data, config);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> => {
    return instance.delete(url, config);
  },
};
