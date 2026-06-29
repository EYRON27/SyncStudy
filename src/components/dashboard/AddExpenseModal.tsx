import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, Type, Check } from 'lucide-react'
import { expensesService } from '@/features/expenses/api/expenses.service'
import type { CreateExpenseInput } from '@/features/expenses/api/expenses.service'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onExpenseAdded: () => void
  currency?: string
}

const DEFAULT_CATEGORIES = ['Food', 'Housing', 'Transport', 'Supplies', 'Entertainment', 'Income', 'Other']

export default function AddExpenseModal({ isOpen, onClose, onExpenseAdded, currency = '$' }: AddExpenseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCustomCategory, setIsCustomCategory] = useState(false)
  const [customCategoryVal, setCustomCategoryVal] = useState('')
  const [userCategories, setUserCategories] = useState<string[]>([])

  const [formData, setFormData] = useState<CreateExpenseInput>({
    title: '',
    category: 'Food',
    amount: 0,
    type: 'expense',
  })

  const handleAddCustomCategory = () => {
    const val = customCategoryVal.trim();
    if (val) {
      if (!DEFAULT_CATEGORIES.includes(val) && !userCategories.includes(val)) {
        setUserCategories([...userCategories, val]);
      }
      setFormData({...formData, category: val});
      setIsCustomCategory(false);
      setCustomCategoryVal('');
    }
  }

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({ title: '', category: 'Food', amount: 0, type: 'expense' })
      setIsCustomCategory(false)
      setCustomCategoryVal('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const finalCategory = isCustomCategory && customCategoryVal.trim() !== '' 
      ? customCategoryVal.trim() 
      : formData.category

    try {
      await expensesService.createExpense({
        ...formData,
        category: finalCategory,
        amount: Number(formData.amount)
      })
      onExpenseAdded()
      onClose()
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f1015]/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#121318] border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[24px] p-8 w-full max-w-md relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#1a1c23] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-6">Add Transaction</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  className={`py-3 rounded-2xl text-[14px] font-bold transition-colors flex items-center justify-center gap-2 ${formData.type === 'expense' ? 'bg-[#ff8c37]/20 text-[#ff8c37] border border-[#ff8c37]/50 shadow-[0_0_15px_rgba(255,140,55,0.15)]' : 'bg-[#1a1c23] text-gray-400 border border-transparent hover:bg-gray-800'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${formData.type === 'expense' ? 'bg-[#ff8c37]' : 'bg-gray-500'}`} />
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'income', category: 'Income'})}
                  className={`py-3 rounded-2xl text-[14px] font-bold transition-colors flex items-center justify-center gap-2 ${formData.type === 'income' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-[#1a1c23] text-gray-400 border border-transparent hover:bg-gray-800'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${formData.type === 'income' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                  Income
                </button>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-400 mb-2">Title / Description</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    required 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Groceries"
                    className="w-full bg-[#1a1c23] border border-gray-800 rounded-xl pl-11 pr-4 py-3.5 text-[15px] font-medium text-white focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-400 mb-2">Amount ({currency})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{currency}</span>
                    <input 
                      required 
                      type="number" 
                      step="0.01"
                      min="0"
                      value={formData.amount || ''}
                      onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
                      placeholder="0.00"
                      className="w-full bg-[#1a1c23] border border-gray-800 rounded-xl pl-8 pr-4 py-3.5 text-[15px] font-medium text-white focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-400 mb-2">Category</label>
                  
                  {isCustomCategory ? (
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input 
                          required 
                          autoFocus
                          type="text" 
                          value={customCategoryVal}
                          onChange={e => setCustomCategoryVal(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomCategory();
                            }
                          }}
                          placeholder="New category..."
                          className="w-full bg-[#1a1c23] border border-[#ff8c37]/50 ring-1 ring-[#ff8c37]/50 rounded-xl px-4 py-3.5 text-[15px] font-medium text-white focus:outline-none transition-all placeholder:text-gray-600"
                        />
                        <button 
                          type="button"
                          onClick={() => setIsCustomCategory(false)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddCustomCategory}
                        disabled={!customCategoryVal.trim()}
                        className="bg-[#ff8c37]/20 text-[#ff8c37] hover:bg-[#ff8c37] hover:text-white border border-[#ff8c37]/50 disabled:opacity-50 disabled:hover:bg-[#ff8c37]/20 disabled:hover:text-[#ff8c37] transition-colors p-3.5 rounded-xl flex items-center justify-center"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <select 
                        value={formData.category}
                        onChange={e => {
                          if (e.target.value === 'ADD_NEW_CUSTOM') {
                            setIsCustomCategory(true)
                          } else {
                            setFormData({...formData, category: e.target.value})
                          }
                        }}
                        className="w-full bg-[#1a1c23] border border-gray-800 rounded-xl px-4 py-3.5 text-[15px] font-medium text-white focus:outline-none focus:border-[#ff8c37]/50 focus:ring-1 focus:ring-[#ff8c37]/50 appearance-none transition-all cursor-pointer"
                        disabled={formData.type === 'income'}
                      >
                        {[...DEFAULT_CATEGORIES, ...userCategories].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="ADD_NEW_CUSTOM" className="font-bold text-[#ff8c37]">+ Add custom category...</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button 
                disabled={isSubmitting || (isCustomCategory && !customCategoryVal.trim()) || formData.amount <= 0}
                type="submit" 
                className="w-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] hover:opacity-90 shadow-[0_0_20px_rgba(255,140,55,0.4)] text-white font-bold py-4 rounded-2xl transition-all flex justify-center items-center mt-6 disabled:opacity-50 disabled:shadow-none"
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
