import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-[#0a0a0c] pt-10 pb-8 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#ff8c37] to-[#e65c00] flex items-center justify-center font-bold text-white text-xs">
              S
            </div>
            <span className="text-sm font-bold tracking-tight text-white">SyncStudy</span>
          </div>

          <p className="text-gray-600 text-[12px] font-medium">
            © 2025 SyncStudy. Built for students everywhere.
          </p>

          <div className="flex items-center gap-6 text-[12px] text-gray-500 font-medium">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
