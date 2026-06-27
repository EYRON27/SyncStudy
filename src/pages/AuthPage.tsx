import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Key, User, Eye, EyeOff, Check, ArrowRight } from 'lucide-react'
import { authService } from '@/features/auth/api/auth.service'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '@/store/authStore'
import LandingPage from './LandingPage'

export default function AuthPage({ initialView = 'login' }: { initialView?: 'login' | 'register' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)

  const [isLogin, setIsLogin] = useState(initialView === 'login')

  useEffect(() => {
    setIsLogin(location.pathname === '/login')
  }, [location.pathname])

  const toggleView = () => {
    navigate(isLogin ? '/register' : '/login', { replace: true })
  }

  // --- Shared State ---
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // --- Register State ---
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordFocused, setPasswordFocused] = useState(false)

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One special character', met: /[^a-zA-Z0-9]/.test(password) },
  ]

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (!passwordRequirements.every((req) => req.met)) {
        setError('Please meet all password requirements')
        return
      }
    }

    setLoading(true)
    try {
      if (isLogin) {
        const res = await authService.login({ email, password })
        if (res.success && res.data) {
          login(res.data.user, res.data.token)
          navigate('/dashboard')
        }
      } else {
        const res = await authService.register({ name, email, password })
        if (res.success) {
          navigate('/verify-otp', { state: { email } })
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || `${isLogin ? 'Login' : 'Registration'} failed.`)
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
      setError(err.response?.data?.message || 'Google sign-in failed.')
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google sign-in was cancelled or failed.'),
  })

  // Reusable Social Login Button
  const GoogleButton = ({ text }: { text: string }) => (
    <button
      type="button"
      onClick={() => googleLogin()}
      className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#13141a] border border-gray-800/80 text-[14px] text-gray-300 font-semibold hover:bg-gray-800/40 hover:text-white transition-all"
    >
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      {text}
    </button>
  )

  return (
    <div className="relative min-h-screen bg-[#0f1015] font-sans flex items-center justify-center p-4">
      {/* Background Page - locked from scrolling */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <LandingPage />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate('/')}
        className="absolute inset-0 bg-[#0f1015]/80 backdrop-blur-md cursor-pointer z-40"
      />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-50 w-full max-w-[420px] md:max-w-[850px] md:h-[650px] bg-[#1a1b24] md:bg-transparent border border-gray-800/80 md:border-none rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <button 
          onClick={() => navigate('/')}
          className="absolute top-5 right-5 z-50 text-gray-500 hover:text-white transition-colors bg-[#13141a]/80 backdrop-blur-sm p-2 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* =========================================
            DESKTOP SLIDER BACKGROUNDS
        ========================================= */}
        <div className="hidden md:block absolute inset-0 bg-[#1a1b24] rounded-[24px] border border-gray-800/80"></div>

        {/* =========================================
            LOGIN FORM PANEL (LEFT)
        ========================================= */}
        <div className={`absolute md:static top-0 left-0 w-full md:w-1/2 h-full bg-[#1a1b24] md:bg-transparent p-8 md:p-12 flex-col overflow-y-auto custom-scrollbar transition-all duration-500 z-20 ${isLogin ? 'flex opacity-100 translate-x-0' : 'hidden md:flex opacity-0 md:opacity-100 -translate-x-10 md:translate-x-0'}`}>
          <div className="flex flex-col items-center mb-8 mt-auto md:mt-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-xl shadow-[0_4px_20px_rgba(255,140,55,0.4)] mb-6">S</div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-[14px] text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {error && isLogin && (
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

            <div>
              <label className="block text-[13px] font-semibold text-gray-300 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={`w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-3 pl-11 pr-12 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] transition-all ${!showPassword ? 'tracking-[0.2em]' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-2.5">
                <Link to="/forgot-password" className="text-[12px] text-[#ff8c37] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[15px] font-bold hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)] disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-800/60"></div>
            <span className="px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 border-t border-gray-800/60"></div>
          </div>

          <GoogleButton text="Sign in with Google" />

          {/* Mobile Only Toggle */}
          <p className="md:hidden text-center text-[13px] text-gray-500 mt-8 font-medium mb-auto">
            Don't have an account?{' '}
            <button onClick={toggleView} className="text-[#ff8c37] font-bold hover:underline">Sign up</button>
          </p>
        </div>


        {/* =========================================
            REGISTER FORM PANEL (RIGHT)
        ========================================= */}
        <div className={`absolute md:static top-0 left-0 w-full md:w-1/2 h-full bg-[#1a1b24] md:bg-transparent p-8 md:p-10 flex-col overflow-y-auto custom-scrollbar transition-all duration-500 z-20 ${!isLogin ? 'flex opacity-100 translate-x-0' : 'hidden md:flex opacity-0 md:opacity-100 translate-x-10 md:translate-x-0'}`}>
          <div className="flex flex-col items-center mb-6 mt-auto md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Create Account</h1>
            <p className="text-[14px] text-gray-400">Join SyncStudy today</p>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-3.5">
            {error && !isLogin && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-[13px] px-4 py-2.5 rounded-xl font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[12px] font-semibold text-gray-300 mb-1 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Alex Dev"
                  className="w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-2.5 pl-11 pr-4 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-gray-300 mb-1 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@university.edu"
                  className="w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-2.5 pl-11 pr-4 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-gray-300 mb-1 ml-1">Password</label>
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
                  className={`w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-2.5 pl-11 pr-12 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] ${!showPassword ? 'tracking-[0.2em]' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <AnimatePresence>
                {passwordFocused && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 bg-[#13141a]/50 border border-gray-800/80 rounded-xl p-3 space-y-2">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        <div className={`flex items-center justify-center w-3.5 h-3.5 rounded-full ${req.met ? 'bg-emerald-500/20 text-emerald-500' : 'bg-gray-800/50 text-gray-500'}`}>
                          {req.met ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                        </div>
                        <span className={req.met ? 'text-gray-300' : 'text-gray-500'}>{req.label}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-gray-300 mb-1 ml-1">Confirm Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={`w-full bg-[#13141a] border border-gray-800/80 rounded-xl py-2.5 pl-11 pr-12 text-[14px] text-white focus:outline-none focus:border-[#ff8c37] focus:ring-1 focus:ring-[#ff8c37] ${!showPassword ? 'tracking-[0.2em]' : ''}`}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white text-[15px] font-bold shadow-[0_4px_14px_rgba(255,140,55,0.3)] disabled:opacity-50">
              {loading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" /> : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-800/60"></div>
            <span className="px-4 text-[11px] text-gray-500 uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 border-t border-gray-800/60"></div>
          </div>

          <GoogleButton text="Sign up with Google" />

          {/* Mobile Only Toggle */}
          <p className="md:hidden text-center text-[13px] text-gray-500 mt-6 font-medium mb-auto">
            Already have an account?{' '}
            <button onClick={toggleView} className="text-[#ff8c37] font-bold hover:underline">Sign in</button>
          </p>
        </div>


        {/* =========================================
            DESKTOP OVERLAY PANEL (SLIDES L/R)
        ========================================= */}
        <div className={`hidden md:block absolute top-0 w-1/2 h-full z-30 pointer-events-none transition-transform duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c37] to-[#e65c00] shadow-2xl pointer-events-auto overflow-hidden">
            
            {/* Overlay Inner Content - counter-animates to stay centered visually */}
            <div className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${isLogin ? '-translate-x-1/2' : 'translate-x-0'}`}>
              
              {/* Left Side (Shows when Register form is visible) */}
              <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Welcome Back!</h2>
                <p className="text-white/90 mb-8 leading-relaxed font-medium">
                  To keep connected with your study groups, please login with your personal info.
                </p>
                <button 
                  onClick={toggleView}
                  className="px-10 py-3 rounded-full border border-white/50 bg-black/10 hover:bg-white hover:text-[#e65c00] transition-all duration-300 font-bold tracking-widest text-[13px]"
                >
                  SIGN IN
                </button>
              </div>

              {/* Right Side (Shows when Login form is visible) */}
              <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Hello, Friend!</h2>
                <p className="text-white/90 mb-8 leading-relaxed font-medium">
                  Enter your personal details and start your journey with SyncStudy today.
                </p>
                <button 
                  onClick={toggleView}
                  className="px-10 py-3 rounded-full border border-white/50 bg-black/10 hover:bg-white hover:text-[#e65c00] transition-all duration-300 font-bold tracking-widest text-[13px]"
                >
                  SIGN UP
                </button>
              </div>

            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
