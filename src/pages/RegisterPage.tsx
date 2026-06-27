import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Mail, Key, User, Eye, EyeOff, Check } from 'lucide-react'
import LandingPage from './LandingPage'
import { authService } from '@/features/auth/api/auth.service'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '@/store/authStore'

export default function RegisterPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordRequirements = [
    { label: 'At least 8 characters long', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One special character', met: /[^a-zA-Z0-9]/.test(password) },
  ]

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!passwordRequirements.every(req => req.met)) {
      setError('Please meet all password requirements')
      return
    }

    setLoading(true)
    try {
      const res = await authService.register({ name, email, password })
      if (res.success) {
        // Redirect to OTP page — user must verify email before accessing dashboard
        navigate('/verify-otp', { state: { email } })
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      const res = await authService.googleLogin(tokenResponse.access_token)
      if (res.success && res.data) {
        login(res.data.user, res.data.token)
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google sign-in failed. Please try again.')
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google sign-in was cancelled or failed.'),
  })

  return (
    <div className="relative min-h-screen bg-[#0f1015] font-sans">
      {/* Background Page - locked from scrolling */}
      <div className="h-screen overflow-hidden opacity-50">
        <LandingPage />
      </div>

      {/* Overlay Modal */}
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
          {/* Close Button */}
          <Link 
            to="/" 
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-300 transition-colors bg-gray-800/30 hover:bg-gray-800/50 p-1.5 rounded-full"
          >
            <X className="w-4 h-4" />
          </Link>

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-lg shadow-[0_2px_10px_rgba(255,140,55,0.4)] mb-5">
              S
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1.5">Create an account</h1>
            <p className="text-[14px] text-gray-400">Join SyncStudy today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-[13px] px-4 py-2.5 rounded-xl font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Alex Dev"
                  className="w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-3 pl-11 pr-4 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className={`w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-3 pl-11 pr-12 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all ${!showPassword ? 'tracking-[0.2em]' : ''}`}
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
                  {passwordRequirements.map((req, i) => (
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

            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5 ml-1">Confirm Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className={`w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-3 pl-11 pr-12 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all ${!showPassword ? 'tracking-[0.2em]' : ''}`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[15px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-800/60"></div>
            <span className="px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 border-t border-gray-800/60"></div>
          </div>

          {/* Social Login */}
          <button
            type="button"
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-[#13141a] border border-gray-800/80 text-[14px] text-gray-300 font-semibold hover:bg-gray-800/40 hover:text-white transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          {/* Footer Link */}
          <p className="text-center text-[13px] text-gray-500 mt-8 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-[#ff8c37] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
