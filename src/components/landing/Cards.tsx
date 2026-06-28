import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const GLOW_COLOR: Record<string, string> = {
  'text-[#ff8c37]': 'bg-[#ff8c37]',
  'text-blue-400': 'bg-blue-500',
  'text-purple-400': 'bg-purple-500',
  'text-emerald-400': 'bg-emerald-500',
  'text-pink-400': 'bg-pink-500',
  'text-cyan-400': 'bg-cyan-500',
}

export function BentoCard({
  icon: Icon, title, desc, color, delay = 0, wide = false,
}: {
  icon: React.ElementType; title: string; desc: string; color: string; delay?: number; wide?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group bg-[#121318] border border-white/[0.07] rounded-[28px] p-8 overflow-hidden ${wide ? 'md:col-span-2' : ''}`}
    >
      <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${GLOW_COLOR[color] ?? 'bg-white'}`} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 transition-transform duration-300">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h3 className="text-white font-bold text-[17px] mb-2.5 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
    </motion.div>
  )
}

// ─── Testimonial card ─────────────────────────────────────
export function TestiCard({
  name, role, initials, text, delay = 0,
}: {
  name: string; role: string; initials: string; text: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-[#121318] border border-white/[0.07] rounded-[28px] p-8 flex flex-col gap-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#ff8c37] text-[#ff8c37]" />)}
      </div>
      <p className="text-gray-300 text-[15px] leading-relaxed italic flex-1">"{text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[12px] font-bold text-gray-300 border border-white/10 shadow-inner">
          {initials}
        </div>
        <div>
          <p className="text-white font-bold text-[14px]">{name}</p>
          <p className="text-[#ff8c37] text-[12px] font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
