import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-[#0f1015] text-white font-sans relative overflow-hidden">
      <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-[#ff8c37]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <main className="container mx-auto px-6 pt-40 pb-32 relative z-10 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#ff8c37] text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-[#ff8c37]/10 px-4 py-1.5 rounded-full border border-[#ff8c37]/20"
          >
            Get In Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-6"
          >
            We're here to help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-[16px] max-w-xl leading-relaxed"
          >
            Need assistance, have a feature request, or want to report a bug? Reach out to our team directly.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Email Card */}
          <div className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-10 rounded-[30px] hover:bg-[#1a1b24] transition-all hover:-translate-y-1 shadow-lg group flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0f1015] border border-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Mail className="w-7 h-7 text-[#ff8c37]" />
            </div>
            <h3 className="text-white font-bold text-[20px] mb-3">Email Us</h3>
            <p className="text-gray-400 text-[15px] mb-6 leading-relaxed">
              For support, feedback, or any general inquiries, shoot us an email. We usually respond within 24 hours.
            </p>
            <a href="mailto:support@syncstudy.app" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#1a1b24] border border-[#ff8c37]/30 text-[#ff8c37] font-semibold text-[14px] hover:bg-[#ff8c37] hover:text-white transition-all">
              support@syncstudy.app
            </a>
          </div>

          {/* Headquarters Card */}
          <div className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-10 rounded-[30px] hover:bg-[#1a1b24] transition-all hover:-translate-y-1 shadow-lg group flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0f1015] border border-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <MapPin className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-white font-bold text-[20px] mb-3">Headquarters</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              123 Innovation Drive<br />
              Tech District<br />
              San Francisco, CA 94105
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
