import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { expensesService } from '@/features/expenses/api/expenses.service'
import type { CreateExpenseInput } from '@/features/expenses/api/expenses.service'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onExpenseAdded: () => void
}

const CATEGORIES = ['Food', 'Housing', 'Transport', 'Supplies', 'Entertainment', 'Income', 'Other']

export default function AddExpenseModal({ isOpen, onClose, onExpenseAdded }: AddExpenseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreateExpenseInput>({
    title: '',
    category: 'Food',
    amount: 0,
    type: 'expense',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await expensesService.createExpense({
        ...formData,
        amount: Number(formData.amount)
      })
      onExpenseAdded()
      onClose()
      setFormData({ title: '', category: 'Food', amount: 0, type: 'expense' })
    } catch (err) {
      console.error(err)
      alert('Failed to add transaction')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#121318] border border-gray-800 rounded-[24px] p-6 w-full max-w-md relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6">Add Transaction</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  className={`py-2 rounded-xl text-sm font-semibold transition-colors ${formData.type === 'expense' ? 'bg-[#ff8c37]/20 text-[#ff8c37] border border-[#ff8c37]/50' : 'bg-[#1a1c23] text-gray-400 border border-transparent'}`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'income', category: 'Income'})}
                  className={`py-2 rounded-xl text-sm font-semibold transition-colors ${formData.type === 'income' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50' : 'bg-[#1a1c23] text-gray-400 border border-transparent'}`}
                >
                  Income
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Title / Description</label>
                <input 
                  required 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Groceries"
                  className="w-full bg-[#1a1c23] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff8c37]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Amount ($)</label>
                  <input 
                    required 
                    type="number" 
                    step="0.01"
                    min="0"
                    value={formData.amount || ''}
                    onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
                    placeholder="0.00"
                    className="w-full bg-[#1a1c23] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff8c37]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-[#1a1c23] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff8c37]/50 appearance-none"
                    disabled={formData.type === 'income'}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] hover:from-[#e65c00] hover:to-[#ff8c37] text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center mt-4 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Transaction'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
