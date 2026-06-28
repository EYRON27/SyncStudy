import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'

export function CTASection() {
  return (
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
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
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
  )
}
