import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Sparkles, Globe, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { statsService, type LandingStats } from '@/features/stats/api/stats.service'

export default function AboutPage() {
  const [stats, setStats] = useState<LandingStats | null>(null)

  useEffect(() => {
    statsService.getLandingStats()
      .then(setStats)
      .catch(console.error)
  }, [])

  return (
    <div className="bg-[#0f1015] text-white font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ff8c37]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <main className="container mx-auto px-6 pt-40 pb-24 relative z-10">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#ff8c37] text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-[#ff8c37]/10 px-4 py-1.5 rounded-full border border-[#ff8c37]/20"
          >
            Our Mission
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-[1.1] mb-8"
          >
            Built for students, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
              by students.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-[18px] md:text-[20px] max-w-3xl leading-relaxed"
          >
            SyncStudy was born from the chaos of juggling assignments, group projects, tight budgets, and the desperate need to actually understand the material. We built the tool we wished existed.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#121317]/80 backdrop-blur-xl border border-gray-800/50 rounded-[40px] p-12 mb-32 relative overflow-hidden ring-1 ring-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff8c37]/5 to-blue-500/5 pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">{stats ? stats.usersCount : '-'}</span>
              <span className="text-sm text-[#ff8c37] font-bold tracking-widest uppercase">Active Students</span>
            </div>
            <div className="flex flex-col items-center gap-2 border-y md:border-y-0 md:border-x border-gray-800/50 py-10 md:py-0">
              <span className="text-6xl font-black text-white tracking-tighter">{stats ? stats.roomsCount : '-'}</span>
              <span className="text-sm text-blue-400 font-bold tracking-widest uppercase">Study Rooms</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">{stats ? `${stats.avgRating}★` : '-'}</span>
              <span className="text-sm text-purple-400 font-bold tracking-widest uppercase">Average Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 max-w-5xl mx-auto">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Real-time sync across all your devices. No lag, no missed updates. Built on edge infrastructure.", color: "text-[#ff8c37]" },
            { icon: Shield, title: "Privacy First", desc: "Your notes and data are encrypted and never sold to third parties. Your brain dump is safe with us.", color: "text-blue-400" },
            { icon: Sparkles, title: "AI-Native", desc: "AI woven into every feature, not bolted on as an afterthought. It understands your context and coursework.", color: "text-purple-400" },
            { icon: Globe, title: "Works Offline", desc: "Core features work without internet. Sync when you reconnect, perfect for spotty campus Wi-Fi.", color: "text-emerald-400" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#121317]/50 border border-gray-800/50 p-10 rounded-[30px] hover:bg-[#1a1b24] transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0f1015] border border-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-white font-bold text-[22px] mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 text-[16px] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to join the movement?</h2>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-bold text-[16px] hover:opacity-90 transition-all shadow-[0_8px_30px_rgba(255,140,55,0.4)] hover:-translate-y-1"
          >
            Create Your Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
