import { useState } from 'react'
import { Search, Sparkles, Sun, Moon, Bell } from 'lucide-react'
import AskAIModal from './AskAIModal'
import NotificationsModal from './NotificationsModal'
import { useUIStore } from '@/store/uiStore'

export default function TopBar() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false)
  const [isLightMode, setIsLightMode] = useState(false)
  
  const { globalSearch, setGlobalSearch } = useUIStore()

  return (
    <div className="h-[80px] flex items-center justify-between px-8 border-b border-gray-800/50 bg-[#0f1015] relative z-50">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#ff8c37] transition-colors" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search commands, notes, or tasks (Cmd+K)"
            className="w-full bg-[#16171d] border border-gray-800 rounded-xl py-2.5 pl-10 pr-12 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#1a1c23] text-gray-400 text-[10px] font-bold tracking-widest border border-gray-800">
            ⌘K
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsAIModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff8c37]/30 bg-[#ff8c37]/10 text-[#ff8c37] hover:bg-[#ff8c37]/20 transition-colors text-sm font-semibold"
        >
          <Sparkles className="w-4 h-4" />
          Ask AI
        </button>
        <div className="w-px h-6 bg-gray-800 mx-1"></div>
        <button 
          onClick={() => setIsLightMode(!isLightMode)}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1a1c23] transition-colors"
        >
          {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setIsNotifModalOpen(true)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1a1c23] transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff8c37] rounded-full border-2 border-[#0f1015]"></span>
          </button>
          <NotificationsModal isOpen={isNotifModalOpen} onClose={() => setIsNotifModalOpen(false)} />
        </div>
      </div>

      <AskAIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  )
}
