import { ChevronDown } from 'lucide-react'

export default function ActivityChart() {
  return (
    <div className="bg-[#16171d] border border-gray-800/80 rounded-[20px] p-6 h-full flex flex-col min-h-[350px]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white font-bold text-lg">Study Activity Overview</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-800 bg-[#111217] text-gray-300 text-[13px] hover:text-white transition-colors">
          This Week
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 relative mt-4">
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] text-gray-500 font-medium">
          <span>32</span>
          <span>24</span>
          <span>16</span>
          <span>8</span>
          <span>0</span>
        </div>
        
        {/* Chart Area */}
        <div className="absolute left-8 right-0 top-2 bottom-8">
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="border-t border-gray-800/50 border-dashed w-full h-0"></div>
            <div className="border-t border-gray-800/50 border-dashed w-full h-0"></div>
            <div className="border-t border-gray-800/50 border-dashed w-full h-0"></div>
            <div className="border-t border-gray-800/50 border-dashed w-full h-0"></div>
            <div className="border-t border-gray-800/80 w-full h-0"></div>
          </div>

          {/* Curved SVG Line and Area */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8c37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff8c37" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 C15,78 25,82 40,78 C55,74 65,82 80,85 C90,87 95,78 100,72 L100,100 L0,100 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M0,80 C15,78 25,82 40,78 C55,74 65,82 80,85 C90,87 95,78 100,72"
              fill="none"
              stroke="#ff8c37"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="absolute left-8 right-0 bottom-0 flex justify-between text-[11px] text-gray-500 font-medium translate-y-4">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  )
}
