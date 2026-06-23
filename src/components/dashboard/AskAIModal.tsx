import { X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AskAIModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AskAIModal({ isOpen, onClose }: AskAIModalProps) {
  const quickPrompts = [
    "Summarize my notes",
    "Quiz me on this topic",
    "Explain like I'm 5",
    "Debug this code",
    "Create a study plan",
    "Generate flashcards"
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
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
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-[16px] leading-tight">Ask AI</h2>
                  <p className="text-gray-500 text-[11px] font-medium">Powered by SyncStudy AI</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-7 h-7 rounded-lg bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="mb-5">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                Quick Prompts
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, i) => (
                  <button 
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-[#16171d] border border-gray-800 text-gray-300 text-[12px] font-medium hover:bg-[#1a1c23] hover:text-white hover:border-gray-700 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="mb-5">
              <textarea 
                placeholder="Ask anything about your studies, request explanations, get help with assignments..."
                className="w-full bg-[#1a1c23] border border-gray-800 rounded-[14px] p-4 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 resize-none h-[110px] custom-scrollbar"
              />
            </div>

            {/* Subject Field */}
            <div className="mb-8">
              <div className="text-[12px] font-bold text-white mb-2">
                Related Subject (optional)
              </div>
              <input 
                type="text" 
                placeholder="e.g. Computer Science, Mathematics..."
                className="w-full bg-[#16171d] border border-gray-800 rounded-xl py-2.5 px-4 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-800 bg-[#16171d] text-white text-[13px] font-bold hover:bg-[#1a1c23] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[13px] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,140,55,0.3)]">
                <Sparkles className="w-4 h-4" />
                Ask AI
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
