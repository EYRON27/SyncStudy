import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, ChevronDown } from 'lucide-react'
import { GridBg, Orbs } from '@/components/landing/Backgrounds'

const TRUST_BADGES = [
  { icon: Shield, label: 'SOC 2 Compliant', color: 'text-blue-400'    },
  { icon: Zap,    label: '99.9% Uptime',    color: 'text-[#ff8c37]'   },
  { icon: Globe,  label: '50k+ Students',   color: 'text-emerald-400' },
]

function AppWindowMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-[1000px] mx-auto mt-16 px-4"
    >
      <div className="relative">
        {/* Radial glow behind the window */}
        <div className="absolute -inset-8 rounded-[48px] opacity-60"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,140,55,0.22) 0%, rgba(139,92,246,0.10) 60%, transparent 100%)' }}
        />

        <div className="relative rounded-[20px] border border-white/[0.09] bg-[#0f1014] shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0d0e12]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <div className="flex-1 mx-4">
              <div className="max-w-[200px] mx-auto h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <span className="text-gray-600 text-[10px] font-mono">app.syncstudy.io</span>
              </div>
            </div>
          </div>

          {/* Dashboard skeleton */}
          <div className="p-5 grid grid-cols-12 gap-3 h-[280px] pointer-events-none select-none">
            {/* Sidebar */}
            <div className="col-span-2 flex flex-col gap-2.5">
              <div className="h-7 rounded-lg bg-white/[0.07]" />
              {[0.6, 0.7, 0.5, 0.65, 0.55].map((w, i) => (
                <div key={i} className="h-5 rounded-lg bg-white/[0.04]" style={{ width: `${w * 100}%` }} />
              ))}
              <div className="mt-auto h-7 rounded-lg bg-white/[0.03]" />
            </div>
            {/* Main */}
            <div className="col-span-7 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="h-20 rounded-xl bg-white/[0.05] border border-white/[0.04]" />
                ))}
              </div>
              <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.04]" />
            </div>
            {/* Right panel */}
            <div className="col-span-3 flex flex-col gap-2.5">
              <div className="h-28 rounded-xl bg-white/[0.05] border border-white/[0.04]" />
              <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.04]" />
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-0 overflow-hidden"
    >
      <GridBg />
      <Orbs />

      {/* Hero copy block */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-[840px] mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] font-bold tracking-[0.16em] uppercase text-gray-400 mb-8 backdrop-blur-sm"
        >
          <Zap className="w-3 h-3 text-[#ff8c37] fill-[#ff8c37]" />
          AI-Powered Student Productivity
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.8rem,9vw,6.5rem)] font-black leading-[0.96] tracking-[-0.04em] text-white mb-7"
        >
          Study{' '}
          <span
            className="inline-block text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #ffb347 0%, #e65c00 45%, #ff4081 100%)' }}
          >
            Smarter,
          </span>
          <br />
          Together.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-gray-400 text-[16px] md:text-[18px] max-w-[560px] leading-relaxed mb-9"
        >
          The all-in-one hub for students. Tasks, live study rooms, budget tracking,
          and AI-powered help — all from one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-[15px] font-bold text-white overflow-hidden"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset, 0 4px 30px rgba(255,140,55,0.35)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c37] to-[#e05500] transition-all duration-300 group-hover:brightness-110" />
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="relative">Get Started Free</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-[15px] font-semibold text-gray-300 border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.18] transition-all duration-200"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-5 text-[12px] text-gray-500 font-medium"
        >
          {TRUST_BADGES.map(({ icon: Icon, label, color }, i) => (
            <span key={label} className="flex items-center gap-1.5">
              {i > 0 && <span className="w-px h-3 bg-gray-800 mr-3" />}
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* App window */}
      <AppWindowMockup />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative z-10 mt-10 mb-8 flex flex-col items-center gap-1.5 text-gray-600 hover:text-[#ff8c37] transition-colors duration-200 cursor-pointer select-none"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  )
}
