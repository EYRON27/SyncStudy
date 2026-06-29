import { create } from 'zustand'

type Theme = 'dark' | 'light'
type SidebarState = 'expanded' | 'collapsed'

interface UIState {
  theme: Theme
  sidebar: SidebarState
  globalSearch: string
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setGlobalSearch: (search: string) => void
}

/**
 * Global UI state — theme preference, sidebar open/close, etc.
 */
export const useUIStore = create<UIState>()((set) => ({
  theme: 'dark',
  sidebar: 'expanded',
  globalSearch: '',
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () =>
    set((s) => ({ sidebar: s.sidebar === 'expanded' ? 'collapsed' : 'expanded' })),
  setGlobalSearch: (search) => set({ globalSearch: search })
}))
