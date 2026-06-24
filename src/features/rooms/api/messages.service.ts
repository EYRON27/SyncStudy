import api from '@/lib/axios'

export interface ChatMessage {
  id: string
  content: string
  fileUrl?: string
  createdAt: string
  roomId: string
  senderId: string
  sender: {
    id: string
    name: string
    avatarUrl?: string
  }
}

export const messagesService = {
  getMessages: async (roomId: string): Promise<ChatMessage[]> => {
    const response = await api.get(`/rooms/${roomId}/messages`)
    return response.data.data
  }
}
