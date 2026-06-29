import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Settings, Mic, MicOff, Video, VideoOff,
  MonitorUp, PhoneOff, MessageSquare, Send, Loader2,
  Video as VideoIcon, Hash, Crown, ArrowRight, Plus
} from 'lucide-react'
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
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isInCall, setIsInCall] = useState(false)
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
    setIsInCall(false)
  }, [activeRoomId])

  // ─── Socket: join/leave rooms, listen for new messages ────────────────────
  useEffect(() => {
    if (!socket || !activeRoomId) return

    socket.emit('chat:join', { roomId: activeRoomId })

    const handleMessage = ({ message }: { message: ChatMessage }) => {
      setMessages(prev => [...prev, message])
    }
    socket.on('chat:message', handleMessage)

    return () => {
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
              <div className="w-[260px] flex-shrink-0 bg-[#121317] border border-gray-800/80 rounded-[20px] p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <Users className="w-4 h-4 text-gray-400" />
                  <h2 className="text-white font-bold text-[14px]">Active Rooms</h2>
                  {rooms.length > 0 && (
                    <span className="ml-auto text-[10px] font-bold bg-[#ff8c37]/15 text-[#ff8c37] px-2 py-0.5 rounded-full">
                      {rooms.length}
                    </span>
                  )}
                </div>
                <div className="space-y-2 overflow-y-auto flex-1 custom-scrollbar">
                  {rooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#1a1c23] border border-gray-800 flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-[13px] font-semibold mb-1">No rooms yet</p>
                        <p className="text-gray-600 text-[11px]">Create or join a room to start</p>
                      </div>
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-1.5 text-[#ff8c37] text-[12px] font-bold hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Create a Room
                      </button>
                    </div>
                  ) : (
                    rooms.map(room => (
                      <button
                        key={room.id}
                        onClick={() => setActiveRoomId(room.id)}
                        className={`w-full text-left p-4 rounded-[14px] cursor-pointer transition-all ${
                          activeRoomId === room.id 
                            ? 'bg-[#ff8c37]/10 border border-[#ff8c37]/25' 
                            : 'hover:bg-[#1a1c23]/70 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <h3 className={`font-semibold text-[13px] truncate ${activeRoomId === room.id ? 'text-[#ff8c37]' : 'text-white'}`}>
                            {room.name}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between pl-5">
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {room._count?.members || 1} member{(room._count?.members || 1) !== 1 ? 's' : ''}
                          </div>
                          <div className="text-[10px] text-gray-500 font-mono bg-[#0f1015] px-2 py-0.5 rounded border border-gray-800/80">
                            {room.code}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Middle Column: Room Content */}
              <div className="flex-1 bg-[#121317] border border-gray-800/80 rounded-[20px] flex flex-col overflow-hidden">
                {!activeRoom ? (
                  /* No Room Selected State */
                  <div className="flex-1 flex flex-col items-center justify-center gap-6 p-12 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-[#1a1c23] border border-gray-800 flex items-center justify-center">
                      <VideoIcon className="w-9 h-9 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">No Room Selected</h3>
                      <p className="text-gray-400 text-[14px] max-w-xs">
                        Select a room from the left panel or create a new one to start collaborating.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsJoinModalOpen(true)}
                        className="px-5 py-2.5 rounded-full bg-[#1a1c23] border border-gray-700 text-white text-[13px] font-bold hover:bg-[#252836] transition-colors"
                      >
                        Join a Room
                      </button>
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[13px] font-bold hover:opacity-90 transition-opacity"
                      >
                        Create Room
                      </button>
                    </div>
                  </div>
                ) : !isInCall ? (
                  /* Lobby State - Room selected but not in call */
                  <div className="flex-1 flex flex-col">
                    {/* Room Header */}
                    <div className="p-6 border-b border-gray-800/50 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8c37]/20 to-[#e65c00]/10 border border-[#ff8c37]/20 flex items-center justify-center">
                          <Hash className="w-5 h-5 text-[#ff8c37]" />
                        </div>
                        <div>
                          <h2 className="text-white font-bold text-[16px]">{activeRoom.name}</h2>
                          <p className="text-gray-400 text-[12px]">
                            {activeRoom.description || 'Study together in real-time'}
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-800">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Lobby Content */}
                    <div className="flex-1 flex flex-col items-center justify-center p-12 gap-10">
                      {/* Room Card */}
                      <div className="w-full max-w-md bg-[#16171d] border border-gray-800/80 rounded-[24px] p-8 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff8c37]/20 to-purple-500/10 border border-[#ff8c37]/20 flex items-center justify-center mx-auto mb-5">
                          <VideoIcon className="w-10 h-10 text-[#ff8c37]" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{activeRoom.name}</h3>
                        <p className="text-gray-400 text-[14px] mb-6">
                          {activeRoom.description || 'Ready to start collaborating with your peers.'}
                        </p>

                        <div className="flex items-center justify-center gap-6 mb-8">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[16px]">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              {activeRoom._count?.members || 1}
                            </div>
                            <span className="text-gray-500 text-[11px]">Members</span>
                          </div>
                          <div className="w-px h-8 bg-gray-800" />
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1.5 font-mono font-bold text-gray-300 text-[16px]">
                              {activeRoom.code}
                            </div>
                            <span className="text-gray-500 text-[11px]">Room Code</span>
                          </div>
                          <div className="w-px h-8 bg-gray-800" />
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1.5 text-[#ff8c37] font-bold text-[16px]">
                              <Crown className="w-4 h-4" />
                              Host
                            </div>
                            <span className="text-gray-500 text-[11px]">You</span>
                          </div>
                        </div>

                        {/* Pre-join settings */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all border ${
                              isMuted
                                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                : 'bg-[#1a1c23] border-gray-700 text-gray-300 hover:text-white'
                            }`}
                          >
                            {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                            {isMuted ? 'Muted' : 'Mic On'}
                          </button>
                          <button
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all border ${
                              isVideoOff
                                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                : 'bg-[#1a1c23] border-gray-700 text-gray-300 hover:text-white'
                            }`}
                          >
                            {isVideoOff ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                            {isVideoOff ? 'Camera Off' : 'Camera On'}
                          </button>
                        </div>

                        <button
                          onClick={() => setIsInCall(true)}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-bold text-[15px] hover:opacity-90 transition-all shadow-[0_8px_20px_rgba(255,140,55,0.35)] hover:-translate-y-0.5"
                        >
                          <VideoIcon className="w-5 h-5" />
                          Join Call
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* In-Call State */
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col"
                    >
                      {/* Call Header */}
                      <div className="p-5 border-b border-gray-800/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-white font-bold text-[14px]">{activeRoom.name}</span>
                          </div>
                          <span className="text-gray-500 text-[11px] font-mono bg-[#16171d] border border-gray-800 px-2 py-0.5 rounded-md">LIVE</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-[12px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {activeRoom._count?.members || 1} in room
                        </div>
                      </div>

                      {/* Video Grid */}
                      <div className="flex-1 p-5 grid grid-cols-2 gap-3 min-h-0">
                        {/* Current User */}
                        <div className="bg-[#16171d] rounded-[18px] relative flex items-center justify-center overflow-hidden border border-gray-800/60">
                          {isVideoOff ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff8c37]/20 to-[#e65c00]/20 border border-[#ff8c37]/20 flex items-center justify-center">
                                <span className="text-[#ff8c37] font-black text-xl">
                                  {getInitials(currentUser?.name || 'Me')}
                                </span>
                              </div>
                              <span className="text-gray-500 text-[11px]">Camera off</span>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#16171d] to-[#1a1c23]">
                              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff8c37]/20 to-[#e65c00]/20 border border-[#ff8c37]/20 flex items-center justify-center">
                                <span className="text-[#ff8c37] font-black text-2xl">
                                  {getInitials(currentUser?.name || 'Me')}
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <span className="text-white text-[11px] font-semibold">You</span>
                            {isMuted && <MicOff className="w-3 h-3 text-red-400" />}
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="w-2 h-2 rounded-full bg-[#ff8c37]" />
                          </div>
                        </div>

                        {/* Waiting slots */}
                        {[1, 2, 3].map(i => (
                          <div key={i} className="bg-[#0f1012] rounded-[18px] border border-dashed border-gray-800/60 flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[#16171d] border border-gray-800 flex items-center justify-center">
                              <Users className="w-4 h-4 text-gray-700" />
                            </div>
                            <span className="text-gray-700 text-[11px] font-medium">Waiting for peers...</span>
                          </div>
                        ))}
                      </div>

                      {/* Video Controls */}
                      <div className="h-[76px] border-t border-gray-800/50 flex items-center justify-center gap-3 px-6">
                        <button 
                          onClick={() => setIsMuted(!isMuted)}
                          title={isMuted ? 'Unmute' : 'Mute'}
                          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                            isMuted
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                              : 'bg-[#1a1c23] text-gray-300 border border-gray-800 hover:text-white hover:bg-[#252836]'
                          }`}
                        >
                          {isMuted ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
                        </button>
                        <button
                          onClick={() => setIsVideoOff(!isVideoOff)}
                          title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
                          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                            isVideoOff
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                              : 'bg-[#1a1c23] text-gray-300 border border-gray-800 hover:text-white hover:bg-[#252836]'
                          }`}
                        >
                          {isVideoOff ? <VideoOff className="w-4.5 h-4.5" /> : <Video className="w-4.5 h-4.5" />}
                        </button>
                        <button
                          title="Share Screen"
                          className="w-11 h-11 rounded-full bg-[#1a1c23] border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#252836] transition-all"
                        >
                          <MonitorUp className="w-4.5 h-4.5" />
                        </button>
                        <div className="w-px h-6 bg-gray-800 mx-1" />
                        <button
                          onClick={() => setIsInCall(false)}
                          title="Leave Call"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all font-semibold text-[13px]"
                        >
                          <PhoneOff className="w-4 h-4" />
                          Leave Call
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Right Column: Chat */}
              <div className="w-[300px] flex-shrink-0 bg-[#121317] border border-gray-800/80 rounded-[20px] flex flex-col">
                <div className="p-5 border-b border-gray-800/50 flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[#ff8c37]" />
                  <h2 className="text-white font-bold text-[14px]">Room Chat</h2>
                  {socket?.connected && (
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-400 text-[10px] font-semibold">Live</span>
                    </div>
                  )}
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-4">
                  {msgLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-[#ff8c37] animate-spin" />
                    </div>
                  ) : !activeRoomId ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-8">
                      <MessageSquare className="w-8 h-8 text-gray-700" />
                      <p className="text-gray-500 text-[13px]">Select a room to chat</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-8">
                      <div className="text-3xl">👋</div>
                      <div>
                        <p className="text-gray-400 text-[13px] font-semibold mb-1">No messages yet</p>
                        <p className="text-gray-600 text-[11px]">Be the first to say hi!</p>
                      </div>
                    </div>
                  ) : (
                    groupedMessages.map(group => (
                      <div key={group.label}>
                        <div className="text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-4">
                          {group.label}
                        </div>
                        <div className="flex flex-col gap-3">
                          {group.msgs.map(msg => {
                            const isMe = msg.senderId === currentUser?.id
                            return (
                              <div key={msg.id} className={`flex gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                                {msg.sender.avatarUrl ? (
                                  <img
                                    src={msg.sender.avatarUrl}
                                    alt={msg.sender.name}
                                    className="w-7 h-7 rounded-full flex-shrink-0 object-cover"
                                  />
                                ) : (
                                  <div className={`w-7 h-7 rounded-full ${getAvatarColor(msg.senderId)} flex-shrink-0 flex items-center justify-center text-white text-[9px] font-bold`}>
                                    {getInitials(msg.sender.name)}
                                  </div>
                                )}
                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-gray-400 text-[10px] font-semibold">
                                      {isMe ? 'You' : msg.sender.name}
                                    </span>
                                    <span className="text-gray-600 text-[9px]">{formatTime(msg.createdAt)}</span>
                                  </div>
                                  <div className={`p-2.5 rounded-[12px] text-[12px] leading-relaxed break-words ${
                                    isMe 
                                      ? 'bg-[#ff8c37]/10 border border-[#ff8c37]/25 text-[#ff8c37] rounded-tr-sm' 
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
                      placeholder={activeRoomId ? 'Message...' : 'Select a room first'}
                      disabled={!activeRoomId || !socket?.connected}
                      className="w-full bg-[#1a1c23] border border-gray-800/80 rounded-full py-2.5 pl-4 pr-10 text-[12px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button 
                      onClick={sendMessage}
                      disabled={!messageInput.trim() || !socket?.connected}
                      className="absolute right-2 w-7 h-7 rounded-full bg-[#ff8c37] flex items-center justify-center text-white hover:bg-[#e65c00] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-[#2a2d3c]"
                    >
                      <Send className="w-3 h-3 -ml-0.5" />
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
