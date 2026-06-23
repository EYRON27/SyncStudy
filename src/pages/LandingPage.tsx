import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Shield, Globe, Sparkles, ChevronDown, Star, BookOpen, CheckSquare, Users, Brain, DollarSign, FileText, BarChart2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f1015] text-white overflow-hidden font-sans relative">
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-500/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-lg shadow-[0_2px_10px_rgba(255,140,55,0.4)]">
            S
          </div>
          <span className="text-xl font-bold tracking-tight">SyncStudy</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-400">
          <a href="#home" className="text-white hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)]"
          >
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24 pb-12 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff8c37]/30 bg-[#ff8c37]/10 text-[#ff8c37] text-[11px] font-bold tracking-[0.15em] uppercase mb-10"
        >
          <Zap className="w-3 h-3 fill-[#ff8c37]" />
          AI Powered Student Productivity
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-[5.5rem] font-black tracking-[-0.02em] leading-[1.05] mb-8"
        >
          Study <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9b4f] to-[#e65c00]">
            Smarter,
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_8px_20px_rgba(255,140,55,0.25)]"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#16171b] border border-gray-800 text-white font-medium hover:bg-[#1f2025] transition-colors"
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
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400/80" />
            Secure & Private
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff8c37]" />
            AI-Powered
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#ff8c37]" />
            Works Everywhere
          </div>
        </motion.div>

        {/* Mock App Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 w-full max-w-[1000px] mx-auto rounded-t-[20px] border border-gray-800/80 bg-[#121317] shadow-2xl overflow-hidden h-[350px] relative ring-1 ring-white/5"
        >
          {/* Window Controls */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800/80 bg-[#0d0e12]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          {/* Mock Content */}
          <div className="p-6 h-full flex flex-col gap-4 opacity-20 pointer-events-none">
            <div className="w-48 h-8 bg-gray-700/50 rounded-lg" />
            <div className="flex gap-4">
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
              <div className="w-1/4 h-32 bg-gray-700/50 rounded-lg" />
            </div>
            <div className="w-full h-64 bg-gray-700/50 rounded-lg" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-col items-center justify-center text-gray-600 text-xs font-medium gap-2 cursor-pointer hover:text-gray-400 transition-colors"
        >
          Scroll
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </main>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="text-[#ff8c37] text-xs font-bold tracking-[0.15em] uppercase mb-6">
              ABOUT SYNCSTUDY
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

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-10 md:gap-16">
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-black text-white tracking-tight">50K+</span>
                <span className="text-sm text-gray-500 font-medium">Students</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-black text-white tracking-tight">200+</span>
                <span className="text-sm text-gray-500 font-medium">Universities</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-black text-white tracking-tight">4.9★</span>
                <span className="text-sm text-gray-500 font-medium">Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Feature Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Card 1 */}
            <div className="bg-[#121317] border border-gray-800/80 p-6 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group cursor-default">
              <div className="w-10 h-10 rounded-[10px] bg-[#1a1512] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 text-[#ff8c37]" />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-2">Lightning Fast</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Real-time sync across all your devices. No lag, no missed updates.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#121317] border border-gray-800/80 p-6 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group cursor-default">
              <div className="w-10 h-10 rounded-[10px] bg-[#12171c] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-2">Privacy First</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Your notes and data are encrypted and never sold to third parties.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#121317] border border-gray-800/80 p-6 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group cursor-default">
              <div className="w-10 h-10 rounded-[10px] bg-[#1a1512] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-[#ff8c37]" />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-2">AI-Native</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                AI woven into every feature, not bolted on as an afterthought.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#121317] border border-gray-800/80 p-6 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group cursor-default">
              <div className="w-10 h-10 rounded-[10px] bg-[#121a16] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-2">Works Offline</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Core features work without internet. Sync when you reconnect.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#ff8c37] text-xs font-bold tracking-[0.15em] uppercase mb-4"
          >
            SERVICES
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
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#1a1c23] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <CheckSquare className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-white font-bold text-[17px] mb-3">Smart Task Management</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Kanban-style boards to organize assignments by course, priority, and deadline. Never miss a due date.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#1a1512] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-5 h-5 text-[#ff8c37]" />
            </div>
            <h3 className="text-white font-bold text-[17px] mb-3">Live Study Rooms</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Real-time collaborative spaces with video, chat, and screen sharing. Study together from anywhere.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#1a1512] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-5 h-5 text-[#ff8c37]" />
            </div>
            <h3 className="text-white font-bold text-[17px] mb-3">AI Study Assistant</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Get instant explanations, summaries, flashcard generation, and personalized study plans powered by AI.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#121a16] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-white font-bold text-[17px] mb-3">Budget Tracker</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Visual expense breakdowns with pie charts, category tags, and monthly budget alerts for student life.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#1a131b] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white font-bold text-[17px] mb-3">Notes & Knowledge Base</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Rich-text notes organized by subject. AI summarization and smart search across your entire library.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] hover:border-gray-700 hover:bg-[#16171b] transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-[10px] bg-[#131b20] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <BarChart2 className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-white font-bold text-[17px] mb-3">Study Analytics</h3>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Weekly study hour reports, task completion trends, and AI interaction stats to optimize your habits.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/register"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_8px_20px_rgba(255,140,55,0.25)]"
          >
            Explore All Features
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-[#ff8c37] text-xs font-bold tracking-[0.15em] uppercase mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] text-white">
            Students love it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Testimonial 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] flex flex-col justify-between hover:border-gray-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff8c37] text-[#ff8c37]" />
                ))}
              </div>
              <p className="text-gray-400 italic text-[15px] leading-relaxed mb-8">
                "SyncStudy completely changed how I organize my semester. The AI assistant alone saves me hours every week."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a1b20] flex items-center justify-center text-gray-400 text-sm font-semibold border border-gray-800">
                SC
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[14px]">Sarah Chen</span>
                <span className="text-gray-500 text-[12px]">CS Junior, MIT</span>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] flex flex-col justify-between hover:border-gray-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff8c37] text-[#ff8c37]" />
                ))}
              </div>
              <p className="text-gray-400 italic text-[15px] leading-relaxed mb-8">
                "The study rooms feature is incredible for group sessions. It feels like a real library, but online."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a1b20] flex items-center justify-center text-gray-400 text-sm font-semibold border border-gray-800">
                MW
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[14px]">Marcus Williams</span>
                <span className="text-gray-500 text-[12px]">Pre-Med, Johns Hopkins</span>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#121317] border border-gray-800/80 p-8 rounded-[20px] flex flex-col justify-between hover:border-gray-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff8c37] text-[#ff8c37]" />
                ))}
              </div>
              <p className="text-gray-400 italic text-[15px] leading-relaxed mb-8">
                "Finally an app that gets student life. Budget tracking + notes + tasks in one place is a game changer."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a1b20] flex items-center justify-center text-gray-400 text-sm font-semibold border border-gray-800">
                AT
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[14px]">Amelia Torres</span>
                <span className="text-gray-500 text-[12px]">Engineering, Stanford</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section Start */}
      <section className="container mx-auto px-6 py-24 relative z-10 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[1000px] mx-auto bg-[#121317] border border-gray-800/80 rounded-[30px] p-12 md:p-20 text-center relative overflow-hidden ring-1 ring-white/5"
        >
          {/* Subtle gradient at the top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#ff8c37]/15 to-transparent rounded-full pointer-events-none blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-[#ff8c37] mb-6" />
            <h2 className="text-4xl md:text-5xl font-black tracking-[-0.02em] text-white mb-6">
              Ready to study smarter?
            </h2>
            <p className="text-gray-400 text-[17px] mb-10">
              Join 50,000+ students who use SyncStudy every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_8px_20px_rgba(255,140,55,0.25)]"
              >
                Start for Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#16171b] border border-gray-800 text-white font-medium hover:bg-[#1f2025] transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-[#0a0a0c] pt-10 pb-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-xs">
                S
              </div>
              <span className="text-sm font-bold tracking-tight text-white">SyncStudy</span>
            </div>

            <p className="text-gray-600 text-[12px] font-medium">
              © 2025 SyncStudy. Built for students everywhere.
            </p>

            <div className="flex items-center gap-6 text-[12px] text-gray-500 font-medium">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
