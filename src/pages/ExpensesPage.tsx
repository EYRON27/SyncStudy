import { useState, useEffect, useMemo } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Download, Plus, DollarSign, Trash2, ChevronDown, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { expensesService } from '@/features/expenses/api/expenses.service'
import type { Expense } from '@/features/expenses/api/expenses.service'
import AddExpenseModal from '@/components/dashboard/AddExpenseModal'
import { format } from 'date-fns'
import { useUIStore } from '@/store/uiStore'

const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#4a6378',
  Food: '#ff8c37',
  Transport: '#a35215',
  Supplies: '#e8d5c4',
  Entertainment: '#3b415a',
  Income: '#10b981',
  Other: '#64748b'
};

const CURRENCIES = [
  { symbol: '$', code: 'USD' },
  { symbol: '€', code: 'EUR' },
  { symbol: '£', code: 'GBP' },
  { symbol: '¥', code: 'JPY' },
  { symbol: '₱', code: 'PHP' },
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')
  const { globalSearch } = useUIStore()

  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      const s = globalSearch.toLowerCase();
      const matchesSearch = s ? (e.title.toLowerCase().includes(s) || e.category.toLowerCase().includes(s)) : true;
      const matchesType = filterType === 'all' ? true : e.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [expenses, globalSearch, filterType])
  
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('syncstudy-currency') || '$'
  })

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency)
    localStorage.setItem('syncstudy-currency', newCurrency)
  }

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
    return Object.entries(categoryTotals).map(([cat, amount]) => {
      const percent = (amount / totalExpense) * 100;
      return { cat, amount, percent };
    }).sort((a, b) => b.percent - a.percent);
  }, [categoryTotals, totalExpense]);

  const getColor = (cat: string) => CATEGORY_COLORS[cat] || CATEGORY_COLORS.Other;

  return (
    <div className="flex h-screen bg-[#0f1015] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        
        <main className="flex-1 overflow-x-auto overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-[1400px] mx-auto min-w-[1000px] relative z-10 h-full flex flex-col">
            
            {/* Header */}
            <div className="flex items-end justify-between mb-8 flex-shrink-0">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Expense Tracker</h1>
                <p className="text-gray-400 text-[14px]">Manage your student budget.</p>
              </div>
              <div className="flex items-center gap-4">
                
                {/* Currency Selector */}
                <div className="relative group">
                  <select 
                    value={currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                    className="appearance-none bg-[#16171d] border border-gray-800 text-white font-bold text-[14px] rounded-full px-5 py-2.5 pr-10 focus:outline-none focus:border-[#ff8c37]/50 cursor-pointer hover:bg-[#1a1c23] transition-colors"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.symbol}>{c.code} ({c.symbol})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16171d] border border-gray-800 text-gray-300 text-[14px] font-semibold hover:bg-[#1a1c23] transition-colors">
                  <Download className="w-4 h-4" />
                  Export
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
              {/* Left Column - Breakdown */}
              <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-[#1a1c23] to-[#121317] border border-gray-800/80 rounded-[24px] p-8 relative overflow-hidden flex-shrink-0">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Wallet className="w-24 h-24 text-[#ff8c37]" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-gray-400 text-[14px] font-semibold mb-3">Total Balance</div>
                    <div className={`text-4xl font-black mb-6 ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
                      {balance < 0 ? '-' : ''}{currency}{Math.abs(balance).toFixed(2)}
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 font-bold uppercase">Income</div>
                          <div className="text-[14px] text-white font-bold">{currency}{totalIncome.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                          <TrendingDown className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-500 font-bold uppercase">Expenses</div>
                          <div className="text-[14px] text-white font-bold">{currency}{totalExpense.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Bar Chart Breakdown */}
                <div className="bg-[#121317] border border-gray-800/80 rounded-[24px] p-6 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-white font-bold text-[16px]">Monthly Breakdown</h2>
                    <span className="text-gray-500 text-[12px] font-bold">{segments.length} Categories</span>
                  </div>
                  
                  {totalExpense > 0 ? (
                    <div className="flex flex-col h-full">
                      {/* Stacked Bar */}
                      <div className="h-4 w-full rounded-full flex overflow-hidden mb-8 gap-0.5 bg-[#1a1c23]">
                        {segments.map(seg => (
                          <div 
                            key={seg.cat} 
                            style={{ width: `${seg.percent}%`, backgroundColor: getColor(seg.cat) }} 
                            className="h-full transition-all duration-500 hover:opacity-80"
                            title={`${seg.cat}: ${currency}${seg.amount.toFixed(2)} (${seg.percent.toFixed(1)}%)`}
                          />
                        ))}
                      </div>

                      {/* Legend List */}
                      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                        {segments.map(seg => (
                          <div key={seg.cat} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" 
                                style={{ backgroundColor: getColor(seg.cat) }} 
                              />
                              <div className="flex flex-col">
                                <span className="text-white text-[14px] font-bold group-hover:text-[#ff8c37] transition-colors">{seg.cat}</span>
                                <span className="text-gray-500 text-[11px] font-medium">{seg.percent.toFixed(1)}% of total</span>
                              </div>
                            </div>
                            <span className="text-white font-bold text-[14px]">{currency}{seg.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-[#1a1c23] flex items-center justify-center mb-4">
                        <DollarSign className="w-6 h-6 text-gray-600" />
                      </div>
                      <p className="text-gray-400 font-semibold text-[14px]">No expenses tracked yet</p>
                      <p className="text-gray-600 text-[12px]">Add an expense to see your breakdown.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Transactions */}
              <div className="lg:col-span-2 flex flex-col h-full">
                <div className="bg-[#121317] border border-gray-800/80 rounded-[24px] p-6 flex flex-col flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <h2 className="text-white font-bold text-[18px]">Recent Transactions</h2>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="bg-[#1a1c23] border border-gray-800 text-gray-400 text-[12px] font-bold rounded-full px-3 py-1.5 focus:outline-none focus:border-[#ff8c37]/50 cursor-pointer hover:text-white hover:bg-gray-800 transition-colors appearance-none text-center"
                    >
                      <option value="all">All Types</option>
                      <option value="income">Income Only</option>
                      <option value="expense">Expenses Only</option>
                    </select>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                    {isLoading ? (
                      <div className="text-gray-500 text-center py-12 flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-[#ff8c37] border-t-transparent rounded-full animate-spin mb-4" />
                        Loading transactions...
                      </div>
                    ) : filteredExpenses.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center py-20">
                        <div className="w-20 h-20 bg-[#1a1c23] rounded-3xl flex items-center justify-center mb-4 border border-gray-800/50">
                          <DollarSign className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">No transactions found</h3>
                        <p className="text-gray-500 text-sm">You haven't added any income or expenses yet.</p>
                      </div>
                    ) : (
                      filteredExpenses.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#16171d] hover:bg-[#1a1c23] border border-gray-800/50 hover:border-gray-700 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                              t.type === 'income' 
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                                : 'bg-[#ff8c37]/10 text-[#ff8c37] border-[#ff8c37]/20 shadow-[0_0_15px_rgba(255,140,55,0.1)]'
                            }`}>
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-bold text-[15px] mb-0.5">{t.title}</div>
                              <div className="flex items-center gap-2 text-gray-500 text-[12px] font-medium">
                                <span>{format(new Date(t.date), 'MMM dd, yyyy')}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                <span className="px-2 py-0.5 rounded bg-[#121317] border border-gray-800">{t.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <div className={`font-black text-[16px] ${t.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                              {t.type === 'income' ? '+' : '-'}{currency}{t.amount.toFixed(2)}
                            </div>
                            <button 
                              onClick={() => handleDelete(t.id)}
                              className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all scale-95 group-hover:scale-100"
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
        currency={currency}
      />
    </div>
  )
}
