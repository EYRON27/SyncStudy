import { CheckCircle2, Clock, Sparkles, TrendingUp } from 'lucide-react'

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1 */}
      <div className="bg-[#16171d] border border-gray-800/80 rounded-[20px] p-6 relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-8 h-8 rounded-full bg-[#ff8c37]/10 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-[#ff8c37]" />
          </div>
          <span className="text-gray-300 text-[13px] font-semibold">Tasks Completed</span>
        </div>
        <div className="flex items-baseline gap-3 relative z-10">
          <span className="text-3xl font-bold text-white">24</span>
          <span className="text-emerald-400 text-xs font-semibold tracking-wide">+12% from last week</span>
        </div>
        <CheckCircle2 className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.015] group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Card 2 */}
      <div className="bg-[#16171d] border border-gray-800/80 rounded-[20px] p-6 relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-8 h-8 rounded-full bg-[#1a1c23] flex items-center justify-center border border-gray-800">
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-gray-300 text-[13px] font-semibold">Study Hours</span>
        </div>
        <div className="flex items-baseline gap-3 relative z-10">
          <span className="text-3xl font-bold text-white">33.3</span>
          <span className="text-emerald-400 text-xs font-semibold tracking-wide">+4.5h this week</span>
        </div>
        <Clock className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.015] group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Card 3 */}
      <div className="bg-[#16171d] border border-gray-800/80 rounded-[20px] p-6 relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-gray-300 text-[13px] font-semibold">AI Interactions</span>
        </div>
        <div className="flex items-baseline gap-2 relative z-10">
          <span className="text-3xl font-bold text-white">112</span>
          <span className="text-gray-500 text-xs font-semibold tracking-wide">queries this week</span>
        </div>
        <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.015] group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Card 4 */}
      <div className="bg-[#16171d] border border-gray-800/80 rounded-[20px] p-6 relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-gray-300 text-[13px] font-semibold">Budget Status</span>
        </div>
        <div className="flex items-baseline gap-3 relative z-10">
          <span className="text-3xl font-bold text-white">$450</span>
          <span className="text-emerald-400 text-xs font-semibold tracking-wide">under budget</span>
        </div>
        <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.015] group-hover:scale-110 transition-transform duration-500" />
      </div>
    </div>
  )
}
