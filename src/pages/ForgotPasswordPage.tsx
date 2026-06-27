import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Mail, Loader2 } from 'lucide-react'
import LandingPage from './LandingPage'
import { authService } from '@/features/auth/api/auth.service'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authService.forgotPassword(email)
      // Navigate to reset password page and pass email
      navigate('/reset-password', { state: { email } })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0f1015] font-sans">
      <div className="h-screen overflow-hidden opacity-50">
        <LandingPage />
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/')}
          className="absolute inset-0 bg-[#0f1015]/80 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-[420px] bg-[#1a1b24] border border-gray-800/80 rounded-[24px] p-8 md:p-10 relative z-10 shadow-2xl"
        >
          <Link 
            to="/login" 
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-300 transition-colors bg-gray-800/30 hover:bg-gray-800/50 p-1.5 rounded-full"
          >
            <X className="w-4 h-4" />
          </Link>

          <div className="flex flex-col items-center mb-8">
            <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-lg shadow-[0_2px_10px_rgba(255,140,55,0.4)] mb-5">
              S
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1.5">Reset Password</h1>
            <p className="text-[14px] text-gray-400 text-center">
              Enter your email address and we'll send you a 6-digit code to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-[13px] px-4 py-2.5 rounded-xl font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@university.edu"
                  className="w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-3 pl-11 pr-4 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full mt-3 py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[15px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Code'}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-500 mt-8 font-medium">
            Remember your password?{' '}
            <Link to="/login" className="text-[#ff8c37] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
