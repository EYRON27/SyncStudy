import { Clock, Users, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible backdrop for clicking outside */}
          <div className="fixed inset-0 z-[9998]" onClick={onClose} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 right-0 z-[9999] w-[380px] bg-[#121317] border border-gray-800 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-5 overflow-hidden origin-top-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <h2 className="text-white font-bold text-[16px]">Notifications</h2>
                <div className="px-2 py-0.5 rounded-md bg-[#ff8c37]/10 text-[#ff8c37] border border-[#ff8c37]/20 text-[10px] font-bold tracking-wide">
                  3 new
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 text-[11px] font-semibold hover:text-white transition-colors">
                  Mark all read
                </button>
              </div>
            </div>

            {/* Filters (Like Facebook) */}
            <div className="flex gap-2 mb-4">
              <button className="px-3 py-1.5 rounded-full bg-[#1a1c23] text-white text-[12px] font-bold border border-gray-700">
                All
              </button>
              <button className="px-3 py-1.5 rounded-full text-gray-400 hover:bg-[#1a1c23] hover:text-white text-[12px] font-bold transition-colors">
                Unread
              </button>
            </div>

            {/* List */}
            <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar pr-1 -mr-1">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={`relative flex items-start gap-3 p-3 rounded-[12px] transition-colors cursor-pointer ${
                    notif.unread 
                      ? 'bg-[#1a1c23]/60 hover:bg-[#1a1c23]' 
                      : 'hover:bg-[#1a1c23]/40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.iconBg}`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="mb-0.5">
                      <h3 className="text-white font-bold text-[13px] leading-tight">
                        {notif.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-[12px] leading-snug line-clamp-2">{notif.desc}</p>
                    <span className="text-[#ff8c37] text-[10px] font-bold mt-1 inline-block">{notif.time}</span>
                  </div>
                  {notif.unread && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff8c37] shadow-[0_0_8px_rgba(255,140,55,0.6)]" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
