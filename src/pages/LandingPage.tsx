import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Shield, Globe, Sparkles, ChevronDown, Star, BookOpen, CheckSquare, Users, Brain, DollarSign, FileText, BarChart2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, 50, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#ff8c37]/10 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{ scale: [1, 1.5, 1], x: [0, -100, 0], y: [0, -50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, 100, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
    />
  </div>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f1015] text-white font-sans relative">
      <BackgroundOrbs />
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-12 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff8c37]/30 bg-[#ff8c37]/10 text-[#ff8c37] text-[11px] font-bold tracking-[0.15em] uppercase mb-10 backdrop-blur-sm"
        >
          <Zap className="w-3 h-3 fill-[#ff8c37]" />
          AI Powered Student Productivity
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-[6rem] font-black tracking-[-0.03em] leading-[1.05] mb-8"
        >
          Study <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c37] to-[#ff4081] blur-2xl opacity-40 animate-pulse"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#ff9b4f] to-[#e65c00]">
              Smarter,
            </span>
          </span>
          <br />
          Together.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 max-w-2xl text-[17px] md:text-lg mb-12 leading-relaxed"
        >
          The all-in-one productivity hub for students. Manage tasks, collaborate in
          live study rooms, track your budget, and get AI-powered help — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_8px_20px_rgba(255,140,55,0.3)] hover:shadow-[0_8px_30px_rgba(255,140,55,0.5)]"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#16171b]/80 backdrop-blur-md border border-gray-800 text-white font-medium hover:bg-[#1f2025] transition-colors"
          >
            Sign In
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[13px] text-gray-500 font-medium"
        >
          <div className="flex items-center gap-2 bg-[#121317]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            <Shield className="w-4 h-4 text-blue-400/80" />
            Secure & Private
          </div>
          <div className="flex items-center gap-2 bg-[#121317]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            <Zap className="w-4 h-4 text-[#ff8c37]" />
            AI-Powered
          </div>
          <div className="flex items-center gap-2 bg-[#121317]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            <Globe className="w-4 h-4 text-[#ff8c37]" />
            Works Everywhere
          </div>
        </motion.div>

        {/* Mock App Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 w-full max-w-[1000px] mx-auto rounded-t-[20px] border border-gray-800/80 bg-[#121317]/80 backdrop-blur-xl shadow-2xl overflow-hidden h-[350px] relative ring-1 ring-white/5 group"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff8c37]/20 blur-[100px] rounded-full group-hover:bg-[#ff8c37]/30 transition-colors duration-700" />
          {/* Window Controls */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800/80 bg-[#0d0e12]/80 backdrop-blur-md relative z-10">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          {/* Mock Content */}
          <div className="p-6 h-full flex flex-col gap-4 opacity-20 pointer-events-none relative z-10">
            <div className="w-48 h-8 bg-gray-700/50 rounded-lg" />
            <div className="flex gap-4">
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
            </div>
            <div className="w-full h-64 bg-gray-700/50 rounded-lg" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent z-20" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-col items-center justify-center text-gray-600 text-xs font-medium gap-2 cursor-pointer hover:text-[#ff8c37] transition-colors"
        >
          Scroll to explore
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </main>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="text-[#ff8c37] text-xs font-bold tracking-[0.15em] uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-[#ff8c37]"></span> ABOUT SYNCSTUDY
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] mb-6 leading-[1.1]">
              Built for students, <br />
              <span className="text-gray-500">by students.</span>
            </h2>
            <p className="text-gray-400 text-[17px] leading-relaxed mb-6">
              SyncStudy was born from the chaos of juggling assignments, group projects, tight budgets, and the desperate need to actually understand the material. We built the tool we wished existed.
            </p>
            <p className="text-gray-400 text-[17px] leading-relaxed mb-12">
              Today, thousands of students use SyncStudy to stay organized, collaborate in real time, and tap into AI assistance that actually understands academic content. From freshman orientation to PhD thesis defense, we have you covered.
            </p>
            <div className="flex flex-wrap items-center gap-10 md:gap-16">
              <div className="flex flex-col gap-1.5">
                <span className="text-4xl font-black text-white tracking-tight">50K+</span>
                <span className="text-sm text-[#ff8c37] font-bold">Students</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-4xl font-black text-white tracking-tight">200+</span>
                <span className="text-sm text-blue-400 font-bold">Universities</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-4xl font-black text-white tracking-tight">4.9★</span>
                <span className="text-sm text-purple-400 font-bold">Rating</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Real-time sync across all your devices. No lag, no missed updates.", color: "text-[#ff8c37]" },
              { icon: Shield, title: "Privacy First", desc: "Your notes and data are encrypted and never sold to third parties.", color: "text-blue-400" },
              { icon: Sparkles, title: "AI-Native", desc: "AI woven into every feature, not bolted on as an afterthought.", color: "text-purple-400" },
              { icon: Globe, title: "Works Offline", desc: "Core features work without internet. Sync when you reconnect.", color: "text-emerald-400" }
            ].map((feature, i) => (
              <div key={i} className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-6 rounded-[24px] hover:border-gray-700 hover:bg-[#16171b] hover:-translate-y-1 transition-all duration-300 group cursor-default shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#1a1b24] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-white font-bold text-[16px] mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#ff8c37] text-xs font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-[#ff8c37]"></span> SERVICES <span className="w-8 h-px bg-[#ff8c37]"></span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-[-0.02em] text-white mb-4"
          >
            Everything you need, <br />
            <span className="text-gray-500">nothing you don't.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-[17px] max-w-2xl"
          >
            Six powerful tools that work together seamlessly, so you can focus on learning — not managing apps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {[
            { icon: CheckSquare, title: "Smart Task Management", desc: "Kanban-style boards to organize assignments by course, priority, and deadline. Never miss a due date.", color: "text-blue-400" },
            { icon: Users, title: "Live Study Rooms", desc: "Real-time collaborative spaces with video, chat, and screen sharing. Study together from anywhere.", color: "text-[#ff8c37]" },
            { icon: Brain, title: "AI Study Assistant", desc: "Get instant explanations, summaries, flashcard generation, and personalized study plans powered by AI.", color: "text-purple-400" },
            { icon: DollarSign, title: "Budget Tracker", desc: "Visual expense breakdowns with pie charts, category tags, and monthly budget alerts for student life.", color: "text-emerald-400" },
            { icon: FileText, title: "Notes & Knowledge Base", desc: "Rich-text notes organized by subject. AI summarization and smart search across your entire library.", color: "text-pink-400" },
            { icon: BarChart2, title: "Study Analytics", desc: "Weekly study hour reports, task completion trends, and AI interaction stats to optimize your habits.", color: "text-cyan-400" }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 rounded-[24px] hover:border-gray-600 hover:bg-[#1a1b24] hover:-translate-y-2 transition-all duration-300 group shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-[#0f1015] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-gray-800/50">
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              <h3 className="text-white font-bold text-[18px] mb-3">{service.title}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-[#ff8c37] text-xs font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-[#ff8c37]"></span> TESTIMONIALS <span className="w-8 h-px bg-[#ff8c37]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] text-white">
            Students love it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Sarah Chen", role: "CS Junior, MIT", initial: "SC", text: "SyncStudy completely changed how I organize my semester. The AI assistant alone saves me hours every week." },
            { name: "Marcus Williams", role: "Pre-Med, Johns Hopkins", initial: "MW", text: "The study rooms feature is incredible for group sessions. It feels like a real library, but online." },
            { name: "Amelia Torres", role: "Engineering, Stanford", initial: "AT", text: "Finally an app that gets student life. Budget tracking + notes + tasks in one place is a game changer." }
          ].map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 rounded-[24px] flex flex-col justify-between hover:border-gray-700 hover:-translate-y-1 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#ff8c37] text-[#ff8c37]" />
                  ))}
                </div>
                <p className="text-gray-300 italic text-[15px] leading-relaxed mb-8">
                  "{testi.text}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-300 text-sm font-bold border border-gray-700 shadow-inner">
                  {testi.initial}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[15px]">{testi.name}</span>
                  <span className="text-[#ff8c37] text-[12px] font-medium">{testi.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 relative z-10 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[1000px] mx-auto bg-[#121317]/80 backdrop-blur-xl border border-gray-800/50 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden ring-1 ring-white/5 shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#ff8c37]/20 to-transparent rounded-full pointer-events-none blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff8c37]/20 to-[#e65c00]/20 flex items-center justify-center mb-8 border border-[#ff8c37]/30 shadow-[0_0_30px_rgba(255,140,55,0.2)]">
              <BookOpen className="w-10 h-10 text-[#ff8c37]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] text-white mb-6">
              Ready to study smarter?
            </h2>
            <p className="text-gray-400 text-[18px] mb-10 max-w-lg">
              Join 50,000+ students who use SyncStudy every day to stay ahead.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_8px_30px_rgba(255,140,55,0.4)] hover:shadow-[0_8px_40px_rgba(255,140,55,0.6)] hover:-translate-y-0.5"
              >
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#1a1b24] border border-gray-700 text-white font-bold text-[16px] hover:bg-[#22232d] hover:-translate-y-0.5 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
