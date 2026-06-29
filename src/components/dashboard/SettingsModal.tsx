import { X, Moon, Mail, Bell, Mic, Camera, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout()
      onClose()
      navigate('/')
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0f1015]/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[440px] bg-[#121317] border border-gray-800 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-7 overflow-hidden mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white font-bold text-[18px]">Settings</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-7 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
              
              {/* ACCOUNT */}
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Account
                </div>
                <div className="bg-[#16171d] border border-gray-800/80 rounded-[14px] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-[#1a1c23] border border-gray-700 flex items-center justify-center font-bold text-gray-400 text-[13px]">
                      AL
                    </div>
                    <div>
                      <div className="text-white font-bold text-[14px]">Alex Dev</div>
                      <div className="text-gray-500 text-[11px] font-medium mt-0.5">alex@university.edu • Pro Plan</div>
                    </div>
                  </div>
                  <button className="text-[#ff8c37] text-[12px] font-bold hover:underline">
                    Edit
                  </button>
                </div>
              </div>

              {/* APPEARANCE */}
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Appearance
                </div>
                <div className="bg-[#16171d] border border-gray-800/80 rounded-[14px] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Moon className="w-4 h-4 text-gray-400" />
                    <span className="text-[13px] font-medium">Dark Mode</span>
                  </div>
                  {/* Toggle ON */}
                  <div className="w-9 h-5 bg-[#ff8c37] rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all"></div>
                  </div>
                </div>
              </div>

              {/* NOTIFICATIONS */}
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Notifications
                </div>
                <div className="bg-[#16171d] border border-gray-800/80 rounded-[14px] overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-gray-800/60">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-[13px] font-medium">Email Alerts</span>
                    </div>
                    {/* Toggle ON */}
                    <div className="w-9 h-5 bg-[#ff8c37] rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all"></div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Bell className="w-4 h-4 text-gray-400" />
                      <span className="text-[13px] font-medium">Push Notifications</span>
                    </div>
                    {/* Toggle OFF */}
                    <div className="w-9 h-5 bg-gray-700 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MEDIA */}
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Media
                </div>
                <div className="bg-[#16171d] border border-gray-800/80 rounded-[14px] overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-gray-800/60">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mic className="w-4 h-4 text-gray-400" />
                      <span className="text-[13px] font-medium">Microphone</span>
                    </div>
                    <span className="text-[#34d399] text-[12px] font-semibold tracking-wide">Allowed</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Camera className="w-4 h-4 text-gray-400" />
                      <span className="text-[13px] font-medium">Camera</span>
                    </div>
                    <span className="text-[#ff8c37] text-[12px] font-semibold tracking-wide">Ask</span>
                  </div>
                </div>
              </div>

              {/* Sign Out */}
              <button 
                onClick={handleLogout}
                className="w-full py-3.5 rounded-[14px] border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 text-[13px] font-bold mt-4"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
