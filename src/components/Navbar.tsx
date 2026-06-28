import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0f1015]/80 backdrop-blur-md border-b border-gray-800/50 py-4 shadow-2xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-lg shadow-[0_2px_10px_rgba(255,140,55,0.4)] group-hover:scale-105 transition-transform duration-300">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-white transition-colors">SyncStudy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-400">
          <Link to="/" className={`hover:text-white transition-colors relative ${location.pathname === '/' ? 'text-white' : ''}`}>
            Home
            {location.pathname === '/' && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff8c37] rounded-full" />}
          </Link>
          <Link to="/about" className={`hover:text-white transition-colors relative ${location.pathname === '/about' ? 'text-white' : ''}`}>
            About
            {location.pathname === '/about' && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff8c37] rounded-full" />}
          </Link>
          <Link to="/services" className={`hover:text-white transition-colors relative ${location.pathname === '/services' ? 'text-white' : ''}`}>
            Services
            {location.pathname === '/services' && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff8c37] rounded-full" />}
          </Link>
          <Link to="/testimonials" className={`hover:text-white transition-colors relative ${location.pathname === '/testimonials' ? 'text-white' : ''}`}>
            Testimonials
            {location.pathname === '/testimonials' && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff8c37] rounded-full" />}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(255,140,55,0.3)] hover:shadow-[0_4px_20px_rgba(255,140,55,0.5)]"
          >
            Log In
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
