import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import { Download, Plus, Filter, DollarSign } from 'lucide-react'

export default function ExpensesPage() {
  const transactions = [
    { id: 1, title: 'Textbooks', subtitle: 'Oct 24 • Supplies', amount: '$120.00', type: 'expense' },
    { id: 2, title: 'Grocery Store', subtitle: 'Oct 22 • Food', amount: '$65.40', type: 'expense' },
    { id: 3, title: 'Monthly Rent', subtitle: 'Oct 01 • Housing', amount: '$800.00', type: 'expense' },
    { id: 4, title: 'Bus Pass', subtitle: 'Oct 01 • Transport', amount: '$45.00', type: 'expense' },
    { id: 5, title: 'Part-time Job', subtitle: 'Oct 15 • Income', amount: '+$450.00', type: 'income' },
  ]

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
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16171d] border border-gray-800 text-gray-300 text-[14px] font-semibold hover:bg-[#1a1c23] transition-colors">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[14px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)]">
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
              
              {/* Left Column: Breakdown */}
              <div className="lg:col-span-1 bg-[#121317] border border-gray-800/80 rounded-[20px] p-6 flex flex-col">
                <h2 className="text-white font-bold text-[15px] mb-12">Monthly Breakdown</h2>
                
                {/* Donut Chart */}
                <div className="relative w-56 h-56 mx-auto mb-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 overflow-visible drop-shadow-md">
                    {/* Housing (Blue) ~48% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#4a6378" strokeWidth="12" strokeDasharray="120 251.32" />
                    {/* Food (Orange) ~16% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#ff8c37" strokeWidth="12" strokeDasharray="40 251.32" transform="rotate(176.2 50 50)" />
                    {/* Transport (Darker Orange) ~10% (Popped out) */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#a35215" strokeWidth="12" strokeDasharray="25 251.32" transform="rotate(237.8 50 50) translate(-3, -2)" />
                    {/* Supplies (White) ~10% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#e2e8f0" strokeWidth="12" strokeDasharray="25 251.32" transform="rotate(277.9 50 50)" />
                    {/* Entertainment (Gray) ~12% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3b415a" strokeWidth="12" strokeDasharray="26.32 251.32" transform="rotate(318 50 50)" />
                  </svg>
                  
                  {/* Tooltip */}
                  <div className="absolute top-[50%] left-[85%] -translate-y-[40%] bg-[#1a1c23] border border-gray-700/80 text-gray-300 text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-10 flex items-center gap-1.5">
                    Transport : 100
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mb-10 px-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 tracking-wide">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4a6378]"></div> Housing
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 tracking-wide">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff8c37]"></div> Food
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 tracking-wide">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#a35215]"></div> Transport
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 tracking-wide">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e2e8f0]"></div> Supplies
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 tracking-wide">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3b415a]"></div> Entertainment
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto border-t border-gray-800/50 pt-8 pb-2">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 text-[13px] font-semibold">Total Budget</span>
                    <span className="text-white text-[14px] font-bold">$1,500</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 text-[13px] font-semibold">Spent</span>
                    <span className="text-[#ff8c37] text-[14px] font-bold">$1,430</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1a1c23] overflow-hidden border border-gray-800/80">
                    <div className="h-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>

              {/* Right Column: Transactions */}
              <div className="lg:col-span-2 bg-[#121317] border border-gray-800/80 rounded-[20px] flex flex-col p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-white font-bold text-[15px]">Recent Transactions</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 bg-[#16171d] text-gray-400 text-[12px] font-semibold hover:text-white transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                    Filter
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-1">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-[16px] hover:bg-[#16171d] transition-colors group cursor-pointer border border-transparent hover:border-gray-800/50">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          tx.type === 'income' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                            : 'bg-[#1a1c23] border-gray-800/80 text-gray-400'
                        }`}>
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-[14px] mb-1">{tx.title}</h3>
                          <p className="text-gray-500 text-[11px] font-semibold tracking-wide">{tx.subtitle}</p>
                        </div>
                      </div>
                      <div className={`font-bold text-[13px] tracking-wide ${tx.type === 'income' ? 'text-emerald-500' : 'text-white'}`}>
                        {tx.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
