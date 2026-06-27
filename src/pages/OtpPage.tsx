import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, MailCheck, RefreshCw } from 'lucide-react'
import { authService } from '@/features/auth/api/auth.service'
import { useAuthStore } from '@/store/authStore'
import LandingPage from './LandingPage'

export default function OtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)

  // email is passed via navigation state from RegisterPage
  const email: string = location.state?.email ?? ''

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Redirect if no email in state
  useEffect(() => {
    if (!email) navigate('/register')
  }, [email, navigate])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // only digits
    const newDigits = [...digits]
    newDigits[index] = value.slice(-1)
    setDigits(newDigits)

    // Auto-advance to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setDigits(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = async () => {
    const code = digits.join('')
    if (code.length < 6) {
      setError('Please enter the full 6-digit code')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await authService.verifyOtp(email, code)
      if (res.success && res.data) {
        login(res.data.user, res.data.token)
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired code. Please try again.')
      setDigits(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      // Re-trigger register endpoint won't work since user exists; instead send a dedicated resend
      // For now we just show a message — you can add a /resend-otp endpoint later
      await new Promise(r => setTimeout(r, 1000))
      setResent(true)
      setTimeout(() => setResent(false), 4000)
    } finally {
      setResending(false)
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
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center shadow-[0_4px_20px_rgba(255,140,55,0.4)] mb-5">
              <MailCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Check your email</h1>
            <p className="text-[14px] text-gray-400 text-center">
              We sent a 6-digit code to<br />
              <span className="text-[#ff8c37] font-semibold">{email}</span>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-[13px] px-4 py-2.5 rounded-xl font-medium mb-5 text-center">
              {error}
            </div>
          )}

          {/* OTP Input Boxes */}
          <div className="flex gap-2.5 justify-center mb-6" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border transition-all outline-none
                  ${digit
                    ? 'bg-[#ff8c37]/10 border-[#ff8c37] text-white'
                    : 'bg-[#13141a] border-gray-800 text-white'
                  }
                  focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37]`}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || digits.join('').length < 6}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[15px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Email'}
          </button>

          {/* Resend */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="text-[13px] text-gray-500">Didn't receive it?</span>
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-[13px] text-[#ff8c37] font-semibold hover:underline disabled:opacity-50 flex items-center gap-1"
            >
              {resending ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
              {resent ? 'Sent!' : 'Resend code'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
