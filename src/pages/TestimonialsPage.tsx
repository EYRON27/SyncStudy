import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const testimonials = [
  { name: "Sarah Chen", role: "CS Junior, MIT", initial: "SC", text: "SyncStudy completely changed how I organize my semester. The AI assistant alone saves me hours every week." },
  { name: "Marcus Williams", role: "Pre-Med, Johns Hopkins", initial: "MW", text: "The study rooms feature is incredible for group sessions. It feels like a real library, but online." },
  { name: "Amelia Torres", role: "Engineering, Stanford", initial: "AT", text: "Finally an app that gets student life. Budget tracking + notes + tasks in one place is a game changer." },
  { name: "David Kim", role: "Business, NYU", initial: "DK", text: "I used to have 4 different subscriptions for flashcards, notes, and task management. SyncStudy replaced all of them for a fraction of the cost." },
  { name: "Jessica Fox", role: "Law, Harvard", initial: "JF", text: "The AI document summarization is insanely accurate. It helps me digest hundreds of pages of case law before my study groups." },
  { name: "Omar Hassan", role: "Architecture, UCL", initial: "OH", text: "The visual interface is gorgeous. It actually makes me want to log in and look at my pending assignments instead of avoiding them." }
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#0f1015] text-white font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[20%] left-[20%] w-[800px] h-[800px] bg-[#ff8c37]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <Navbar />

      <main className="container mx-auto px-6 pt-40 pb-24 relative z-10">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#ff8c37] text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-[#ff8c37]/10 px-4 py-1.5 rounded-full border border-[#ff8c37]/20"
          >
            Wall of Love
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-[1.1] mb-8"
          >
            Don't just take <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9b4f] to-[#e65c00]">
              our word for it.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-[18px] md:text-[20px] max-w-2xl leading-relaxed"
          >
            Join the 50,000+ students worldwide who rely on SyncStudy to manage their academic lives, ace their exams, and maintain their sanity.
          </motion.p>
        </div>

        {/* Masonry / Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto mb-32 space-y-6">
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="break-inside-avoid bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 rounded-[30px] hover:border-gray-700 hover:-translate-y-1 transition-all shadow-lg"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#ff8c37] text-[#ff8c37]" />
                ))}
              </div>
              <p className="text-gray-300 text-[16px] leading-relaxed mb-8 font-medium">
                "{testi.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-gray-800/50 pt-6">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Become a success story.</h2>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-bold text-[16px] hover:opacity-90 transition-all shadow-[0_8px_30px_rgba(255,140,55,0.4)] hover:-translate-y-1"
          >
            Start for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
