import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0f1015] text-white font-sans relative overflow-hidden">
      <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-[#ff8c37]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <Navbar />

      <main className="container mx-auto px-6 pt-40 pb-24 relative z-10 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
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
            className="text-4xl md:text-6xl font-black tracking-[-0.03em] mb-6"
          >
            We'd love to hear from you
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl"
          >
            Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 rounded-[30px] hover:bg-[#1a1b24] transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-[#0f1015] border border-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-[#ff8c37]" />
              </div>
              <h3 className="text-white font-bold text-[18px] mb-2">Email Us</h3>
              <p className="text-gray-400 text-[14px] mb-4">We usually respond within 24 hours.</p>
              <a href="mailto:support@syncstudy.app" className="text-[#ff8c37] font-medium hover:underline">support@syncstudy.app</a>
            </div>

            <div className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 rounded-[30px] hover:bg-[#1a1b24] transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-[#0f1015] border border-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-[18px] mb-2">Live Chat</h3>
              <p className="text-gray-400 text-[14px] mb-4">Chat with our support team directly.</p>
              <button className="text-blue-400 font-medium hover:underline">Start a chat</button>
            </div>

            <div className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 rounded-[30px] hover:bg-[#1a1b24] transition-colors group sm:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0f1015] border border-gray-800 flex shrink-0 items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[18px] mb-1">Headquarters</h3>
                  <p className="text-gray-400 text-[14px]">
                    123 Innovation Drive, Tech District<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-10 rounded-[40px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff8c37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-white mb-8">Send a message</h3>
            
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold text-gray-300 mb-2 ml-1">First Name</label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full bg-[#0f1015] border border-gray-800/80 rounded-xl py-3 px-4 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-300 mb-2 ml-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-[#0f1015] border border-gray-800/80 rounded-xl py-3 px-4 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-2 ml-1">Email</label>
                <input
                  type="email"
                  placeholder="jane@university.edu"
                  className="w-full bg-[#0f1015] border border-gray-800/80 rounded-xl py-3 px-4 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-300 mb-2 ml-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-[#0f1015] border border-gray-800/80 rounded-xl py-3 px-4 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all resize-none custom-scrollbar"
                />
              </div>

              <button
                type="button"
                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[15px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)]"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
