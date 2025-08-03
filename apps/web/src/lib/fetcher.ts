import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '../types';
import { authApi } from './axios';

/**
 * Extracts error message from API response
 */
export function getResError(error: any, defaultMessage: string = 'Unknown error occurred'): string {
  if (!error) return 'Unknown error occurred';

  // Handle axios error structure
  if (error.response) {
    const { data } = error.response;

    // Check common error message structures
    if (data?.message) return data.message;
    if (data?.error?.message) return data.error.message;
    if (data?.error) return typeof data.error === 'string' ? data.error : 'An error occurred';
    if (data?.errors?.length) return data.errors[0].message || 'Validation error';
    if (data?.detail) return data.detail;

    return 'Server error';
  }

  // Handle string error
  if (typeof error === 'string') return error;

  // Handle Error object
  if (error instanceof Error) return error.message;

  return defaultMessage;
}

// Customized type-safety fetching methods
//* Only use it if you are sure backend return 'ApiResponse<T>' check ApiResponse type in types/index.ts
export async function Get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
  return await authApi.get<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, config);
}

export async function Post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return await authApi.post<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, data, config);
}

export async function Put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return await authApi.put<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, data, config);
}

export async function Patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return await authApi.patch<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, data, config);
}

export async function Delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
  return await authApi.delete<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, config);
}

export async function Head<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
  return await authApi.head<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, config);
}

export async function Options<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
  return await authApi.options<ApiResponse<T>, AxiosResponse<ApiResponse<T>>, D>(url, config);
}
