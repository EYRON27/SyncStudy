import { useState, useEffect } from 'react'
import { TestiCard } from '@/components/landing/Cards'
import { testimonialsService, type Testimonial } from '@/features/testimonials/api/testimonials.service'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Loader2 } from 'lucide-react'

const HARDCODED_TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CS Junior, MIT',
    initials: 'SC',
    text: 'SyncStudy completely changed how I organize my semester. The AI assistant alone saves me hours every week.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Pre-Med, Johns Hopkins',
    initials: 'MW',
    text: 'The study rooms feature is incredible for group sessions. It feels like a real library, but online.',
    rating: 5,
  },
  {
    name: 'Amelia Torres',
    role: 'Engineering, Stanford',
    initials: 'AT',
    text: 'Finally an app that gets student life. Budget tracking + notes + tasks in one place is a game changer.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', role: '', text: '', rating: 5 })

  useEffect(() => {
    testimonialsService.getAll().then(data => {
      setTestimonials(data)
    }).catch(console.error)
  }, [])

  // Combine fetched testimonials with hardcoded ones, and show the latest 3 to 6
  const displayTestimonials = [...testimonials, ...HARDCODED_TESTIMONIALS].slice(0, 6)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const newTestimonial = await testimonialsService.create(formData)
      setTestimonials([newTestimonial, ...testimonials])
      setIsModalOpen(false)
      setFormData({ name: '', role: '', text: '', rating: 5 })
    } catch (err) {
      console.error(err)
      alert('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <div className="text-center mb-16">
          <p className="text-[#ff8c37] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-5">
            <span className="w-6 h-px bg-[#ff8c37]" />Testimonials<span className="w-6 h-px bg-[#ff8c37]" />
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Students love it.</h2>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full font-medium transition-all"
          >
            Leave a Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayTestimonials.map((t: any, i) => (
            <TestiCard 
              key={t.id || (t.name + i)} 
              name={t.name} 
              role={t.role} 
              initials={t.initials || 'User'} 
              text={t.text} 
              delay={i * 0.1} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121318] border border-white/10 rounded-[28px] p-8 w-full max-w-md relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-6">Leave a Review</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff8c37]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Role / School</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    placeholder="CS Junior, MIT"
                    className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff8c37]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${formData.rating >= star ? 'fill-[#ff8c37] text-[#ff8c37]' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Your Review</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.text}
                    onChange={e => setFormData({...formData, text: e.target.value})}
                    placeholder="How has SyncStudy helped you?"
                    className="w-full bg-[#1a1b23] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff8c37]/50 resize-none"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#ff8c37] to-[#e65c00] hover:from-[#e65c00] hover:to-[#ff8c37] text-white font-bold py-3.5 rounded-xl transition-all flex justify-center items-center mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

