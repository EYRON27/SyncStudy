import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PublicLayout() {
  return (
    <div className="bg-[#0c0d10] min-h-screen text-white font-sans overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
