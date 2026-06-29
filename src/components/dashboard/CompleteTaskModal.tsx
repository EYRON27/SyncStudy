import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { CheckCircle2, AlertTriangle } from 'lucide-react'

interface CompleteTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  hasRoom: boolean
}

export default function CompleteTaskModal({ isOpen, onClose, onConfirm, hasRoom }: CompleteTaskModalProps) {
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
            className="relative w-full max-w-[420px] bg-[#121317] border border-gray-800 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">Mark as Done?</h3>

            {hasRoom ? (
              <>
                <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6 text-left">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-300 text-[14px] leading-relaxed">
                    <span className="font-bold">Heads up!</span> The Study Room linked to this task will be permanently deleted along with all its messages, because it's done.
                  </p>
                </div>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-8">
                  Are you sure you want to complete this task and remove its associated room?
                </p>
              </>
            ) : (
              <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
                Are you sure you want to mark this task as complete?
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl border border-gray-800 text-gray-300 font-bold hover:bg-[#1a1b23] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold transition-all shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
              >
                Yes, Complete It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null
  return createPortal(modalContent, document.body)
}
