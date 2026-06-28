import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Testimonials', to: '/testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-6">
          {/* Floating pill */}
          <motion.div
            animate={{
              backgroundColor: scrolled ? 'rgba(10,11,14,0.88)' : 'rgba(10,11,14,0)',
              borderColor: scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
              backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
              y: scrolled ? 0 : 0,
              boxShadow: scrolled
                ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset'
                : 'none',
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mt-4 flex items-center justify-between rounded-2xl border px-5 py-3"
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group select-none">
              <div className="relative">
                {/* Glow */}
                <span className="absolute inset-0 rounded-xl bg-[#ff8c37] blur-[8px] opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                <span className="relative flex w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff9b4f] to-[#e05500] items-center justify-center font-black text-white text-[15px] shadow-lg">
                  S
                </span>
              </div>
              <span className="text-[16px] font-extrabold tracking-tight text-white/80 group-hover:text-white transition-colors duration-200">
                SyncStudy
              </span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-1">
              {[{ label: 'Home', to: '/' }, ...NAV_LINKS].map(({ label, to }) => {
                const isActive = location.pathname === to
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`relative px-4 py-1.5 text-[13px] font-semibold rounded-xl transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-500 hover:text-gray-200'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        className="absolute inset-0 rounded-xl bg-white/[0.09]"
                      />
                    )}
                    <span className="relative">{label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="text-[13px] font-semibold text-gray-500 hover:text-white transition-colors duration-200 px-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="relative group overflow-hidden inline-flex items-center px-5 py-2 rounded-xl text-[13px] font-bold text-white"
              >
                {/* Background */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c37] to-[#e05500] transition-all duration-300 group-hover:brightness-110" />
                {/* Top shine */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative">Get Started</span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              className="fixed inset-x-4 top-[72px] z-50 bg-[#131417]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-3 md:hidden"
            >
              <div className="flex flex-col gap-0.5">
                {[{ label: 'Home', to: '/' }, ...NAV_LINKS].map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`px-4 py-2.5 text-[15px] font-semibold rounded-xl transition-colors ${
                      location.pathname === to
                        ? 'text-white bg-white/[0.08]'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-[15px] text-gray-400 font-semibold rounded-xl hover:bg-white/[0.05] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="mx-1 py-3 rounded-xl bg-gradient-to-r from-[#ff8c37] to-[#e05500] text-white font-bold text-[15px] text-center shadow-[0_4px_20px_rgba(255,140,55,0.35)]"
                >
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
