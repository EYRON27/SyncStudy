import { TestiCard } from '@/components/landing/Cards'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CS Junior, MIT',
    initials: 'SC',
    text: 'SyncStudy completely changed how I organize my semester. The AI assistant alone saves me hours every week.',
    delay: 0,
  },
  {
    name: 'Marcus Williams',
    role: 'Pre-Med, Johns Hopkins',
    initials: 'MW',
    text: 'The study rooms feature is incredible for group sessions. It feels like a real library, but online.',
    delay: 0.1,
  },
  {
    name: 'Amelia Torres',
    role: 'Engineering, Stanford',
    initials: 'AT',
    text: 'Finally an app that gets student life. Budget tracking + notes + tasks in one place is a game changer.',
    delay: 0.2,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <div className="text-center mb-16">
          <p className="text-[#ff8c37] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-5">
            <span className="w-6 h-px bg-[#ff8c37]" />Testimonials<span className="w-6 h-px bg-[#ff8c37]" />
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Students love it.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => <TestiCard key={t.name} {...t} />)}
        </div>
      </div>
    </section>
  )
}
