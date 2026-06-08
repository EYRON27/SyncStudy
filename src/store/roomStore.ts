import { create } from 'zustand'

interface Room {
  id: string
  name: string
  code: string
}

interface RoomState {
  activeRoom: Room | null
  setActiveRoom: (room: Room | null) => void
}

/**
 * Tracks which study room the user is currently in.
 */
export const useRoomStore = create<RoomState>()((set) => ({
  activeRoom: null,
  setActiveRoom: (activeRoom) => set({ activeRoom }),
}))
