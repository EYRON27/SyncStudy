import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '@/store/authStore'

const SOCKET_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5000'

let socketInstance: Socket | null = null

/**
 * Returns a singleton Socket.IO connection authenticated with the user's JWT.
 * The socket is created once and reused across the app.
 */
export function useSocket(): Socket | null {
  const token = useAuthStore.getState().token
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!token) return

    // Reuse existing connection if already live
    if (socketInstance?.connected) {
      socketRef.current = socketInstance
      return
    }

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on('connect', () => {
      console.log('🔌 Socket connected:', socket.id)
    })

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message)
    })

    socketInstance = socket
    socketRef.current = socket

    return () => {
      // Don't disconnect the singleton — just clean up the ref
      socketRef.current = null
    }
  }, [token])

  return socketRef.current
}
