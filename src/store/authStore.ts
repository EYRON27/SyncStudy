import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  /** Store user + JWT after successful login */
  login: (user: User, token: string) => void
  /** Clear session */
  logout: () => void
  /** Flip loading flag */
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'syncstudy-auth', // localStorage key
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
)
