import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Shield, Sparkles, Globe } from 'lucide-react'

const FEATURES = [
  { icon: Zap,      title: 'Lightning Fast', desc: 'Real-time sync across all devices. No lag.',   color: 'text-[#ff8c37]',  bg: 'bg-[#ff8c37]/10'  },
  { icon: Shield,   title: 'Privacy First',  desc: 'End-to-end encrypted. Never sold.',            color: 'text-blue-400',    bg: 'bg-blue-400/10'   },
  { icon: Sparkles, title: 'AI-Native',      desc: 'AI in every feature, not bolted on.',          color: 'text-purple-400',  bg: 'bg-purple-400/10' },
  { icon: Globe,    title: 'Works Offline',  desc: 'Core features run without internet.',          color: 'text-emerald-400', bg: 'bg-emerald-400/10'},
]

const STATS = [
  { value: '50K+', label: 'Active Students', accent: 'text-[#ff8c37]' },
  { value: '200+', label: 'Universities',    accent: 'text-blue-400'   },
  { value: '4.9★', label: 'Avg. Rating',     accent: 'text-purple-400' },
]

function AnimatedStat({ value, label, accent }: { value: string; label: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl md:text-5xl font-black text-white tracking-tighter"
      >
        {value}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={`text-[11px] font-bold uppercase tracking-[0.18em] ${accent}`}
      >
        {label}
      </motion.span>
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-[1100px]">

        {/* ── Section label ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#ff8c37] text-[11px] font-bold tracking-[0.22em] uppercase flex items-center gap-2 mb-6"
        >
          <span className="w-6 h-px bg-[#ff8c37]" /> About SyncStudy
        </motion.p>

        {/* ── Headline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-6">
              Built for students,{' '}
              <span className="text-gray-500">by students.</span>
            </h2>
            <p className="text-gray-400 text-[16px] leading-relaxed">
              SyncStudy was born from the chaos of juggling assignments, group projects, tight budgets, and the desperate need to actually understand the material. We built the tool we wished existed.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-[16px] leading-relaxed lg:pt-[60px]"
          >
            Today, thousands of students use SyncStudy to stay organized, collaborate in real time, and tap into AI assistance that actually understands academic content. From orientation to thesis defense — we've got you covered.
          </motion.p>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-3 gap-0 mb-16 bg-[#121318] border border-white/[0.07] rounded-[24px] overflow-hidden"
        >
          {STATS.map(({ value, label, accent }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center py-10 px-4 text-center ${i < STATS.length - 1 ? 'border-r border-white/[0.06]' : ''}`}
            >
              <AnimatedStat value={value} label={label} accent={accent} />
            </div>
          ))}
        </motion.div>

        {/* ── Feature mini-cards 2×2 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative group bg-[#121318] border border-white/[0.07] rounded-[20px] p-6 overflow-hidden cursor-default"
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {/* Hover glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${f.bg} blur-[40px]`} />

              <div className={`relative w-10 h-10 rounded-xl ${f.bg} border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className={`w-4 h-4 ${f.color}`} />
              </div>
              <p className="relative text-white font-bold text-[15px] mb-1.5">{f.title}</p>
              <p className="relative text-gray-500 text-[13px] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
