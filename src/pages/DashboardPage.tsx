import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import StatCards from '@/components/dashboard/StatCards'
import ActivityChart from '@/components/dashboard/ActivityChart'
import PriorityTasks from '@/components/dashboard/PriorityTasks'
import { ArrowUpRight } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#0f1015] font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-[#ff8c37]/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-[1400px] mx-auto relative z-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex</h1>
                <p className="text-gray-400 text-sm">Here's what's happening with your studies today.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)]">
                New Session
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <StatCards />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityChart />
              </div>
              <div className="lg:col-span-1">
                <PriorityTasks />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
