import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[hsl(var(--background))]">
      {/* Background gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[oklch(0.58_0.26_270)] opacity-10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[oklch(0.62_0.22_200)] opacity-8 blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            Sync<span className="text-[oklch(0.68_0.22_270)]">Study</span>
          </span>
        </div>
        <nav className="hidden gap-8 text-sm font-medium text-[hsl(var(--muted-foreground))] md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            id="nav-login"
            className="text-sm font-medium text-[hsl(var(--muted-foreground))] transition hover:text-white"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            id="nav-register"
            className="rounded-lg bg-[oklch(0.58_0.26_270)] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-[oklch(0.50_0.26_270)]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <span className="mb-6 inline-block rounded-full border border-[oklch(0.58_0.26_270)/30] bg-[oklch(0.58_0.26_270)/10] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[oklch(0.68_0.22_270)]">
              Real-time collaborative study
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Study Together,
            <br />
            <span className="bg-gradient-to-r from-[oklch(0.68_0.22_270)] to-[oklch(0.72_0.22_200)] bg-clip-text text-transparent">
              Achieve More
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-10 text-lg text-[hsl(var(--muted-foreground))] md:text-xl"
          >
            SyncStudy combines real-time chat, Kanban task boards, shared notes,
            and smart scheduling — everything your study group needs, in one place.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              to="/register"
              id="hero-cta-primary"
              className="rounded-xl bg-[oklch(0.58_0.26_270)] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[oklch(0.58_0.26_270)/25] transition hover:scale-105 hover:shadow-[oklch(0.58_0.26_270)/40] active:scale-100"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              id="hero-cta-secondary"
              className="glass rounded-xl px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 flex flex-wrap justify-center gap-3"
          id="features"
        >
          {['💬 Real-time Chat', '📋 Kanban Board', '📝 Shared Notes', '📅 Session Scheduler', '🔒 Secure Auth'].map(
            (feature) => (
              <span
                key={feature}
                className="glass rounded-full px-5 py-2 text-sm font-medium text-white"
              >
                {feature}
              </span>
            ),
          )}
        </motion.div>
      </main>
    </div>
  )
}
