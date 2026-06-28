import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  ArrowRight, Zap, Shield, Globe, Sparkles, ChevronDown,
  Star, BookOpen, CheckSquare, Users, Brain, DollarSign, FileText, BarChart2
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ─── Animated Grid Background ─────────────────────────── */
function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '72px 72px'
        }}
      />
      {/* Radial gradient to fade grid at edges */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 0%,transparent 0%,#0f1015 90%)'
      }} />
    </div>
  )
}

/* ─── Floating orbs ─────────────────────────────────────── */
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(255,140,55,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-60 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─── Animated stat counter ─────────────────────────────── */
function Stat({ value, label, accent }: { value: string; label: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-5xl font-black text-white tracking-tighter"
      >{value}</motion.span>
      <span className={`text-[12px] font-bold uppercase tracking-widest ${accent}`}>{label}</span>
    </div>
  )
}

/* ─── Bento card ─────────────────────────────────────────── */
function BentoCard({
  icon: Icon, title, desc, color, delay = 0, wide = false
}: {
  icon: any; title: string; desc: string; color: string; delay?: number; wide?: boolean
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
      {/* Hover glow */}
      <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${color === 'text-[#ff8c37]' ? 'bg-[#ff8c37]' : color === 'text-blue-400' ? 'bg-blue-500' : color === 'text-purple-400' ? 'bg-purple-500' : color === 'text-emerald-400' ? 'bg-emerald-500' : color === 'text-pink-400' ? 'bg-pink-500' : 'bg-cyan-500'}`} />
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h3 className="text-white font-bold text-[17px] mb-2.5 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-[14px] leading-relaxed">{desc}</p>
    </motion.div>
  )
}

/* ─── Testimonial card ───────────────────────────────────── */
function TestiCard({ name, role, initials, text, delay = 0 }: {
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

/* ─── Main component ─────────────────────────────────────── */
export default function LandingPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div className="bg-[#0c0d10] min-h-screen text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
        <GridBg />
        <Orbs />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center text-center px-4 max-w-[900px] mx-auto"
        >
          {/* Pill badge */}
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

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-400 text-[17px] md:text-[19px] max-w-[600px] leading-relaxed mb-10"
          >
            The all-in-one hub for students. Manage tasks, collaborate in live study rooms, track your budget, and get AI-powered help — all from one place.
          </motion.p>

          {/* CTAs */}
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
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-400" /> SOC 2 Compliant</span>
            <span className="w-px h-3 bg-gray-700" />
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#ff8c37]" /> 99.9% Uptime</span>
            <span className="w-px h-3 bg-gray-700" />
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-400" /> 50k+ Students</span>
          </motion.div>
        </motion.div>

        {/* App preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1100px] mx-auto mt-24 px-4"
        >
          <div className="relative">
            {/* Glow behind window */}
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
              {/* Dashboard mockup content */}
              <div className="p-6 grid grid-cols-12 gap-4 h-[340px] opacity-30 pointer-events-none">
                {/* Sidebar */}
                <div className="col-span-2 flex flex-col gap-3">
                  <div className="h-8 rounded-lg bg-white/10" />
                  <div className="h-6 rounded-lg bg-white/6 w-3/4" />
                  <div className="h-6 rounded-lg bg-white/6 w-4/5" />
                  <div className="h-6 rounded-lg bg-white/6 w-2/3" />
                  <div className="h-6 rounded-lg bg-white/6 w-3/5" />
                  <div className="mt-auto h-8 rounded-lg bg-white/4" />
                </div>
                {/* Main area */}
                <div className="col-span-7 flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-24 rounded-xl bg-white/6 border border-white/5" />
                    <div className="h-24 rounded-xl bg-white/6 border border-white/5" />
                    <div className="h-24 rounded-xl bg-white/6 border border-white/5" />
                  </div>
                  <div className="flex-1 rounded-xl bg-white/4 border border-white/5" />
                </div>
                {/* Right panel */}
                <div className="col-span-3 flex flex-col gap-3">
                  <div className="h-32 rounded-xl bg-white/6 border border-white/5" />
                  <div className="flex-1 rounded-xl bg-white/4 border border-white/5" />
                </div>
              </div>
              {/* Fade-out gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

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

      {/* ═══════════════════════ FEATURES STRIP ══════════════════ */}
      <section className="border-y border-white/[0.05] bg-[#0e0f12] py-5 overflow-hidden relative">
        <div className="flex gap-16 items-center animate-[marquee_30s_linear_infinite] whitespace-nowrap text-gray-500 font-semibold text-[14px]">
          {['Smart Task Boards', 'Live Study Rooms', 'AI Assistant', 'Budget Tracker', 'Rich Notes', 'Study Analytics', 'Video Calls', 'File Sharing', 'Smart Task Boards', 'Live Study Rooms', 'AI Assistant', 'Budget Tracker', 'Rich Notes', 'Study Analytics', 'Video Calls', 'File Sharing'].map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[#ff8c37]" />{item}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════ ABOUT ═══════════════════════════ */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
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

              {/* Stats row */}
              <div className="flex items-center gap-10 md:gap-16">
                <Stat value="50K+" label="Students" accent="text-[#ff8c37]" />
                <div className="w-px h-12 bg-white/[0.06]" />
                <Stat value="200+" label="Universities" accent="text-blue-400" />
                <div className="w-px h-12 bg-white/[0.06]" />
                <Stat value="4.9★" label="Rating" accent="text-purple-400" />
              </div>
            </motion.div>

            {/* Feature cards 2x2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Real-time sync. No lag, no missed updates.", color: "text-[#ff8c37]" },
                { icon: Shield, title: "Privacy First", desc: "Encrypted. Never sold. Your data stays yours.", color: "text-blue-400" },
                { icon: Sparkles, title: "AI-Native", desc: "AI built into every feature, not bolted on.", color: "text-purple-400" },
                { icon: Globe, title: "Works Offline", desc: "Core features persist without a connection.", color: "text-emerald-400" }
              ].map((f, i) => (
                <motion.div
                  key={i}
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

      {/* ════════════════════════ SERVICES BENTO ══════════════════ */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="text-center mb-16">
            <p className="text-[#ff8c37] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-5">
              <span className="w-6 h-px bg-[#ff8c37]" />Services<span className="w-6 h-px bg-[#ff8c37]" />
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Everything you need.
            </h2>
            <p className="text-gray-400 text-[16px] max-w-xl mx-auto">
              Six powerful tools that work together seamlessly so you can focus on learning, not managing apps.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BentoCard icon={CheckSquare} title="Smart Task Management" desc="Kanban boards organized by course, priority, and deadline. Never miss a due date again." color="text-blue-400" delay={0} />
            <BentoCard icon={Users} title="Live Study Rooms" desc="Real-time collaborative spaces with video, chat, and screen sharing. Study together from anywhere." color="text-[#ff8c37]" delay={0.1} />
            <BentoCard icon={Brain} title="AI Study Assistant" desc="Instant explanations, summaries, and personalized study plans powered by advanced AI." color="text-purple-400" delay={0.2} />
            <BentoCard icon={DollarSign} title="Budget Tracker" desc="Visual expense breakdowns with charts and smart monthly alerts built for student spending." color="text-emerald-400" delay={0.3} />
            <BentoCard icon={FileText} title="Notes & Knowledge Base" desc="Rich-text notes by subject with AI summarization and smart search across your entire library." color="text-pink-400" delay={0.4} />
            <BentoCard icon={BarChart2} title="Study Analytics" desc="Weekly study hour reports and task completion trends to optimize your habits and avoid burnout." color="text-cyan-400" delay={0.5} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-10"
          >
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-white/[0.1] bg-white/[0.04] text-[14px] font-semibold text-gray-300 hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all"
            >
              Explore All Features
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ════════════════════ */}
      <section id="testimonials" className="py-32 relative">
        <div className="container mx-auto px-6 max-w-[1100px]">
          <div className="text-center mb-16">
            <p className="text-[#ff8c37] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-5">
              <span className="w-6 h-px bg-[#ff8c37]" />Testimonials<span className="w-6 h-px bg-[#ff8c37]" />
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Students love it.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <TestiCard name="Sarah Chen" role="CS Junior, MIT" initials="SC" text="SyncStudy completely changed how I organize my semester. The AI assistant alone saves me hours every week." delay={0} />
            <TestiCard name="Marcus Williams" role="Pre-Med, Johns Hopkins" initials="MW" text="The study rooms feature is incredible for group sessions. It feels like a real library, but online." delay={0.1} />
            <TestiCard name="Amelia Torres" role="Engineering, Stanford" initials="AT" text="Finally an app that gets student life. Budget tracking + notes + tasks in one place is a game changer." delay={0.2} />
          </div>
        </div>
      </section>

      {/* ════════════════════════ CTA ═════════════════════════════ */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[40px] p-px"
            style={{ background: 'linear-gradient(135deg, rgba(255,140,55,0.4), rgba(139,92,246,0.2), rgba(255,140,55,0.1))' }}
          >
            <div className="relative bg-[#111216] rounded-[39px] px-10 py-20 text-center overflow-hidden">
              {/* Inner glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(255,140,55,0.15) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#ff8c37]/20 to-[#e65c00]/20 border border-[#ff8c37]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,140,55,0.25)]">
                  <BookOpen className="w-8 h-8 text-[#ff8c37]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
                  Ready to study smarter?
                </h2>
                <p className="text-gray-400 text-[17px] mb-10 max-w-md mx-auto">
                  Join 50,000+ students who use SyncStudy every day to stay ahead.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-[15px] font-bold text-white overflow-hidden shadow-[0_0_40px_rgba(255,140,55,0.35)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c37] to-[#e65c00] group-hover:from-[#ff9a50] group-hover:to-[#ff6b1a] transition-all" />
                    <span className="relative">Start for Free</span>
                    <ArrowRight className="relative w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-[15px] font-semibold text-gray-300 border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
