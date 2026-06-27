import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, KeyRound, Key, Eye, EyeOff, Check, X } from 'lucide-react'
import { authService } from '@/features/auth/api/auth.service'
import LandingPage from './LandingPage'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const email: string = location.state?.email ?? ''

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!email) navigate('/forgot-password')
  }, [email, navigate])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newDigits = [...digits]
    newDigits[index] = value.slice(-1)
    setDigits(newDigits)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = digits.join('')
    if (code.length < 6) {
      setError('Please enter the full 6-digit code')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const passwordRequirements = [
      { met: newPassword.length >= 8 },
      { met: /[A-Z]/.test(newPassword) },
      { met: /[a-z]/.test(newPassword) },
      { met: /[^a-zA-Z0-9]/.test(newPassword) },
    ]

    if (!passwordRequirements.every(req => req.met)) {
      setError('Please meet all password requirements')
      return
    }

    setError('')
    setLoading(true)
    try {
      await authService.resetPassword({ email, code, newPassword })
      setSuccess('Password reset successfully! Redirecting to login...')
      setTimeout(() => navigate('/login'), 2500)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired code. Please try again.')
      setDigits(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
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
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center shadow-[0_4px_20px_rgba(255,140,55,0.4)] mb-5">
              <KeyRound className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Create new password</h1>
            <p className="text-[14px] text-gray-400 text-center">
              We sent a reset code to<br />
              <span className="text-[#ff8c37] font-semibold">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-[13px] px-4 py-2.5 rounded-xl font-medium mb-5 text-center">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-[13px] px-4 py-2.5 rounded-xl font-medium mb-5 text-center">
                {success}
              </div>
            )}

            <label className="block text-[13px] font-semibold text-gray-300 mb-3 text-center">Enter 6-digit code</label>
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
                  disabled={!!success}
                  className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border transition-all outline-none
                    ${digit
                      ? 'bg-[#ff8c37]/10 border-[#ff8c37] text-white'
                      : 'bg-[#13141a] border-gray-800 text-white'
                    }
                    focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] disabled:opacity-50`}
                />
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5 ml-1">New Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  disabled={!!success}
                  minLength={8}
                  placeholder="••••••••"
                  className={`w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-3 pl-11 pr-12 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all disabled:opacity-50 ${!showPassword ? 'tracking-[0.2em]' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordFocused && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 bg-[#13141a]/50 border border-gray-800/80 rounded-xl p-3.5 space-y-2.5"
                >
                  {[
                    { label: 'At least 8 characters long', met: newPassword.length >= 8 },
                    { label: 'One uppercase letter', met: /[A-Z]/.test(newPassword) },
                    { label: 'One lowercase letter', met: /[a-z]/.test(newPassword) },
                    { label: 'One special character', met: /[^a-zA-Z0-9]/.test(newPassword) },
                  ].map((req, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[12px]">
                      <div className={`flex items-center justify-center w-4 h-4 rounded-full transition-colors duration-300 ${req.met ? 'bg-emerald-500/20 text-emerald-500' : 'bg-gray-800/50 text-gray-500'}`}>
                        {req.met ? <Check className="w-3 h-3" /> : <X className="w-2.5 h-2.5" />}
                      </div>
                      <span className={`transition-colors duration-300 ${req.met ? 'text-gray-300 font-medium' : 'text-gray-500'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5 ml-1">Confirm Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={!!success}
                  minLength={8}
                  placeholder="••••••••"
                  className={`w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-3 pl-11 pr-12 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all disabled:opacity-50 ${!showPassword ? 'tracking-[0.2em]' : ''}`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || digits.join('').length < 6 || !newPassword || !!success}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[15px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
            </button>
          </form>

          <p className="text-center text-[13px] text-gray-500 mt-8 font-medium">
            <Link to="/login" className="text-[#ff8c37] font-bold hover:underline">
              Back to login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
