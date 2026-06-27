import api from '@/lib/axios'
import type { User } from '@/store/authStore'

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    token: string
    user: User
  }
}

export interface RegisterResponse {
  success: boolean
  message: string
  data: {
    email: string
  }
}

export const authService = {
  login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  register: async (data: Record<string, string>): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', data)
    return response.data
  },

  verifyOtp: async (email: string, code: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/verify-otp', { email, code })
    return response.data
  },

  googleLogin: async (googleToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/google', { googleToken })
    return response.data
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (data: Record<string, string>): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/auth/reset-password', data)
    return response.data
  },
}
