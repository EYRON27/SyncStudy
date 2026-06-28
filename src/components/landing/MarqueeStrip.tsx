const ITEMS = [
  'Smart Task Boards', 'Live Study Rooms', 'AI Assistant', 'Budget Tracker',
  'Rich Notes', 'Study Analytics', 'Video Calls', 'File Sharing',
]

// Duplicate items so the marquee loops seamlessly
const MARQUEE_ITEMS = [...ITEMS, ...ITEMS]

export function MarqueeStrip() {
  return (
    <section className="border-y border-white/[0.05] bg-[#0e0f12] py-5 overflow-hidden relative">
      <div className="flex gap-16 items-center animate-[marquee_30s_linear_infinite] whitespace-nowrap text-gray-500 font-semibold text-[14px]">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-[#ff8c37]" />{item}
          </span>
        ))}
      </div>
    </section>
  )
}
