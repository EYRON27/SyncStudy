import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Testimonials', to: '/testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        {/* Pill container */}
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between rounded-2xl px-5 transition-all duration-500 ${
            scrolled
              ? 'bg-[#0f1015]/90 backdrop-blur-2xl border border-gray-800/60 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3'
              : 'bg-transparent py-2'
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group select-none">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c37] to-[#e65c00] rounded-xl blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-black text-white text-[15px] shadow-lg">
                  S
                </div>
              </div>
              <span className="text-[17px] font-extrabold tracking-tight text-white/90 group-hover:text-white transition-colors">
                SyncStudy
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`relative px-4 py-1.5 text-[14px] font-medium rounded-lg transition-colors ${
                  location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {location.pathname === '/' && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/8 rounded-lg"
                  />
                )}
                <span className="relative">Home</span>
              </Link>
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-1.5 text-[14px] font-medium rounded-lg transition-colors ${
                    location.pathname === to ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {location.pathname === to && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/8 rounded-lg"
                    />
                  )}
                  <span className="relative">{label}</span>
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="text-[14px] text-gray-400 hover:text-white font-medium transition-colors px-3"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="relative group inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-[14px] font-bold text-white overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c37] to-[#e65c00] transition-all duration-300 group-hover:from-[#ff9a50] group-hover:to-[#ff6b1a]" />
                <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />
                <span className="relative">Get Started</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-[80px] z-40 bg-[#131419]/95 backdrop-blur-2xl border border-gray-800/60 rounded-2xl shadow-2xl p-4 flex flex-col gap-1 md:hidden"
          >
            <Link to="/" className="px-4 py-2.5 text-[15px] text-white font-semibold rounded-xl hover:bg-white/8 transition-colors">Home</Link>
            {navLinks.map(({ label, to }) => (
              <Link key={to} to={to} className="px-4 py-2.5 text-[15px] text-gray-300 font-medium rounded-xl hover:bg-white/8 hover:text-white transition-colors">{label}</Link>
            ))}
            <div className="border-t border-gray-800/50 my-2 pt-2 flex flex-col gap-2">
              <Link to="/login" className="px-4 py-2.5 text-[15px] text-gray-300 font-medium rounded-xl hover:bg-white/8 hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="mx-2 py-3 rounded-xl bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-white font-bold text-[15px] text-center">Get Started Free</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
