import api from '@/lib/axios'

export interface Room {
  id: string
  name: string
  description?: string
  code: string
  isPrivate: boolean
  ownerId: string
  createdAt: string
  updatedAt: string
  _count?: {
    members: number
  }
}

export interface CreateRoomInput {
  name: string
  description?: string
  isPrivate?: boolean
}

export interface JoinRoomInput {
  code: string
}

export const roomsService = {
  getRooms: async (): Promise<Room[]> => {
    const response = await api.get('/rooms')
    return response.data.data
  },

  createRoom: async (data: CreateRoomInput): Promise<Room> => {
    const response = await api.post('/rooms', data)
    return response.data.data
  },

  joinRoom: async (data: JoinRoomInput): Promise<Room> => {
    const response = await api.post('/rooms/join', data)
    return response.data.data
  },

  deleteRoom: async (roomId: string): Promise<void> => {
    await api.delete(`/rooms/${roomId}`)
  }
}
