import React, { useState, useEffect, useMemo } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Download, Plus, Filter, DollarSign, Trash2 } from 'lucide-react'
import { expensesService } from '@/features/expenses/api/expenses.service'
import type { Expense } from '@/features/expenses/api/expenses.service'
import AddExpenseModal from '@/components/dashboard/AddExpenseModal'
import { format } from 'date-fns'

const DonutSegment = ({ percent, offset, color, poppedOut = false }: { percent: number, offset: number, color: string, poppedOut?: boolean }) => {
  const rOuter = 42;
  const rInner = 28;
  const cx = 50;
  const cy = 50;
  
  if (percent === 0) return null;
  if (percent === 1) {
    return (
      <path 
        d={`M 50 ${50-rOuter} A ${rOuter} ${rOuter} 0 1 1 49.99 ${50-rOuter} M 50 ${50-rInner} A ${rInner} ${rInner} 0 1 0 49.99 ${50-rInner} Z`} 
        fill={color} stroke="#e2e8f0" strokeWidth="0.8" 
      />
    );
  }

  const startAngle = (offset * 2 * Math.PI) - Math.PI/2;
  const endAngle = ((offset + percent) * 2 * Math.PI) - Math.PI/2;
  
  const startOuterX = cx + rOuter * Math.cos(startAngle);
  const startOuterY = cy + rOuter * Math.sin(startAngle);
  const endOuterX = cx + rOuter * Math.cos(endAngle);
  const endOuterY = cy + rOuter * Math.sin(endAngle);
  
  const startInnerX = cx + rInner * Math.cos(startAngle);
  const startInnerY = cy + rInner * Math.sin(startAngle);
  const endInnerX = cx + rInner * Math.cos(endAngle);
  const endInnerY = cy + rInner * Math.sin(endAngle);
  
  const largeArcFlag = percent > 0.5 ? 1 : 0;
  
  const d = `
    M ${startOuterX} ${startOuterY}
    A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}
    L ${endInnerX} ${endInnerY}
    A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY}
    Z
  `;
  
  const midAngle = startAngle + (endAngle - startAngle)/2;
  const popTransform = poppedOut ? `translate(${Math.cos(midAngle)*4}, ${Math.sin(midAngle)*4})` : '';

  return (
    <path d={d} fill={color} stroke="#121317" strokeWidth="0.8" transform={popTransform} strokeLinejoin="round" />
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#4a6378',
  Food: '#ff8c37',
  Transport: '#a35215',
  Supplies: '#e8d5c4',
  Entertainment: '#3b415a',
  Other: '#64748b'
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const loadExpenses = async () => {
    try {
      const data = await expensesService.getExpenses()
      setExpenses(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await expensesService.deleteExpense(id)
      setExpenses(prev => prev.filter(e => e.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const { totalIncome, totalExpense, balance, categoryTotals } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    const cats: Record<string, number> = {};

    expenses.forEach(tx => {
      if (tx.type === 'income') {
        inc += tx.amount;
      } else {
        exp += tx.amount;
        cats[tx.category] = (cats[tx.category] || 0) + tx.amount;
      }
    });

    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: inc - exp,
      categoryTotals: cats
    }
  }, [expenses])

  const segments = useMemo(() => {
    if (totalExpense === 0) return [];
    let currentOffset = 0;
    return Object.entries(categoryTotals).map(([cat, amount]) => {
      const percent = amount / totalExpense;
      const segment = { cat, percent, offset: currentOffset };
      currentOffset += percent;
      return segment;
    }).sort((a, b) => b.percent - a.percent);
  }, [categoryTotals, totalExpense]);

  return (
    <div className="flex h-screen bg-[#0f1015] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        
        <main className="flex-1 overflow-x-auto overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-[1400px] mx-auto min-w-[1000px] relative z-10 h-full flex flex-col">
            <div className="flex items-end justify-between mb-8 flex-shrink-0">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Expense Tracker</h1>
                <p className="text-gray-400 text-[14px]">Manage your student budget.</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16171d] border border-gray-800 text-gray-300 text-[14px] font-semibold hover:bg-[#1a1c23] transition-colors">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[14px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)]"
                >
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
              <div className="lg:col-span-1 bg-[#121317] border border-gray-800/80 rounded-[20px] p-6 flex flex-col">
                <h2 className="text-white font-bold text-[16px] mb-10">Monthly Breakdown</h2>
                
                <div className="relative w-56 h-56 mx-auto mb-10">
                  {totalExpense > 0 ? (
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
                      {segments.map((seg, i) => (
                        <DonutSegment 
                          key={seg.cat} 
                          percent={seg.percent} 
                          offset={seg.offset} 
                          color={CATEGORY_COLORS[seg.cat] || CATEGORY_COLORS.Other} 
                          poppedOut={i === 0}
                        />
                      ))}
                    </svg>
                  ) : (
                    <div className="w-full h-full rounded-full border-4 border-gray-800 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No expenses yet</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-gray-400 text-[11px] font-semibold tracking-wider uppercase mb-1">Total Spent</span>
                    <span className="text-white font-bold text-2xl">${totalExpense.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {segments.map(seg => (
                    <div key={seg.cat} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: CATEGORY_COLORS[seg.cat] || CATEGORY_COLORS.Other }} />
                        <span className="text-gray-300 text-[14px] font-medium">{seg.cat}</span>
                      </div>
                      <span className="text-white font-bold text-[14px]">${categoryTotals[seg.cat].toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                <div className="grid grid-cols-3 gap-6 flex-shrink-0">
                  <div className="bg-[#121317] border border-gray-800/80 rounded-[20px] p-6">
                    <div className="text-gray-400 text-[13px] font-semibold mb-2">Total Balance</div>
                    <div className={`text-3xl font-black ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
                      {balance < 0 ? '-' : ''}${Math.abs(balance).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-[#121317] border border-gray-800/80 rounded-[20px] p-6">
                    <div className="text-gray-400 text-[13px] font-semibold mb-2">Monthly Income</div>
                    <div className="text-3xl font-black text-emerald-400">+${totalIncome.toFixed(2)}</div>
                  </div>
                  <div className="bg-[#121317] border border-gray-800/80 rounded-[20px] p-6">
                    <div className="text-gray-400 text-[13px] font-semibold mb-2">Monthly Expenses</div>
                    <div className="text-3xl font-black text-white">-${totalExpense.toFixed(2)}</div>
                  </div>
                </div>

                <div className="bg-[#121317] border border-gray-800/80 rounded-[20px] p-6 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <h2 className="text-white font-bold text-[16px]">Recent Transactions</h2>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                    {isLoading ? (
                      <div className="text-gray-500 text-center py-8">Loading...</div>
                    ) : expenses.length === 0 ? (
                      <div className="text-gray-500 text-center py-8">No transactions found</div>
                    ) : (
                      expenses.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#1a1c23] border border-transparent hover:border-gray-800/50 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[#ff8c37]/10 text-[#ff8c37]'
                            }`}>
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-bold text-[15px] mb-0.5">{t.title}</div>
                              <div className="text-gray-400 text-[13px]">{format(new Date(t.date), 'MMM dd')} • {t.category}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className={`font-bold text-[16px] ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                              {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                            </div>
                            <button 
                              onClick={() => handleDelete(t.id)}
                              className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddExpenseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExpenseAdded={loadExpenses}
      />
    </div>
  )
}
