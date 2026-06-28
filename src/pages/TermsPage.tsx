import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f1015] text-white font-sans relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <Navbar />

      <main className="container mx-auto px-6 pt-40 pb-24 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-[-0.03em] mb-6">Terms of Service</h1>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert prose-lg max-w-none text-gray-300"
        >
          <div className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 md:p-12 rounded-[30px] space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using SyncStudy, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. These terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Acceptable Use Policy</h2>
              <p className="leading-relaxed mb-4">
                As a student productivity tool, SyncStudy is designed to assist in your academic journey. You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Violate your university's academic integrity policies.</li>
                <li>Share copyrighted materials without proper authorization.</li>
                <li>Harass, abuse, or harm other users in Live Study Rooms.</li>
                <li>Attempt to bypass or exploit the AI usage limits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <p className="leading-relaxed mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of SyncStudy and its licensors. You retain full ownership of all notes, files, and tasks you create within the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
