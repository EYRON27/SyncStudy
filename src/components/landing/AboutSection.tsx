import { motion } from 'framer-motion'
import { Zap, Shield, Sparkles, Globe } from 'lucide-react'
import { Stat } from '@/components/landing/Cards'

const FEATURES = [
  { icon: Zap,      title: 'Lightning Fast',  desc: 'Real-time sync. No lag, no missed updates.',      color: 'text-[#ff8c37]' },
  { icon: Shield,   title: 'Privacy First',   desc: 'Encrypted. Never sold. Your data stays yours.',    color: 'text-blue-400'   },
  { icon: Sparkles, title: 'AI-Native',       desc: 'AI built into every feature, not bolted on.',      color: 'text-purple-400' },
  { icon: Globe,    title: 'Works Offline',   desc: 'Core features persist without a connection.',       color: 'text-emerald-400'},
]

const STATS = [
  { value: '50K+', label: 'Students',     accent: 'text-[#ff8c37]' },
  { value: '200+', label: 'Universities', accent: 'text-blue-400'   },
  { value: '4.9★', label: 'Rating',       accent: 'text-purple-400' },
]

export function AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: copy + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#ff8c37] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-5">
              <span className="w-6 h-px bg-[#ff8c37]" />About SyncStudy
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-7">
              Built for students,<br />
              <span className="text-gray-500">by students.</span>
            </h2>
            <p className="text-gray-400 text-[16px] leading-relaxed mb-5">
              SyncStudy was born from the chaos of juggling assignments, group projects, tight budgets, and the desperate need to actually understand the material. We built the tool we wished existed.
            </p>
            <p className="text-gray-400 text-[16px] leading-relaxed mb-10">
              Today, thousands of students use SyncStudy to stay organized, collaborate in real time, and tap into AI assistance that actually understands academic content.
            </p>

            <div className="flex items-center gap-10 md:gap-16">
              {STATS.map(({ value, label, accent }, i) => (
                <>
                  {i > 0 && <div key={`div-${i}`} className="w-px h-12 bg-white/[0.06]" />}
                  <Stat key={label} value={value} label={label} accent={accent} />
                </>
              ))}
            </div>
          </motion.div>

          {/* Right: 2×2 feature mini-cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-[#121318] border border-white/[0.07] rounded-[24px] p-6 flex flex-col gap-4 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <f.icon className={`w-4 h-4 ${f.color}`} />
                </div>
                <div>
                  <p className="text-white font-bold text-[15px] mb-1">{f.title}</p>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
