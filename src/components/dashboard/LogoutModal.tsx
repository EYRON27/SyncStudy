import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { LogOut } from 'lucide-react'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[400px] bg-[#121317] border border-gray-800 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <LogOut className="w-8 h-8 text-red-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">Sign Out</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
              Are you sure you want to sign out of your account? You will need to log back in to access your dashboard.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl border border-gray-800 text-gray-300 font-bold hover:bg-[#1a1b23] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:-translate-y-0.5"
              >
                Yes, Sign Out
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
