const ITEMS = [
  'Smart Task Boards', 'Live Study Rooms', 'AI Assistant',
  'Budget Tracker', 'Rich Notes', 'Study Analytics', 'Video Calls', 'File Sharing',
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
      <div
        className="flex shrink-0 gap-10 items-center py-2"
        style={{ animation: `${reverse ? 'marquee-reverse' : 'marquee'} 28s linear infinite` }}
      >
        {/* Two identical copies so the loop is seamless */}
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-gray-500 hover:text-gray-300 font-semibold text-[13px] whitespace-nowrap transition-colors duration-300 cursor-default select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c37]/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
      {/* Exact duplicate to fill the gap and create seamless loop */}
      <div
        className="flex shrink-0 gap-10 items-center py-2"
        aria-hidden
        style={{ animation: `${reverse ? 'marquee-reverse' : 'marquee'} 28s linear infinite` }}
      >
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-gray-500 hover:text-gray-300 font-semibold text-[13px] whitespace-nowrap transition-colors duration-300 cursor-default select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c37]/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function MarqueeStrip() {
  return (
    <section className="relative bg-[#0e0f12] py-6 overflow-hidden">
      {/* Top border with gradient fade */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <MarqueeRow />
    </section>
  )
}
