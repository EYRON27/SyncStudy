import { motion } from 'framer-motion'

export function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%,transparent 0%,#0f1015 90%)' }}
      />
    </div>
  )
}

export function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(255,140,55,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-60 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
