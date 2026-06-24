import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Users, Settings, Mic, MicOff, Video, MonitorUp, PhoneOff, MessageSquare, Send, Loader2 } from 'lucide-react'
import { roomsService } from '@/features/rooms/api/rooms.service'
import type { Room } from '@/features/rooms/api/rooms.service'
import { messagesService } from '@/features/rooms/api/messages.service'
import type { ChatMessage } from '@/features/rooms/api/messages.service'
import { useAuthStore } from '@/store/authStore'
import { useSocket } from '@/hooks/useSocket'
import CreateRoomModal from '@/components/dashboard/CreateRoomModal'
import JoinRoomModal from '@/components/dashboard/JoinRoomModal'

export default function StudyRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [msgLoading, setMsgLoading] = useState(false)
  const [messageInput, setMessageInput] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const socket = useSocket()
  const currentUser = useAuthStore(s => s.user)

  // ─── Load rooms ────────────────────────────────────────────────────────────
  const loadRooms = useCallback(async () => {
    try {
      const data = await roomsService.getRooms()
      setRooms(data)
      if (data.length > 0 && !activeRoomId) {
        setActiveRoomId(data[0].id)
      }
    } catch (err) {
      console.error('Failed to load rooms:', err)
    }
  }, [activeRoomId])

  useEffect(() => {
    loadRooms()
  }, [])

  // ─── Load message history & join socket room ───────────────────────────────
  useEffect(() => {
    if (!activeRoomId) return

    const loadHistory = async () => {
      setMsgLoading(true)
      try {
        const history = await messagesService.getMessages(activeRoomId)
        setMessages(history)
      } catch (err) {
        console.error('Failed to load messages:', err)
      } finally {
        setMsgLoading(false)
      }
    }

    loadHistory()
  }, [activeRoomId])

  // ─── Socket: join/leave rooms, listen for new messages ────────────────────
  useEffect(() => {
    if (!socket || !activeRoomId) return

    // Join the new room
    socket.emit('chat:join', { roomId: activeRoomId })

    // Listen for incoming messages
    const handleMessage = ({ message }: { message: ChatMessage }) => {
      setMessages(prev => [...prev, message])
    }
    socket.on('chat:message', handleMessage)

    return () => {
      // Leave when switching rooms
      socket.emit('chat:leave', { roomId: activeRoomId })
      socket.off('chat:message', handleMessage)
    }
  }, [socket, activeRoomId])

  // ─── Auto-scroll to latest message ────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ─── Send message ──────────────────────────────────────────────────────────
  const sendMessage = () => {
    if (!messageInput.trim() || !socket || !activeRoomId || !currentUser) return

    socket.emit('chat:message', {
      roomId: activeRoomId,
      content: messageInput.trim(),
      senderId: currentUser.id
    })
    setMessageInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const activeRoom = rooms.find(r => r.id === activeRoomId)

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const getInitials = (name: string) =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const formatDateLabel = (date: string) => {
    const d = new Date(date)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) return 'Today'
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  // Group messages by date
  const groupedMessages = messages.reduce<{ label: string; msgs: ChatMessage[] }[]>((groups, msg) => {
    const label = formatDateLabel(msg.createdAt)
    const last = groups[groups.length - 1]
    if (last && last.label === label) {
      last.msgs.push(msg)
    } else {
      groups.push({ label, msgs: [msg] })
    }
    return groups
  }, [])

  const avatarColors = ['bg-indigo-600', 'bg-emerald-600', 'bg-[#e65c00]', 'bg-purple-600', 'bg-pink-600', 'bg-teal-600']
  const getAvatarColor = (userId: string) =>
    avatarColors[userId.charCodeAt(0) % avatarColors.length]

  return (
    <div className="flex h-screen bg-[#0f1015] font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        
        <main className="flex-1 overflow-x-auto overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-[1600px] mx-auto min-w-[1000px] relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 flex-shrink-0">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Study Rooms</h1>
                <p className="text-gray-400 text-[14px]">Collaborate with peers in real-time.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsJoinModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-[#1a1c23] border border-gray-700 text-white text-[14px] font-bold hover:bg-[#252836] transition-colors"
                >
                  Join Room
                </button>
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[14px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)]"
                >
                  Create Room
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex gap-6 flex-1 min-h-0">
              {/* Left Column: Active Rooms */}
              <div className="w-[280px] flex-shrink-0 bg-[#121317] border border-gray-800/80 rounded-[20px] p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-5 h-5 text-gray-400" />
                  <h2 className="text-white font-bold text-[15px]">Active Rooms</h2>
                </div>
                <div className="space-y-2 overflow-y-auto flex-1 custom-scrollbar">
                  {rooms.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-4">No rooms joined yet.</div>
                  )}
                  {rooms.map(room => (
                    <div 
                      key={room.id}
                      onClick={() => setActiveRoomId(room.id)}
                      className={`p-4 rounded-[14px] cursor-pointer transition-colors ${
                        activeRoomId === room.id 
                          ? 'bg-[#1a1c23] border border-gray-700/60' 
                          : 'hover:bg-[#1a1c23]/50 border border-transparent'
                      }`}
                    >
                      <h3 className="text-white font-semibold text-[14px] mb-2">{room.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          {room._count?.members || 1} members
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono bg-[#121317] px-2 py-0.5 rounded border border-gray-800">
                          {room.code}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Column: Video Area */}
              <div className="flex-1 bg-[#121317] border border-gray-800/80 rounded-[20px] flex flex-col overflow-hidden">
                {/* Video Header */}
                <div className="p-6 border-b border-gray-800/50 flex justify-between items-start">
                  <div>
                    <h2 className="text-white font-bold text-lg mb-1">
                      {activeRoom ? activeRoom.name : 'Select a room'}
                    </h2>
                    <p className="text-gray-400 text-[13px] font-medium">
                      {activeRoom?.description || 'Collaborate with your peers.'}
                    </p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-800">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>

                {/* Video Grid placeholder */}
                <div className="flex-1 p-6 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((userNum) => (
                    <div key={userNum} className="bg-[#16171d] rounded-[16px] relative flex items-center justify-center overflow-hidden border border-gray-800/50 group">
                      <Users className="w-16 h-16 text-[#1a1c23]" />
                      <div className="absolute bottom-4 left-4 bg-[#121317]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <span className="text-white text-[12px] font-semibold">User {userNum}</span>
                        {userNum === 2 && <MicOff className="w-3.5 h-3.5 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Video Controls */}
                <div className="h-[80px] border-t border-gray-800/50 flex items-center justify-center gap-4 px-6 bg-[#121317]">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#1a1c23] text-gray-400 hover:text-white hover:bg-[#252836]'}`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button className="w-12 h-12 rounded-full bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252836] transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252836] transition-colors">
                    <MonitorUp className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors">
                    <PhoneOff className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Chat */}
              <div className="w-[320px] flex-shrink-0 bg-[#121317] border border-gray-800/80 rounded-[20px] flex flex-col">
                <div className="p-5 border-b border-gray-800/50 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[#ff8c37]" />
                  <h2 className="text-white font-bold text-[15px]">Room Chat</h2>
                  {socket?.connected && (
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-400 text-[10px] font-semibold">Live</span>
                    </div>
                  )}
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar flex flex-col gap-4">
                  {msgLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-[#ff8c37] animate-spin" />
                    </div>
                  ) : !activeRoomId ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm text-center">
                      Select a room to start chatting
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm text-center">
                      No messages yet.<br/>Be the first to say hi! 👋
                    </div>
                  ) : (
                    groupedMessages.map(group => (
                      <div key={group.label}>
                        <div className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                          {group.label}
                        </div>
                        <div className="flex flex-col gap-4">
                          {group.msgs.map(msg => {
                            const isMe = msg.senderId === currentUser?.id
                            return (
                              <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                {msg.sender.avatarUrl ? (
                                  <img
                                    src={msg.sender.avatarUrl}
                                    alt={msg.sender.name}
                                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                                  />
                                ) : (
                                  <div className={`w-8 h-8 rounded-full ${getAvatarColor(msg.senderId)} flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold`}>
                                    {getInitials(msg.sender.name)}
                                  </div>
                                )}
                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-gray-300 text-[11px] font-semibold">
                                      {isMe ? 'You' : msg.sender.name}
                                    </span>
                                    <span className="text-gray-600 text-[10px]">{formatTime(msg.createdAt)}</span>
                                  </div>
                                  <div className={`p-3 rounded-[14px] text-[13px] leading-relaxed break-words ${
                                    isMe 
                                      ? 'bg-[#ff8c37]/10 border border-[#ff8c37]/30 text-[#ff8c37] rounded-tr-sm' 
                                      : 'bg-[#1a1c23] border border-gray-800/80 text-gray-300 rounded-tl-sm'
                                  }`}>
                                    {msg.content}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-800/50">
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={activeRoomId ? 'Type a message... (Enter to send)' : 'Select a room first'}
                      disabled={!activeRoomId || !socket?.connected}
                      className="w-full bg-[#1a1c23] border border-gray-800/80 rounded-full py-3 pl-4 pr-12 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button 
                      onClick={sendMessage}
                      disabled={!messageInput.trim() || !socket?.connected}
                      className="absolute right-2 w-8 h-8 rounded-full bg-[#2a2d3c] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#ff8c37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 -ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Modals */}
            <CreateRoomModal 
              isOpen={isCreateModalOpen} 
              onClose={() => setIsCreateModalOpen(false)} 
              onRoomCreated={loadRooms} 
            />
            <JoinRoomModal 
              isOpen={isJoinModalOpen} 
              onClose={() => setIsJoinModalOpen(false)} 
              onRoomJoined={loadRooms} 
            />
          </div>
        </main>
      </div>
    </div>
  )
}
