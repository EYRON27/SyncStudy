import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Users, Settings, Mic, MicOff, Video, MonitorUp, PhoneOff, MessageSquare, Send } from 'lucide-react'

export default function StudyRoomsPage() {
  const activeRooms = [
    { id: 1, name: 'CS-101 Final Prep', online: 12, isActive: true },
    { id: 2, name: 'Math Study Group', online: 5, isActive: false },
    { id: 3, name: 'Silent Library', online: 45, isActive: false },
    { id: 4, name: 'Project Team A', online: 4, isActive: false },
  ]

  const chatMessages = [
    { id: 1, user: 'User 1', avatar: 'U1', avatarColor: 'bg-indigo-600', time: '10:42 AM', text: 'Hey everyone! Should we start going over the practice exam?', isYou: false },
    { id: 2, user: 'User 3', avatar: 'U3', avatarColor: 'bg-[#e65c00]', time: '10:43 AM', text: "Yeah let's do it.", isYou: false },
    { id: 3, user: 'You', avatar: 'AL', avatarColor: 'bg-[#ff8c37]', time: '10:44 AM', text: "Yes. I'm stuck on question 4. Can someone explain the time complexity part?", isYou: true },
    { id: 4, user: 'User 2', avatar: 'U2', avatarColor: 'bg-emerald-600', time: '10:45 AM', text: "I think it's O(n log n) because of the sorting step.", isYou: false },
  ]

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
              <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[14px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)]">
                Create Room
              </button>
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
                  {activeRooms.map(room => (
                    <div 
                      key={room.id}
                      className={`p-4 rounded-[14px] cursor-pointer transition-colors ${
                        room.isActive 
                          ? 'bg-[#1a1c23] border border-gray-700/60' 
                          : 'hover:bg-[#1a1c23]/50 border border-transparent'
                      }`}
                    >
                      <h3 className="text-white font-semibold text-[14px] mb-2">{room.name}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        {room.online} online
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
                    <h2 className="text-white font-bold text-lg mb-1">CS-101 Final Prep</h2>
                    <p className="text-gray-400 text-[13px] font-medium">Discussing chapter 8 algorithms.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#4a5578] border-2 border-[#121317] flex items-center justify-center text-white text-[10px] font-bold z-40">U1</div>
                      <div className="w-8 h-8 rounded-full bg-[#4a6378] border-2 border-[#121317] flex items-center justify-center text-white text-[10px] font-bold z-30">U2</div>
                      <div className="w-8 h-8 rounded-full bg-[#524a78] border-2 border-[#121317] flex items-center justify-center text-white text-[10px] font-bold z-20">U3</div>
                      <div className="w-8 h-8 rounded-full bg-[#4a7876] border-2 border-[#121317] flex items-center justify-center text-white text-[10px] font-bold z-10">U4</div>
                      <div className="w-8 h-8 rounded-full bg-[#1a1c23] border-2 border-[#121317] flex items-center justify-center text-gray-300 text-[10px] font-bold z-0">+8</div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-800">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Video Grid */}
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
                  <button className="w-12 h-12 rounded-full bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252836] transition-colors">
                    <Mic className="w-5 h-5" />
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
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar flex flex-col gap-6">
                  <div className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Today, 10:30 AM
                  </div>
                  
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isYou ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full ${msg.avatarColor} flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold`}>
                        {msg.avatar}
                      </div>
                      <div className={`flex flex-col ${msg.isYou ? 'items-end' : 'items-start'} max-w-[80%]`}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-gray-300 text-[11px] font-semibold">{msg.user}</span>
                          <span className="text-gray-600 text-[10px] font-medium">{msg.time}</span>
                        </div>
                        <div className={`p-3.5 rounded-[14px] text-[13px] leading-relaxed ${
                          msg.isYou 
                            ? 'bg-[#ff8c37]/10 border border-[#ff8c37]/30 text-[#ff8c37] rounded-tr-sm' 
                            : 'bg-[#1a1c23] border border-gray-800/80 text-gray-300 rounded-tl-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-800/50">
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="w-full bg-[#1a1c23] border border-gray-800/80 rounded-full py-3 pl-4 pr-12 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 transition-all"
                    />
                    <button className="absolute right-2 w-8 h-8 rounded-full bg-[#2a2d3c] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#ff8c37] transition-colors">
                      <Send className="w-4 h-4 -ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
