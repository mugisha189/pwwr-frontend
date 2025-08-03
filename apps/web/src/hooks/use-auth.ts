import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export function useLogin() {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => api.post('/auth/login', data).then((res) => res.data),
    onSuccess: (res) => {
      console.log(res);
      Cookies.set('accessToken', res.accessToken, { expires: 1, sameSite: 'Strict' });
      Cookies.set('refreshToken', res.refreshToken, { expires: 7, sameSite: 'Strict' });
      toast.success('Logged in successfully');
    },  
    onError: (error: any) => toast.error(error?.response?.data?.error || 'Login failed'),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: { email: string; password: string; name: string }) =>
      api.post('/auth/register', data).then((res) => res.data),
    onSuccess: (res) => {
      console.log(res);
      Cookies.set('accessToken', res.accessToken, { expires: 1, sameSite: 'Strict' });
      Cookies.set('refreshToken', res.refreshToken, { expires: 7, sameSite: 'Strict' });
      toast.success('Account created successfully');
    },
    onError: (error: any) => toast.error(error?.response?.data?.error || 'Registration failed'),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: { email: string }) => api.post('/auth/forgot-password', data).then((res) => res.data),
    onSuccess: () => toast.success('Password reset email sent'),
    onError: (error: any) => toast.error(error?.response?.data?.error || 'Failed to send reset email'),
  });
}

export function useNewPassword() {
  return useMutation({
    mutationFn: (data: { email: string; password: string; token: string }) =>
      api.post('/auth/new-password', data).then((res) => res.data),
    onSuccess: () => toast.success('Password updated successfully'),
    onError: (error: any) => toast.error(error?.response?.data?.error || 'Failed to update password'),
  });
}

export function useVerifyMail() {
  return useMutation({
    mutationFn: (data: { email: string; code: string }) => api.post('/auth/verify-mail', data).then((res) => res.data),
    onSuccess: () => toast.success('Email verified successfully'),
    onError: (error: any) => toast.error(error?.response?.data?.error || 'Email verification failed'),
  });
}

export function useSendVerificationEmail() {
  return useMutation({
    mutationFn: (data: { email: string }) => api.post('/auth/send-verification-email', data).then((res) => res.data),
    onSuccess: () => toast.success('Verification email sent'),
    onError: (error: any) => toast.error(error?.response?.data?.error || 'Failed to send verification email'),
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (data: { token: string }) => api.post('/auth/refresh-token', data).then((res) => res.data),
    onSuccess: () => toast.success('Token refreshed'),
    onError: (error: any) => toast.error(error?.response?.data?.error || 'Token refresh failed'),
  });
}
