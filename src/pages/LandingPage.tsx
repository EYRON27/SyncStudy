import { HeroSection }        from '@/components/landing/HeroSection'
import { MarqueeStrip }       from '@/components/landing/MarqueeStrip'
import { AboutSection }       from '@/components/landing/AboutSection'
import { ServicesSection }    from '@/components/landing/ServicesSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CTASection }          from '@/components/landing/CTASection'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
