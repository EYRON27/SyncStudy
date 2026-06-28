import { motion } from 'framer-motion'
import { CheckSquare, Users, Brain, DollarSign, FileText, BarChart2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  return (
    <div className="bg-[#0f1015] text-white font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <main className="container mx-auto px-6 pt-40 pb-24 relative z-10">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#ff8c37] text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-[#ff8c37]/10 px-4 py-1.5 rounded-full border border-[#ff8c37]/20"
          >
            Platform Features
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-[1.1] mb-8"
          >
            Everything you need, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              nothing you don't.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-[18px] md:text-[20px] max-w-2xl leading-relaxed"
          >
            Six powerful tools that work together seamlessly, so you can focus on learning — not managing apps. Built entirely around the modern student workflow.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32">
          {[
            { icon: CheckSquare, title: "Smart Task Management", desc: "Kanban-style boards to organize assignments by course, priority, and deadline. Automatically extracts due dates from your syllabus uploads.", color: "text-blue-400" },
            { icon: Users, title: "Live Study Rooms", desc: "Real-time collaborative spaces with video, chat, and screen sharing. Built-in Pomodoro timers keep group sessions focused and productive.", color: "text-[#ff8c37]" },
            { icon: Brain, title: "AI Study Assistant", desc: "Get instant explanations, summaries, flashcard generation, and personalized study plans powered by specialized academic AI models.", color: "text-purple-400" },
            { icon: DollarSign, title: "Budget Tracker", desc: "Visual expense breakdowns with pie charts, category tags, and monthly budget alerts tailored specifically for student life and campus spending.", color: "text-emerald-400" },
            { icon: FileText, title: "Notes & Knowledge Base", desc: "Rich-text notes organized by subject. AI summarization and smart search across your entire library so you never lose a lecture thought again.", color: "text-pink-400" },
            { icon: BarChart2, title: "Study Analytics", desc: "Weekly study hour reports, task completion trends, and AI interaction stats to help you optimize your habits and spot burnout before it happens.", color: "text-cyan-400" }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.15 }}
              className="bg-[#121317]/80 backdrop-blur-xl border border-gray-800/50 p-10 rounded-[30px] hover:bg-[#1a1b24] hover:-translate-y-2 transition-all duration-300 group shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.02] rounded-full blur-3xl group-hover:bg-white/[0.04] transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-[#0f1015] border border-gray-800/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              <h3 className="text-white font-bold text-[24px] mb-4 tracking-tight">{service.title}</h3>
              <p className="text-gray-400 text-[16px] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto bg-gradient-to-br from-[#121317] to-[#1a1b24] border border-gray-800/80 p-12 rounded-[40px]"
        >
          <h2 className="text-3xl font-bold mb-6">Stop switching tabs. Start studying.</h2>
          <p className="text-gray-400 mb-8 text-[16px]">Get access to all these tools in one unified dashboard.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-bold text-[16px] hover:opacity-90 transition-all shadow-[0_8px_30px_rgba(255,140,55,0.4)] hover:-translate-y-1"
          >
            Explore All Features
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
