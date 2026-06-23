import { X, Clock, Users, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const notifications = [
    {
      id: 1,
      title: 'Task Due Soon',
      desc: '"Advanced React Patterns" is due in 2 hours.',
      time: '2h ago',
      icon: <Clock className="w-4 h-4 text-[#ff8c37]" />,
      iconBg: 'bg-[#ff8c37]/10',
      unread: true
    },
    {
      id: 2,
      title: 'Study Room Starting',
      desc: '"CS-101 Final Prep" starts in 15 minutes. 12 students joining.',
      time: '15m ago',
      icon: <Users className="w-4 h-4 text-[#60a5fa]" />,
      iconBg: 'bg-[#60a5fa]/10',
      unread: true
    },
    {
      id: 3,
      title: 'Budget Alert',
      desc: 'You have used 95% of your monthly budget ($1,430 / $1,500).',
      time: '1h ago',
      icon: <AlertCircle className="w-4 h-4 text-[#f87171]" />,
      iconBg: 'bg-[#f87171]/10',
      unread: true
    },
    {
      id: 4,
      title: 'Weekly Report Ready',
      desc: 'Your study summary for this week is ready to view.',
      time: '3h ago',
      icon: <CheckCircle2 className="w-4 h-4 text-[#34d399]" />,
      iconBg: 'bg-[#34d399]/10',
      unread: false
    },
    {
      id: 5,
      title: 'New Feature Available',
      desc: 'AI-powered flashcard generation is now available in Notes.',
      time: '1d ago',
      icon: <Info className="w-4 h-4 text-[#c084fc]" />,
      iconBg: 'bg-[#c084fc]/10',
      unread: false
    }
  ]

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
            className="relative w-full max-w-[500px] bg-[#121317] border border-gray-800 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 overflow-hidden mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-white font-bold text-[18px]">Notifications</h2>
                <div className="px-2.5 py-0.5 rounded-full bg-[#ff8c37] text-white text-[10px] font-bold tracking-wide">
                  3 new
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button className="text-[#ff8c37] text-[12px] font-bold hover:underline">
                  Mark all read
                </button>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={`relative flex items-start gap-4 p-4 rounded-[16px] transition-colors ${
                    notif.unread 
                      ? 'bg-[#1a1c23] border border-gray-800/80' 
                      : 'bg-transparent border border-transparent hover:bg-[#1a1c23]/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.iconBg}`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-white font-bold text-[13px] truncate">{notif.title}</h3>
                      <span className="text-gray-500 text-[10px] font-semibold whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className="text-gray-400 text-[12px] leading-relaxed">{notif.desc}</p>
                  </div>
                  {notif.unread && (
                    <div className="absolute right-4 top-[50%] -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff8c37]" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
