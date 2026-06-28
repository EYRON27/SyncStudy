import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckSquare, Users, Brain, DollarSign, FileText, BarChart2 } from 'lucide-react'
import { BentoCard } from '@/components/landing/Cards'

const SERVICES = [
  { icon: CheckSquare, title: 'Smart Task Management',  desc: 'Kanban boards organized by course, priority, and deadline. Never miss a due date again.',                                      color: 'text-blue-400',     delay: 0   },
  { icon: Users,       title: 'Live Study Rooms',        desc: 'Real-time collaborative spaces with video, chat, and screen sharing. Study together from anywhere.',                              color: 'text-[#ff8c37]',    delay: 0.1 },
  { icon: Brain,       title: 'AI Study Assistant',      desc: 'Instant explanations, summaries, and personalized study plans powered by advanced AI.',                                          color: 'text-purple-400',   delay: 0.2 },
  { icon: DollarSign,  title: 'Budget Tracker',          desc: 'Visual expense breakdowns with charts and smart monthly alerts built for student spending.',                                      color: 'text-emerald-400',  delay: 0.3 },
  { icon: FileText,    title: 'Notes & Knowledge Base',  desc: 'Rich-text notes by subject with AI summarization and smart search across your entire library.',                                   color: 'text-pink-400',     delay: 0.4 },
  { icon: BarChart2,   title: 'Study Analytics',         desc: 'Weekly study hour reports and task completion trends to optimize your habits and avoid burnout.',                                 color: 'text-cyan-400',     delay: 0.5 },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-[1100px]">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#ff8c37] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-5">
            <span className="w-6 h-px bg-[#ff8c37]" />Services<span className="w-6 h-px bg-[#ff8c37]" />
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Everything you need.</h2>
          <p className="text-gray-400 text-[16px] max-w-xl mx-auto">
            Six powerful tools that work together seamlessly so you can focus on learning, not managing apps.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((s) => <BentoCard key={s.title} {...s} />)}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-[14px] font-bold text-white overflow-hidden"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 25px rgba(255,140,55,0.25)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c37] to-[#e05500] transition-all duration-300 group-hover:brightness-110" />
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="relative">Explore All Features</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
