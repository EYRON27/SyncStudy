import { Link } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, Users, DollarSign, FileText, Settings, LogOut } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="w-[260px] flex-shrink-0 bg-[#0a0a0c] border-r border-gray-800/50 flex flex-col h-screen overflow-y-auto relative z-20">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-lg shadow-[0_2px_10px_rgba(255,140,55,0.4)]">
            S
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SyncStudy</span>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex-1 px-4 py-2 space-y-1.5">
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#ff8c37]/10 to-transparent text-[#ff8c37] font-medium border border-[#ff8c37]/20">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link to="/tasks" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#13141a] transition-colors font-medium">
          <CheckSquare className="w-5 h-5" />
          Tasks
        </Link>
        <Link to="/study-rooms" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#13141a] transition-colors font-medium">
          <Users className="w-5 h-5" />
          Study Rooms
        </Link>
        <Link to="/expenses" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#13141a] transition-colors font-medium">
          <DollarSign className="w-5 h-5" />
          Expenses
        </Link>
        <Link to="/notes" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#13141a] transition-colors font-medium">
          <FileText className="w-5 h-5" />
          Notes
        </Link>
      </div>

      {/* User Profile & Settings */}
      <div className="p-4 mt-auto">
        <div className="bg-[#13141a] border border-gray-800/80 rounded-[16px] p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1a1c23] flex items-center justify-center text-[#ff8c37] font-bold border border-gray-800">
              AL
            </div>
            <div>
              <div className="text-white font-semibold text-[15px]">Alex Dev</div>
            </div>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1c23] transition-colors text-sm font-medium">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1c23] transition-colors text-sm font-medium">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
