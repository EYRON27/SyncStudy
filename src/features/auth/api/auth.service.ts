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

export const authService = {
  login: async (credentials: Record<string, string>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  register: async (data: Record<string, string>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data
  },
}
