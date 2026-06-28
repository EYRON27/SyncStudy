import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HeroSection }        from '@/components/landing/HeroSection'
import { MarqueeStrip }       from '@/components/landing/MarqueeStrip'
import { AboutSection }       from '@/components/landing/AboutSection'
import { ServicesSection }    from '@/components/landing/ServicesSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CTASection }          from '@/components/landing/CTASection'

export default function LandingPage() {
  return (
    <div className="bg-[#0c0d10] min-h-screen text-white font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
