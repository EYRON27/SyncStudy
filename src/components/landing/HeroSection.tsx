import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, ChevronDown } from 'lucide-react'
import { GridBg, Orbs } from '@/components/landing/Backgrounds'

const TRUST_BADGES = [
  { icon: Shield, label: 'SOC 2 Compliant', color: 'text-blue-400' },
  { icon: Zap, label: '99.9% Uptime', color: 'text-[#ff8c37]' },
  { icon: Globe, label: '50k+ Students', color: 'text-emerald-400' },
]

function AppWindowMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-[1100px] mx-auto mt-24 px-4"
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-b from-[#ff8c37]/20 to-purple-500/10 blur-3xl rounded-[40px] opacity-70" />
        <div className="relative rounded-[24px] border border-white/[0.09] bg-[#111216] shadow-2xl overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0d0e12]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <div className="flex-1 mx-4">
              <div className="max-w-[220px] mx-auto h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <span className="text-gray-600 text-[10px]">app.syncstudy.io</span>
              </div>
            </div>
          </div>
          {/* Dashboard skeleton */}
          <div className="p-6 grid grid-cols-12 gap-4 h-[340px] opacity-30 pointer-events-none">
            <div className="col-span-2 flex flex-col gap-3">
              <div className="h-8 rounded-lg bg-white/10" />
              <div className="h-6 rounded-lg bg-white/6 w-3/4" />
              <div className="h-6 rounded-lg bg-white/6 w-4/5" />
              <div className="h-6 rounded-lg bg-white/6 w-2/3" />
              <div className="h-6 rounded-lg bg-white/6 w-3/5" />
              <div className="mt-auto h-8 rounded-lg bg-white/4" />
            </div>
            <div className="col-span-7 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="h-24 rounded-xl bg-white/6 border border-white/5" />
                <div className="h-24 rounded-xl bg-white/6 border border-white/5" />
                <div className="h-24 rounded-xl bg-white/6 border border-white/5" />
              </div>
              <div className="flex-1 rounded-xl bg-white/4 border border-white/5" />
            </div>
            <div className="col-span-3 flex flex-col gap-3">
              <div className="h-32 rounded-xl bg-white/6 border border-white/5" />
              <div className="flex-1 rounded-xl bg-white/4 border border-white/5" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      <GridBg />
      <Orbs />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-[900px] mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] font-bold tracking-[0.15em] uppercase text-gray-300 mb-10 backdrop-blur-sm"
        >
          <Zap className="w-3 h-3 text-[#ff8c37] fill-[#ff8c37]" />
          AI-Powered Student Productivity
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,10vw,7rem)] font-black leading-[0.95] tracking-[-0.04em] text-white mb-6"
        >
          Study{' '}
          <span
            className="inline-block text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #ff9b4f 0%, #e65c00 40%, #ff4081 100%)' }}
          >
            Smarter,
          </span>
          <br />
          Together.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-gray-400 text-[17px] md:text-[19px] max-w-[600px] leading-relaxed mb-10"
        >
          The all-in-one hub for students. Manage tasks, collaborate in live study rooms, track your budget, and get AI-powered help — all from one place.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/register"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[15px] font-bold text-white overflow-hidden shadow-[0_0_30px_rgba(255,140,55,0.3)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c37] to-[#e65c00] transition-all duration-300 group-hover:from-[#ff9a50] group-hover:to-[#ff6b1a]" />
            <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
            <span className="relative">Get Started Free</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[15px] font-semibold text-gray-300 border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-[12px] text-gray-500 font-medium"
        >
          {TRUST_BADGES.map(({ icon: Icon, label, color }, i) => (
            <>
              {i > 0 && <span key={`sep-${i}`} className="w-px h-3 bg-gray-700" />}
              <span key={label} className="flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${color}`} /> {label}
              </span>
            </>
          ))}
        </motion.div>
      </motion.div>

      <AppWindowMockup />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600 hover:text-[#ff8c37] transition-colors cursor-pointer"
      >
        <span className="text-[11px] font-bold tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  )
}
