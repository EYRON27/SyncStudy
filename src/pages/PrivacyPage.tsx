import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f1015] text-white font-sans relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <Navbar />

      <main className="container mx-auto px-6 pt-40 pb-24 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-[15px]">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert max-w-none text-gray-400 text-[15px]"
        >
          <div className="bg-[#121317]/80 backdrop-blur-md border border-gray-800/50 p-8 md:p-12 rounded-[30px] space-y-10">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                At SyncStudy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
              <p className="leading-relaxed mb-4">
                We collect information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, or otherwise contact us. The personal information that we collect depends on the context of your interactions with us and the application.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Personal Data: Name, email address, and profile picture.</li>
                <li>Educational Data: Notes, tasks, and study materials you upload.</li>
                <li>Usage Data: How you interact with the application and study rooms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use personal information collected via our application for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>To facilitate account creation and logon process.</li>
                <li>To provide the core study functionalities (notes, tasks, AI generation).</li>
                <li>To send administrative information to you.</li>
                <li>To fulfill and manage your requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. AI Data Processing</h2>
              <p className="leading-relaxed">
                When you use our AI features (summarization, flashcards, chat), the specific text you highlight or submit is securely processed by our AI partners (e.g., OpenAI, Google). We do not use your personal notes or academic materials to train our own global AI models without explicit opt-in consent.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
